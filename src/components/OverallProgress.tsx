import { Box, Button, LinearProgress, Typography } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { SKILLS } from '../data/skills';
import type { SkillStatus } from '../hooks/useProgress';

interface Props {
  getStatus: (id: number) => SkillStatus;
  onReset: () => void;
}

export default function OverallProgress({ getStatus, onReset }: Props) {
  const total = SKILLS.length;
  const done = SKILLS.filter((s) => getStatus(s.id) === 'done').length;
  const inProgress = SKILLS.filter(
    (s) => getStatus(s.id) === 'in-progress',
  ).length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  const handleReset = () => {
    if (
      window.confirm(
        'Reset all skill progress? This clears your local tracking and cannot be undone.',
      )
    ) {
      onReset();
    }
  };

  return (
    <Box
      sx={{
        mb: 3,
        p: 2,
        borderRadius: 2,
        background:
          'linear-gradient(135deg, rgba(25,118,210,0.08), rgba(156,39,176,0.08))',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 2,
          mb: 1,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Your Roadmap Progress
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {done} done · {inProgress} in progress · {total - done - inProgress} not started
        </Typography>
        <Box sx={{ flex: 1 }} />
        <Button
          size="small"
          variant="text"
          color="inherit"
          startIcon={<RestartAltIcon />}
          onClick={handleReset}
          disabled={done + inProgress === 0}
        >
          Reset
        </Button>
      </Box>
      <LinearProgress
        variant="determinate"
        value={pct}
        sx={{ height: 10, borderRadius: 5 }}
      />
      <Typography
        variant="caption"
        sx={{ display: 'block', mt: 0.5, fontWeight: 600 }}
      >
        {pct}% complete
      </Typography>
    </Box>
  );
}
