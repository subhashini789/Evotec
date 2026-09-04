import React, { useState, useContext } from 'react';
import { Box, Typography, Button, Container, Paper, TextField, OutlinedInput, Alert, Link, Chip, InputAdornment, IconButton, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email, password, true);
    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setError(res.message);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, bgcolor: '#F8FAFC' }}>
      
      {/* Title */}
      <Typography 
        variant="h1" 
        sx={{ 
          mt: '55px',
          mb: '28px',
          textAlign: 'center', 
          fontWeight: '700', 
          fontSize: '30px', 
          letterSpacing: '-0.8px', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center' 
        }}
      >
        <span style={{ color: '#0F172A' }}>Form</span>
        <span style={{ color: '#2563EB' }}>Flow</span>
        <span style={{ color: '#0F172A', marginLeft: '6px' }}>Admin</span>
      </Typography>
      
      <Box sx={{ width: '100%', maxWidth: '440px' }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: '36px 38px', 
            borderRadius: '14px', 
            bgcolor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            boxShadow: '0 10px 25px rgba(15, 23, 42, 0.06)' 
          }}
        >
          <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <Chip 
              label="ADMIN PORTAL" 
              sx={{ 
                bgcolor: '#EEF2FF', 
                color: '#4338CA', 
                fontWeight: '600', 
                fontSize: '12px', 
                letterSpacing: '0.5px', 
                mb: 2,
                borderRadius: '999px',
                px: '4px',
                height: '28px'
              }} 
            />
            <Typography variant="h5" fontWeight="600" sx={{ color: '#0F172A' }}>
              Admin Login
            </Typography>
            <Typography sx={{ mt: '6px', fontSize: '15px', lineHeight: 1.5, color: '#64748B' }}>
              Sign in to manage customer<br/>submissions
            </Typography>
          </Box>
          
          {error && <Alert severity="error" sx={{ mb: 3, borderRadius: '8px' }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: '20px' }}>
              <Typography sx={{ display: 'block', mb: '7px', fontSize: '14px', fontWeight: '500', color: '#334155' }}>
                Email *
              </Typography>
              <TextField
                type="email"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                placeholder="admin@evotec.com"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: '#FFFFFF',
                    borderRadius: '8px',
                    height: '48px',
                    '& fieldset': { borderColor: '#CBD5E1', borderWidth: '1px' },
                    '&:hover fieldset': { borderColor: '#94A3B8' },
                    '&.Mui-focused fieldset': { borderColor: '#2563EB', borderWidth: '1px', boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.12)' },
                  },
                  '& .MuiOutlinedInput-input': { 
                    paddingLeft: '14px', 
                    fontSize: '15px', 
                    color: '#0F172A',
                    '&:-webkit-autofill': {
                      WebkitBoxShadow: '0 0 0 1000px white inset !important',
                      WebkitTextFillColor: '#0F172A !important',
                    }
                  }
                }}
              />
            </Box>

            <Box sx={{ mb: '24px' }}>
              <Typography sx={{ display: 'block', mb: '7px', fontSize: '14px', fontWeight: '500', color: '#334155' }}>
                Password *
              </Typography>
              <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="•••••••••"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                      sx={{ color: '#0F172A', mr: 0.5 }}
                    >
                      {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                }
                sx={{
                  bgcolor: '#FFFFFF',
                  borderRadius: '8px',
                  height: '48px',
                  '& fieldset': { borderColor: '#CBD5E1', borderWidth: '1px' },
                  '&:hover fieldset': { borderColor: '#94A3B8' },
                  '&.Mui-focused fieldset': { borderColor: '#2563EB', borderWidth: '1px', boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.12)' },
                  '& .MuiOutlinedInput-input': { 
                    paddingLeft: '14px', 
                    fontSize: '15px', 
                    color: '#0F172A',
                    '&:-webkit-autofill': {
                      WebkitBoxShadow: '0 0 0 1000px white inset !important',
                      WebkitTextFillColor: '#0F172A !important',
                    }
                  }
                }}
              />
            </Box>

            <Button 
              type="submit" 
              fullWidth 
              disabled={loading}
              sx={{ 
                height: '48px',
                bgcolor: '#2563EB', 
                color: '#FFFFFF',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '600',
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': { bgcolor: '#1D4ED8', boxShadow: 'none' },
                '&:active': { transform: 'translateY(1px)' },
                '&:disabled': { bgcolor: '#93C5FD', color: '#FFFFFF', cursor: 'not-allowed' },
                mb: 3
              }}
            >
              {loading ? 'Signing in...' : 'Admin Sign In'}
            </Button>
          </form>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ color: '#94A3B8' }}>
              <LockIcon sx={{ fontSize: 14 }} />
              <Typography sx={{ fontSize: '12px' }}>
                Secure admin access
              </Typography>
            </Stack>

            <Link 
              component="button" 
              onClick={() => navigate('/')}
              sx={{ 
                color: '#64748B', 
                fontSize: '14px', 
                textDecoration: 'none',
                '&:hover': { color: '#2563EB' }
              }}
            >
              ← Back to home
            </Link>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default AdminLogin;
