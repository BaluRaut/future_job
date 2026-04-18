import { useCallback, useEffect, useState } from 'react';

export type SkillStatus = 'not-started' | 'in-progress' | 'done';

const STORAGE_KEY = 'future_job.skill_progress.v1';

type ProgressMap = Record<number, SkillStatus>;

function readStorage(): ProgressMap {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === 'object' && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

function writeStorage(map: ProgressMap) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    /* ignore */
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressMap>(() => readStorage());

  useEffect(() => {
    writeStorage(progress);
  }, [progress]);

  const setStatus = useCallback((id: number, status: SkillStatus) => {
    setProgress((prev) => {
      const next = { ...prev };
      if (status === 'not-started') {
        delete next[id];
      } else {
        next[id] = status;
      }
      return next;
    });
  }, []);

  const cycleStatus = useCallback((id: number) => {
    setProgress((prev) => {
      const cur = prev[id] ?? 'not-started';
      const next: SkillStatus =
        cur === 'not-started' ? 'in-progress' : cur === 'in-progress' ? 'done' : 'not-started';
      const copy = { ...prev };
      if (next === 'not-started') delete copy[id];
      else copy[id] = next;
      return copy;
    });
  }, []);

  const reset = useCallback(() => setProgress({}), []);

  const getStatus = useCallback(
    (id: number): SkillStatus => progress[id] ?? 'not-started',
    [progress],
  );

  return { progress, getStatus, setStatus, cycleStatus, reset };
}
