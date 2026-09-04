import React, { useState, useEffect, useContext } from 'react';
import { 
  Box, Typography, Button, Container, Paper, TextField, MenuItem, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions, AppBar, Toolbar
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [submissions, setSubmissions] = useState([]);
  const [search, setSearch] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentSubmission, setCurrentSubmission] = useState(null);

  useEffect(() => {
    fetchSubmissions();
  }, [search, genderFilter]);

  const fetchSubmissions = async () => {
    try {
      let query = '';
      if (search) query += `search=${search}&`;
      if (genderFilter) query += `gender=${genderFilter}&`;
      
      const res = await api.get(`/admin/forms?${query}`);
      setSubmissions(res.data);
    } catch (error) {
      console.error('Failed to fetch submissions', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      try {
        await api.delete(`/admin/forms/${id}`);
        fetchSubmissions();
      } catch (error) {
        console.error('Failed to delete', error);
      }
    }
  };

  const handleEditOpen = (submission) => {
    setCurrentSubmission(submission);
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setCurrentSubmission(null);
  };

  const handleEditChange = (e) => {
    setCurrentSubmission({
      ...currentSubmission,
      [e.target.name]: e.target.value
    });
  };

  const handleEditSave = async () => {
    try {
      await api.put(`/admin/forms/${currentSubmission._id}`, currentSubmission);
      handleEditClose();
      fetchSubmissions();
    } catch (error) {
      console.error('Failed to update', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Evotec Admin Dashboard
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {user?.email}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 5, mb: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4">Submissions</Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Search Name"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <TextField
              select
              label="Filter by Gender"
              size="small"
              sx={{ minWidth: 150 }}
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="MALE">Male</MenuItem>
              <MenuItem value="FEMALE">Female</MenuItem>
              <MenuItem value="OTHER">Other</MenuItem>
            </TextField>
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ bgcolor: 'background.default' }}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Submitted By</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submissions.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.firstName} {row.lastName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>{row.mobileNumber}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.userCreated?.email || 'N/A'}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEditOpen(row)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(row._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {submissions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">No submissions found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Submission</DialogTitle>
        <DialogContent>
          {currentSubmission && (
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 2 }}>
              <TextField
                label="First Name"
                name="firstName"
                value={currentSubmission.firstName}
                onChange={handleEditChange}
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={currentSubmission.lastName}
                onChange={handleEditChange}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                sx={{ gridColumn: 'span 2' }}
                value={currentSubmission.email}
                onChange={handleEditChange}
              />
              <TextField
                select
                label="Gender"
                name="gender"
                value={currentSubmission.gender}
                onChange={handleEditChange}
              >
                <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
                <MenuItem value="OTHER">Other</MenuItem>
              </TextField>
              <TextField
                label="Mobile Number"
                name="mobileNumber"
                value={currentSubmission.mobileNumber}
                onChange={handleEditChange}
              />
              <TextField
                label="Address"
                name="address"
                multiline
                rows={2}
                fullWidth
                sx={{ gridColumn: 'span 2' }}
                value={currentSubmission.address}
                onChange={handleEditChange}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;
