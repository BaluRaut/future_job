import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SkillsTable from './components/SkillsTable';

function App() {
  return (
    <>
      <CssBaseline />
      <AppBar position="static" color="primary" enableColorOnDark>
        <Toolbar>
          <AutoAwesomeIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AI / ML Engineer — Skill Roadmap
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            Based on 7 WeWorkRemotely listings
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            Skills to Learn (in order)
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Rated by demand across senior AI/ML/Engineering roles. Lower{' '}
            <strong>Learn #</strong> = higher priority. Sort, filter, or search
            to focus on what matters.
          </Typography>
        </Box>

        <SkillsTable />
      </Container>
    </>
  );
}

export default App;
