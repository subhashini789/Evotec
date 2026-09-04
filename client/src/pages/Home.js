import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 5, width: '100%', textAlign: 'center', borderRadius: 3 }}>
          <Typography variant="h3" gutterBottom fontWeight="bold" color="primary">
            Evotec
          </Typography>
          <Typography variant="h6" color="textSecondary" paragraph>
            Welcome to the Application Portal
          </Typography>
          
          <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button variant="contained" size="large" onClick={() => navigate('/login')}>
              Customer Login
            </Button>
            <Button variant="outlined" size="large" onClick={() => navigate('/register')}>
              Register as Customer
            </Button>
            <Button variant="text" size="small" onClick={() => navigate('/admin/login')} sx={{ mt: 2 }}>
              Admin Login
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home;
