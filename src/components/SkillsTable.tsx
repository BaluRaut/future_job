import { useMemo, useState } from 'react';
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Rating,
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
import { COMPANIES, SKILLS, type Skill } from '../data/skills';

type SortKey = 'learnOrder' | 'rating' | 'demand' | 'name';

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
        case 'rating':
          return (a.rating - b.rating) * dir;
        case 'demand':
          return (a.appearsIn.length - b.appearsIn.length) * dir;
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
              <TableCell sx={{ fontWeight: 600 }}>
                <TableSortLabel
                  active={sortKey === 'rating'}
                  direction={sortDir}
                  onClick={() => handleSort('rating')}
                >
                  Importance
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }}>
                <TableSortLabel
                  active={sortKey === 'demand'}
                  direction={sortDir}
                  onClick={() => handleSort('demand')}
                >
                  Demand
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Companies</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((s) => (
              <TableRow key={s.id} hover>
                <TableCell>
                  <Chip
                    icon={<SchoolIcon />}
                    label={s.learnOrder}
                    color={s.learnOrder === 1 ? 'success' : s.learnOrder === 2 ? 'info' : s.learnOrder === 3 ? 'warning' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Tooltip title={s.notes ?? ''} placement="top" arrow>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
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
                <TableCell>
                  <Rating value={s.rating} readOnly size="small" />
                </TableCell>
                <TableCell>
                  <Chip
                    label={`${s.appearsIn.length}/${COMPANIES.length}`}
                    size="small"
                    color={s.appearsIn.length >= 5 ? 'error' : s.appearsIn.length >= 3 ? 'warning' : 'default'}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {s.appearsIn.map((c) => (
                      <Chip key={c} label={c} size="small" variant="outlined" />
                    ))}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
