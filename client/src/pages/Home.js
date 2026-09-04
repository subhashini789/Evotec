import React from 'react';
import { Box, Typography, Button, Container, Stack, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>

      {/* Navbar */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: '#0F172A', color: 'white', px: { xs: 2, sm: 4 } }}>
        <Toolbar sx={{ height: '64px', p: '0 !important' }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: '700', fontSize: '22px', letterSpacing: '-0.5px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            onClick={() => navigate('/')}
          >
            <span style={{ color: '#FFFFFF' }}>Form</span>
            <span style={{ color: '#60A5FA' }}>Flow</span>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Button
              sx={{ color: '#CBD5E1', display: { xs: 'none', sm: 'block' }, '&:hover': { color: '#FFFFFF', backgroundColor: 'transparent' } }}
              onClick={() => navigate('/')}
            >
              Home
            </Button>
            <Button
              sx={{ color: '#CBD5E1', display: { xs: 'none', sm: 'block' }, '&:hover': { color: '#FFFFFF', backgroundColor: 'transparent' } }}
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button
              sx={{ color: '#CBD5E1', display: { xs: 'none', sm: 'block' }, '&:hover': { color: '#FFFFFF', backgroundColor: 'transparent' } }}
              onClick={() => navigate('/register')}
            >
              Register
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/admin/login')}
              sx={{ borderColor: '#334155', color: '#334155', '&:hover': { borderColor: '#64748B', backgroundColor: 'rgba(255,255,255,0.05)', color: '#334155' } }}
            >
              Admin Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="md" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', py: 8 }}>
        <Typography variant="h1" gutterBottom>
          Simple Form Management<br />Made <Box component="span" sx={{ color: 'primary.main' }}>Easier</Box>.
        </Typography>

        <Typography variant="body1" sx={{ maxWidth: '500px', mx: 'auto', mb: 6, fontSize: '18px' }}>
          Securely submit information, track your details, and manage records through one simple platform.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" mb={10}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/register')}
            sx={{ px: 4, py: 1.5, fontSize: '16px' }}
          >
            Create Account
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/login')}
            sx={{ px: 4, py: 1.5, fontSize: '16px', bgcolor: '#FFFFFF', borderColor: '#CBD5E1', color: '#334155' }}
          >
            Sign In
          </Button>
        </Stack>

        <Stack direction="row" spacing={{ xs: 4, md: 8 }} justifyContent="center">
          <Box>
            <Typography variant="h6" color="text.primary">Secure</Typography>
            <Typography variant="h4">🔒</Typography>
          </Box>
          <Box>
            <Typography variant="h6" color="text.primary">Simple</Typography>
            <Typography variant="h4" color="success.main">✓</Typography>
          </Box>
          <Box>
            <Typography variant="h6" color="text.primary">Fast</Typography>
            <Typography variant="h4">⚡</Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Home;
