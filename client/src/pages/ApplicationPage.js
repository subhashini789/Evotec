import React, { useState, useContext } from 'react';
import { Box, Typography, Button, Container, Paper, TextField, MenuItem, Alert, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const ApplicationPage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: 'MALE',
    mobileNumber: '',
    address: '',
    feedback: ''
  });
  
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    try {
      await api.post('/forms', formData);
      setStatus({ type: 'success', message: 'Application submitted successfully!' });
      setFormData({
        firstName: '', lastName: '', email: '', gender: 'MALE', mobileNumber: '', address: '', feedback: ''
      });
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Failed to submit application' 
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Evotec Application Portal
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {user?.email}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Submit Application
          </Typography>
          
          {status.message && (
            <Alert severity={status.type} sx={{ mb: 3 }}>
              {status.message}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField
                label="First Name"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
              />
              <TextField
                label="Last Name"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                required
                fullWidth
                sx={{ gridColumn: 'span 2' }}
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                select
                label="Gender"
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
              >
                <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
                <MenuItem value="OTHER">Other</MenuItem>
              </TextField>
              <TextField
                label="Mobile Number"
                name="mobileNumber"
                required
                value={formData.mobileNumber}
                onChange={handleChange}
              />
              <TextField
                label="Address"
                name="address"
                required
                multiline
                rows={3}
                fullWidth
                sx={{ gridColumn: 'span 2' }}
                value={formData.address}
                onChange={handleChange}
              />
              <TextField
                label="Feedback (Optional)"
                name="feedback"
                multiline
                rows={4}
                fullWidth
                sx={{ gridColumn: 'span 2' }}
                value={formData.feedback}
                onChange={handleChange}
              />
            </Box>
            
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              size="large" 
              sx={{ mt: 3 }}
            >
              Submit
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default ApplicationPage;
