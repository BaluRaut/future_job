import { Box, Card, CardContent, LinearProgress, Typography } from '@mui/material';
import { SKILLS, type Phase } from '../data/skills';
import type { SkillStatus } from '../hooks/useProgress';

const PHASES: Phase[] = [
  'Phase 1 – Foundations',
  'Phase 2 – Applied AI',
  'Phase 3 – Production & MLOps',
  'Phase 4 – Differentiators',
];

const phaseColor: Record<Phase, 'success' | 'info' | 'warning' | 'inherit'> = {
  'Phase 1 – Foundations': 'success',
  'Phase 2 – Applied AI': 'info',
  'Phase 3 – Production & MLOps': 'warning',
  'Phase 4 – Differentiators': 'inherit',
};

const phaseAccent: Record<Phase, string> = {
  'Phase 1 – Foundations': '#2e7d32',
  'Phase 2 – Applied AI': '#0288d1',
  'Phase 3 – Production & MLOps': '#ed6c02',
  'Phase 4 – Differentiators': '#616161',
};

interface Props {
  getStatus: (id: number) => SkillStatus;
}

export default function PhaseSummary({ getStatus }: Props) {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: {
          xs: '1fr',
          sm: '1fr 1fr',
          md: 'repeat(4, 1fr)',
        },
        mb: 3,
      }}
    >
      {PHASES.map((phase) => {
        const skills = SKILLS.filter((s) => s.phase === phase);
        const total = skills.length;
        const done = skills.filter((s) => getStatus(s.id) === 'done').length;
        const inProgress = skills.filter(
          (s) => getStatus(s.id) === 'in-progress',
        ).length;
        const pct = total === 0 ? 0 : Math.round((done / total) * 100);
        const accent = phaseAccent[phase];

        return (
          <Card
            key={phase}
            variant="outlined"
            sx={{
              borderLeft: `4px solid ${accent}`,
              transition: 'transform 0.15s, box-shadow 0.15s',
              '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 },
            }}
          >
            <CardContent sx={{ pb: '16px !important' }}>
              <Typography
                variant="overline"
                sx={{ color: accent, fontWeight: 700, lineHeight: 1.2 }}
              >
                {phase}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 1,
                  mt: 0.5,
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {done}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  / {total} done
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                {inProgress > 0
                  ? `${inProgress} in progress`
                  : 'No skills started yet'}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={pct}
                color={phaseColor[phase] === 'inherit' ? 'inherit' : phaseColor[phase]}
                sx={{ mt: 1.5, height: 8, borderRadius: 4 }}
              />
              <Typography
                variant="caption"
                sx={{ display: 'block', mt: 0.5, fontWeight: 600 }}
              >
                {pct}%
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}
