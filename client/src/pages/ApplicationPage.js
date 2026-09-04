import React, { useState, useContext } from 'react';
import { Box, Typography, Button, Container, Paper, TextField, OutlinedInput, Select, MenuItem, Alert, AppBar, Toolbar, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const ApplicationPage = () => {
  const { logout } = useContext(AuthContext);
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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    
    const mobileRegex = /^7[0-9]{8}$/;
    if (!mobileRegex.test(formData.mobileNumber)) {
      return setStatus({ type: 'error', message: 'Please enter a valid Sri Lankan mobile number.' });
    }

    setLoading(true);

    try {
      const submissionData = {
        ...formData,
        mobileNumber: `+94${formData.mobileNumber}`
      };
      await api.post('/forms', submissionData);
      setStatus({ type: 'success', message: 'Application submitted successfully.' });
      setFormData({
        firstName: '', lastName: '', email: '', gender: 'MALE', mobileNumber: '', address: '', feedback: ''
      });
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Failed to submit application.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const inputStyles = {
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
  };

  const labelStyles = { display: 'block', mb: '7px', fontSize: '14px', fontWeight: '500', color: '#334155' };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      
      {/* Navbar */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: '#0F172A', color: 'white', px: { xs: 2, sm: 4 } }}>
        <Toolbar sx={{ height: '64px', p: '0 !important' }}>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ flexGrow: 1, fontWeight: '700', fontSize: '22px', letterSpacing: '-0.5px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            onClick={() => navigate('/apply')}
          >
            <span style={{ color: '#FFFFFF' }}>Form</span>
            <span style={{ color: '#60A5FA' }}>Flow</span>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Button 
              sx={{ color: '#CBD5E1', display: { xs: 'none', sm: 'block' }, '&:hover': { color: '#FFFFFF', backgroundColor: 'transparent' } }}
              onClick={() => navigate('/apply')}
            >
              Application
            </Button>
            <Button 
              sx={{ color: '#CBD5E1', '&:hover': { color: '#FFFFFF', backgroundColor: 'transparent' } }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 6, mb: 8, flexGrow: 1 }}>
        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: '16px', maxWidth: '850px', mx: 'auto' }}>
          <Typography variant="h4" fontWeight="600" gutterBottom>
            Application Form
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            Please provide the following information.
          </Typography>
          
          {status.message && (
            <Alert severity={status.type} sx={{ mb: 4 }}>
              {status.message}
            </Alert>
          )}

          <Box sx={{ mb: 3, mt: 2 }}>
            <Typography variant="h6" fontWeight="600" color="text.primary" sx={{ borderBottom: '1px solid', borderColor: 'divider', pb: 1, mb: 3 }}>
              Personal Information
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
              <Box>
                <Typography sx={labelStyles}>First Name *</Typography>
                <OutlinedInput
                  name="firstName"
                  required
                  fullWidth
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  sx={inputStyles}
                />
              </Box>

              <Box>
                <Typography sx={labelStyles}>Last Name *</Typography>
                <OutlinedInput
                  name="lastName"
                  required
                  fullWidth
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  sx={inputStyles}
                />
              </Box>

              <Box>
                <Typography sx={labelStyles}>Email *</Typography>
                <OutlinedInput
                  name="email"
                  type="email"
                  required
                  fullWidth
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  sx={inputStyles}
                />
              </Box>

              <Box>
                <Typography sx={labelStyles}>Mobile Number *</Typography>
                <OutlinedInput
                  name="mobileNumber"
                  required
                  fullWidth
                  value={formData.mobileNumber}
                  onChange={(e) => {
                    let val = e.target.value.replace(/\D/g, '');
                    if (val.startsWith('94')) val = val.substring(2);
                    if (val.startsWith('0')) val = val.substring(1);
                    if (val.length <= 9) {
                      setFormData({ ...formData, mobileNumber: val });
                    }
                  }}
                  startAdornment={<InputAdornment position="start" sx={{ color: '#0F172A', fontWeight: '600' }}>+94</InputAdornment>}
                  placeholder="712345678"
                  sx={inputStyles}
                />
              </Box>

              <Box>
                <Typography sx={labelStyles}>Gender *</Typography>
                <Select
                  name="gender"
                  required
                  fullWidth
                  value={formData.gender}
                  onChange={handleChange}
                  sx={inputStyles}
                >
                  <MenuItem value="MALE">Male</MenuItem>
                  <MenuItem value="FEMALE">Female</MenuItem>
                  <MenuItem value="OTHER">Other</MenuItem>
                </Select>
              </Box>
              
              <Box sx={{ gridColumn: { sm: 'span 2' } }}>
                <Typography sx={labelStyles}>Address *</Typography>
                <OutlinedInput
                  name="address"
                  required
                  fullWidth
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Main St, City, Country"
                  sx={inputStyles}
                />
              </Box>
              
              <Box sx={{ gridColumn: { sm: 'span 2' } }}>
                <Typography sx={labelStyles}>Feedback</Typography>
                <OutlinedInput
                  name="feedback"
                  multiline
                  rows={4}
                  fullWidth
                  value={formData.feedback}
                  onChange={handleChange}
                  placeholder="Any additional information..."
                  sx={{
                    bgcolor: '#FFFFFF',
                    borderRadius: '8px',
                    '& fieldset': { borderColor: '#CBD5E1', borderWidth: '1px' },
                    '&:hover fieldset': { borderColor: '#94A3B8' },
                    '&.Mui-focused fieldset': { borderColor: '#2563EB', borderWidth: '1px', boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.12)' },
                    '& .MuiOutlinedInput-input': { padding: '12px', fontSize: '15px', color: '#0F172A' }
                  }}
                />
              </Box>
            </Box>
            
            <Box mt={4} display="flex" justifyContent="flex-end">
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                disableElevation
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default ApplicationPage;
