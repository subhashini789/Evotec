import React, { useState, useContext } from 'react';
import { Box, Typography, Button, Container, Paper, TextField, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const CustomerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await login(email, password, false);
    if (res.success) {
      navigate('/apply');
    } else {
      setError(res.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 10 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
            Customer Login
          </Typography>
          
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              margin="normal"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth 
              size="large" 
              sx={{ mt: 3 }}
            >
              Login
            </Button>
          </form>
          
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Button variant="text" onClick={() => navigate('/register')}>
              Don't have an account? Register
            </Button>
            <br />
            <Button variant="text" onClick={() => navigate('/admin/login')} sx={{ color: 'text.secondary' }}>
              Are you an Admin?
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default CustomerLogin;
