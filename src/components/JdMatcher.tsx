import { useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  LinearProgress,
  TextField,
  Typography,
} from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { matchJd } from '../data/skillKeywords';
import { SKILLS } from '../data/skills';
import type { SkillStatus } from '../hooks/useProgress';

const SAMPLE_JD = `Senior AI Engineer

We are hiring an experienced AI Engineer to design and ship LLM-powered
products. You will build RAG pipelines using pgvector, design agentic
workflows with LangGraph, evaluate prompts with Promptfoo, and deploy
on AWS Bedrock. You should have strong Python, prompt engineering,
and experience with OpenAI / Anthropic APIs. Bonus: vLLM, fine-tuning
with LoRA, and observability with LangSmith.`;

interface Props {
  getStatus?: (id: number) => SkillStatus;
}

export default function JdMatcher({ getStatus }: Props) {
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [analyzing, setAnalyzing] = useState(false);

  const result = useMemo(() => {
    if (!submitted.trim()) return null;
    return matchJd(submitted);
  }, [submitted]);

  const handleAnalyze = () => {
    if (!text.trim()) return;
    setAnalyzing(true);
    // tiny delay so the spinner shows on big JDs
    setTimeout(() => {
      setSubmitted(text);
      setAnalyzing(false);
    }, 200);
  };

  const handleSample = () => {
    setText(SAMPLE_JD);
  };

  const handleClear = () => {
    setText('');
    setSubmitted('');
  };

  const matchedSkills = useMemo(
    () =>
      result
        ? SKILLS.filter((s) => result.matchedSkillIds.has(s.id)).sort(
            (a, b) => a.learnOrder - b.learnOrder,
          )
        : [],
    [result],
  );

  const top5Missing = result?.missingSkills.slice(0, 5) ?? [];

  const scoreColor: 'success' | 'warning' | 'error' =
    !result ? 'success' : result.matchScore >= 70 ? 'success' : result.matchScore >= 40 ? 'warning' : 'error';

  return (
    <Card variant="outlined" sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <WorkOutlineIcon color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Job Description Matcher
          </Typography>
          <Chip
            label="beta"
            size="small"
            color="secondary"
            variant="outlined"
            sx={{ ml: 1 }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Paste a job description and see how well it matches your roadmap. We
          highlight matched skills, the top missing ones, and a weighted match
          score (skills earlier in the roadmap count more).
        </Typography>

        <TextField
          multiline
          minRows={5}
          maxRows={14}
          fullWidth
          placeholder="Paste a job description here…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{ mb: 1.5 }}
        />

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          <Button
            variant="contained"
            onClick={handleAnalyze}
            disabled={!text.trim() || analyzing}
            startIcon={analyzing ? <CircularProgress size={16} color="inherit" /> : <AutoAwesomeIcon />}
          >
            Analyze JD
          </Button>
          <Button variant="text" onClick={handleSample}>
            Use sample JD
          </Button>
          {(text || submitted) && (
            <Button variant="text" color="inherit" onClick={handleClear}>
              Clear
            </Button>
          )}
        </Box>

        {result && (
          <>
            <Divider sx={{ my: 2 }} />

            {/* Score */}
            <Box sx={{ mb: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 1,
                  flexWrap: 'wrap',
                }}
              >
                <Typography variant="h3" sx={{ fontWeight: 700 }} color={`${scoreColor}.main`}>
                  {result.matchScore}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  weighted roadmap match · {result.uniqueMatches} of {SKILLS.length} skills detected
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={result.matchScore}
                color={scoreColor}
                sx={{ mt: 1, height: 10, borderRadius: 5 }}
              />
              {result.uniqueMatches === 0 && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                  No skills matched — paste a longer / clearer JD, or check that
                  the role is AI/ML adjacent.
                </Alert>
              )}
            </Box>

            {/* Matched skills */}
            {matchedSkills.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <TaskAltIcon fontSize="small" color="success" />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    Matched ({matchedSkills.length})
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {matchedSkills.map((s) => {
                    const status = getStatus?.(s.id) ?? 'not-started';
                    return (
                      <Chip
                        key={s.id}
                        label={s.name}
                        size="small"
                        color={status === 'done' ? 'success' : 'default'}
                        variant={status === 'done' ? 'filled' : 'outlined'}
                        icon={status === 'done' ? <TaskAltIcon /> : undefined}
                      />
                    );
                  })}
                </Box>
              </Box>
            )}

            {/* Top missing — recommended next */}
            {top5Missing.length > 0 && (
              <Box sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <HighlightOffIcon fontSize="small" color="error" />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    Top {top5Missing.length} skills to learn for this role
                  </Typography>
                </Box>
                <Box component="ol" sx={{ m: 0, pl: 3 }}>
                  {top5Missing.map((s) => (
                    <li key={s.id}>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        <strong>{s.name}</strong>{' '}
                        <Typography component="span" variant="caption" color="text.secondary">
                          · {s.phase} · Learn #{s.learnOrder}
                        </Typography>
                      </Typography>
                    </li>
                  ))}
                </Box>
              </Box>
            )}

            {result.missingSkills.length > top5Missing.length && (
              <Typography variant="caption" color="text.secondary">
                + {result.missingSkills.length - top5Missing.length} more roadmap
                skills not mentioned in this JD.
              </Typography>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
