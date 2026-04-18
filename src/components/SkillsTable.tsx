import { Fragment, useMemo, useState } from 'react';
import {
  Box,
  Chip,
  Collapse,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  type SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import BuildIcon from '@mui/icons-material/Build';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PlayLessonIcon from '@mui/icons-material/PlayLesson';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { SKILLS, type Skill } from '../data/skills';
import { getSkillDetails } from '../data/skillDetails';

type SortKey = 'learnOrder' | 'name';

const phaseColor: Record<string, 'success' | 'info' | 'warning' | 'default'> = {
  'Phase 1 – Foundations': 'success',
  'Phase 2 – Applied AI': 'info',
  'Phase 3 – Production & MLOps': 'warning',
  'Phase 4 – Differentiators': 'default',
};

export default function SkillsTable() {
  const [sortKey, setSortKey] = useState<SortKey>('learnOrder');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [query, setQuery] = useState('');
  const [phaseFilter, setPhaseFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) =>
    setExpandedId((cur) => (cur === id ? null : id));

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const rows = useMemo(() => {
    let filtered: Skill[] = [...SKILLS];
    if (query.trim()) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q),
      );
    }
    if (phaseFilter !== 'all') {
      filtered = filtered.filter((s) => s.phase === phaseFilter);
    }
    filtered.sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1;
      switch (sortKey) {
        case 'learnOrder':
          return (a.learnOrder - b.learnOrder) * dir;
        case 'name':
          return a.name.localeCompare(b.name) * dir;
      }
    });
    return filtered;
  }, [sortKey, sortDir, query, phaseFilter]);

  const phases = Array.from(new Set(SKILLS.map((s) => s.phase)));

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          alignItems: { sm: 'center' },
        }}
      >
        <TextField
          label="Search skill or category"
          size="small"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ minWidth: 260 }}
        />
        <FormControl size="small" sx={{ minWidth: 240 }}>
          <InputLabel>Filter by phase</InputLabel>
          <Select
            label="Filter by phase"
            value={phaseFilter}
            onChange={(e: SelectChangeEvent) => setPhaseFilter(e.target.value)}
          >
            <MenuItem value="all">All phases</MenuItem>
            {phases.map((p) => (
              <MenuItem key={p} value={p}>
                {p}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Showing {rows.length} of {SKILLS.length} skills
        </Typography>
      </Box>

      <TableContainer component={Paper} elevation={2}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 48 }} />
              <TableCell sx={{ fontWeight: 600 }}>
                <TableSortLabel
                  active={sortKey === 'learnOrder'}
                  direction={sortDir}
                  onClick={() => handleSort('learnOrder')}
                >
                  Learn #
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }}>
                <TableSortLabel
                  active={sortKey === 'name'}
                  direction={sortDir}
                  onClick={() => handleSort('name')}
                >
                  Skill
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Phase</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((s) => {
              const details = getSkillDetails(s);
              const open = expandedId === s.id;
              return (
                <Fragment key={s.id}>
                  <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => toggleExpand(s.id)}
                      >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={<SchoolIcon />}
                        label={s.learnOrder}
                        color={
                          s.learnOrder === 1
                            ? 'success'
                            : s.learnOrder === 2
                            ? 'info'
                            : s.learnOrder === 3
                            ? 'warning'
                            : 'default'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Tooltip title={s.notes ?? ''} placement="top" arrow>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 500, cursor: 'pointer' }}
                          onClick={() => toggleExpand(s.id)}
                        >
                          {s.name}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Chip label={s.category} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={s.phase}
                        size="small"
                        color={phaseColor[s.phase]}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ p: 0, border: 0 }} colSpan={5}>
                      <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box
                          sx={{
                            m: 2,
                            p: 2,
                            bgcolor: 'grey.50',
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'grey.200',
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              alignItems: 'center',
                              gap: 1.5,
                              mb: 2,
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{ color: 'primary.main', fontWeight: 700 }}
                            >
                              {s.name} — study guide
                            </Typography>
                            <Chip
                              icon={<AccessTimeIcon />}
                              label={details.timeEstimate}
                              size="small"
                              variant="outlined"
                            />
                            {details.miniProject && (
                              <Chip
                                icon={<RocketLaunchIcon />}
                                label={`Mini-project: ${details.miniProject}`}
                                size="small"
                                color="secondary"
                                variant="outlined"
                              />
                            )}
                          </Box>

                          {/* What to learn (sentence-wise) */}
                          {details.whatToLearn.length > 0 && (
                            <Box sx={{ mb: 2 }}>
                              <Box
                                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
                              >
                                <PlayLessonIcon fontSize="small" color="action" />
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  What to learn (in order)
                                </Typography>
                              </Box>
                              <Box component="ol" sx={{ m: 0, pl: 3 }}>
                                {details.whatToLearn.map((step, idx) => (
                                  <li key={idx}>
                                    <Typography
                                      variant="body2"
                                      sx={{ mb: 0.5, lineHeight: 1.6 }}
                                    >
                                      {step}
                                    </Typography>
                                  </li>
                                ))}
                              </Box>
                            </Box>
                          )}

                          {/* How to verify learning */}
                          {details.verify.length > 0 && (
                            <Box sx={{ mb: 2 }}>
                              <Box
                                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
                              >
                                <CheckCircleOutlineIcon fontSize="small" color="success" />
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  How to verify you’ve learned it
                                </Typography>
                              </Box>
                              <Box component="ul" sx={{ m: 0, pl: 3, listStyle: 'none' }}>
                                {details.verify.map((v, idx) => (
                                  <li key={idx} style={{ marginBottom: 4 }}>
                                    <Box
                                      sx={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: 1,
                                      }}
                                    >
                                      <CheckCircleOutlineIcon
                                        sx={{ fontSize: 16, mt: '3px', color: 'success.main' }}
                                      />
                                      <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                                        {v.text}
                                      </Typography>
                                    </Box>
                                  </li>
                                ))}
                              </Box>
                            </Box>
                          )}

                          <Divider sx={{ my: 2 }} />

                          <Box
                            sx={{
                              display: 'grid',
                              gridTemplateColumns: {
                                xs: '1fr',
                                md: '1fr 1fr 1fr',
                              },
                              gap: 2,
                            }}
                          >
                            {/* Tools */}
                            <Box>
                              <Box
                                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
                              >
                                <BuildIcon fontSize="small" color="action" />
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  Tools / Libraries
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {details.tools.length === 0 && (
                                  <Typography variant="caption" color="text.secondary">
                                    —
                                  </Typography>
                                )}
                                {details.tools.map((t) => (
                                  <Chip
                                    key={t}
                                    label={t}
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                  />
                                ))}
                              </Box>
                            </Box>

                            {/* Concepts */}
                            <Box>
                              <Box
                                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
                              >
                                <LightbulbIcon fontSize="small" color="action" />
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  Core Concepts
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {details.concepts.length === 0 && (
                                  <Typography variant="caption" color="text.secondary">
                                    —
                                  </Typography>
                                )}
                                {details.concepts.map((c) => (
                                  <Chip
                                    key={c}
                                    label={c}
                                    size="small"
                                    color="secondary"
                                    variant="outlined"
                                  />
                                ))}
                              </Box>
                            </Box>

                            {/* Resources */}
                            <Box>
                              <Box
                                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
                              >
                                <MenuBookIcon fontSize="small" color="action" />
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  Free / Recommended Resources
                                </Typography>
                              </Box>
                              <Box
                                component="ul"
                                sx={{ m: 0, pl: 2.5, listStyle: 'disc' }}
                              >
                                {details.resources.length === 0 && (
                                  <Typography variant="caption" color="text.secondary">
                                    —
                                  </Typography>
                                )}
                                {details.resources.map((r) => (
                                  <li key={r.url}>
                                    <Link
                                      href={r.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      underline="hover"
                                      sx={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 0.5,
                                        fontSize: '0.85rem',
                                      }}
                                    >
                                      {r.title}
                                      <OpenInNewIcon sx={{ fontSize: 14 }} />
                                    </Link>
                                  </li>
                                ))}
                              </Box>
                            </Box>
                          </Box>

                          {s.notes && (
                            <>
                              <Divider sx={{ my: 2 }} />
                              <Typography variant="caption" color="text.secondary">
                                💡 {s.notes}
                              </Typography>
                            </>
                          )}
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
