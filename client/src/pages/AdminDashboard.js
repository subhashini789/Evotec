import React, { useState, useEffect, useContext } from 'react';
import { 
  Box, Typography, Button, Container, Paper, TextField, MenuItem, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  AppBar, Toolbar, Modal, IconButton, Stack, Chip, OutlinedInput, Select
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { Pencil, Trash2, Search, FileText } from 'lucide-react';
import CloseIcon from '@mui/icons-material/Close';

const AdminDashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [submissions, setSubmissions] = useState([]);
  const [search, setSearch] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentSubmission, setCurrentSubmission] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [submissionToDelete, setSubmissionToDelete] = useState(null);

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

  const handleDeleteConfirm = async () => {
    if (submissionToDelete) {
      try {
        await api.delete(`/admin/forms/${submissionToDelete._id}`);
        fetchSubmissions();
        setDeleteModalOpen(false);
        setSubmissionToDelete(null);
      } catch (error) {
        console.error('Failed to delete', error);
      }
    }
  };

  const handleEditOpen = (submission) => {
    setCurrentSubmission(submission);
    setEditModalOpen(true);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
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

  // Stats
  const totalSubmissions = submissions.length;
  const maleSubmissions = submissions.filter(s => s.gender === 'MALE').length;
  const femaleSubmissions = submissions.filter(s => s.gender === 'FEMALE').length;

  const renderGenderBadge = (gender) => {
    if (gender === 'MALE') return <Chip label="Male" size="small" sx={{ bgcolor: '#EFF6FF', color: '#1D4ED8', fontWeight: 600, fontSize: '12px' }} />;
    if (gender === 'FEMALE') return <Chip label="Female" size="small" sx={{ bgcolor: '#FDF2F8', color: '#BE185D', fontWeight: 600, fontSize: '12px' }} />;
    return <Chip label="Other" size="small" sx={{ bgcolor: '#F3F4F6', color: '#4B5563', fontWeight: 600, fontSize: '12px' }} />;
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      
      {/* Navbar */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: '#0F172A', color: 'white', px: { xs: 2, sm: 4 } }}>
        <Toolbar sx={{ height: '64px', p: '0 !important' }}>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ flexGrow: 1, fontWeight: '700', fontSize: '22px', letterSpacing: '-0.5px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            onClick={() => navigate('/admin/dashboard')}
          >
            <span style={{ color: '#FFFFFF' }}>Form</span>
            <span style={{ color: '#60A5FA' }}>Flow</span>
            <span style={{ color: '#FFFFFF', marginLeft: '6px' }}>Admin</span>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Button 
              sx={{ color: '#CBD5E1', display: { xs: 'none', sm: 'block' }, '&:hover': { color: '#FFFFFF', backgroundColor: 'transparent' } }}
              onClick={() => navigate('/admin/dashboard')}
            >
              Dashboard
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

      <Container maxWidth="lg" sx={{ mt: 5, mb: 8, flexGrow: 1 }}>
        <Box mb={5}>
          <Typography variant="h2" fontSize="28px" mb={1}>Admin Dashboard</Typography>
          <Typography variant="body1">Manage and review customer submissions.</Typography>
        </Box>

        {/* Stat Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 3, mb: 5 }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: '12px' }}>
            <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 500, mb: 1 }}>Total Submissions</Typography>
            <Typography variant="h2" sx={{ fontSize: '32px', color: '#0F172A' }}>{totalSubmissions}</Typography>
          </Paper>
          <Paper elevation={0} sx={{ p: 3, borderRadius: '12px' }}>
            <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 500, mb: 1 }}>Male Submissions</Typography>
            <Typography variant="h2" sx={{ fontSize: '32px', color: '#0F172A' }}>{maleSubmissions}</Typography>
          </Paper>
          <Paper elevation={0} sx={{ p: 3, borderRadius: '12px' }}>
            <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 500, mb: 1 }}>Female Submissions</Typography>
            <Typography variant="h2" sx={{ fontSize: '32px', color: '#0F172A' }}>{femaleSubmissions}</Typography>
          </Paper>
        </Box>

        <Typography variant="h6" mb={2}>Submissions</Typography>
        
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
          <TextField
            placeholder="Search by name..."
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: <Search size={18} style={{ color: '#94A3B8', marginRight: '8px' }} />
            }}
            sx={{ width: { xs: '100%', sm: '300px' } }}
          />
          <TextField
            select
            size="small"
            sx={{ minWidth: 150 }}
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">All Genders</MenuItem>
            <MenuItem value="MALE">Male</MenuItem>
            <MenuItem value="FEMALE">Female</MenuItem>
            <MenuItem value="OTHER">Other</MenuItem>
          </TextField>
        </Box>

        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '12px' }}>
          <Table sx={{ minWidth: 700 }}>
            <TableHead sx={{ bgcolor: '#F8FAFC' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Gender</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Mobile</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569', py: 2, align: 'right' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submissions.map((row) => (
                <TableRow key={row._id} hover sx={{ '& td': { borderBottom: '1px solid #E2E8F0', py: 2, color: '#334155' }, '&:last-child td': { border: 0 } }}>
                  <TableCell fontWeight="500">{row.firstName} {row.lastName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{renderGenderBadge(row.gender)}</TableCell>
                  <TableCell>{row.mobileNumber}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <IconButton 
                        size="small" 
                        onClick={() => handleEditOpen(row)}
                        sx={{ bgcolor: '#EFF6FF', color: '#2563EB', borderRadius: '8px', p: 1, '&:hover': { bgcolor: '#DBEAFE' } }}
                      >
                        <Pencil size={16} />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => { setSubmissionToDelete(row); setDeleteModalOpen(true); }}
                        sx={{ bgcolor: '#FEF2F2', color: '#DC2626', borderRadius: '8px', p: 1, '&:hover': { bgcolor: '#FEE2E2' } }}
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
              {submissions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                    <Box display="flex" flexDirection="column" alignItems="center" color="#94A3B8">
                      <FileText size={48} strokeWidth={1} style={{ marginBottom: '16px' }} />
                      <Typography variant="h6" color="text.primary" mb={1}>No submissions found</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {search || genderFilter ? `No results found matching your filters.` : `There aren't any customer submissions yet.`}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Edit Modal */}
      <Modal open={editModalOpen} onClose={handleEditClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        <Paper elevation={0} sx={{ position: 'relative', p: 4, width: '100%', maxWidth: 500, maxHeight: '90vh', overflowY: 'auto', borderRadius: '16px' }}>
          <Box mb={3}>
            <Typography variant="h5" fontWeight="600">Edit Submission</Typography>
            <IconButton size="small" onClick={handleEditClose} sx={{ position: 'absolute', top: 20, right: 20 }}><CloseIcon fontSize="small" /></IconButton>
          </Box>
          
          {currentSubmission && (
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 2.5 }}>
              <Box display="flex" gap={2.5}>
                <Box flex={1}>
                  <Typography sx={{ display: 'block', mb: '6px', fontSize: '13px', fontWeight: '500', color: '#334155' }}>First Name</Typography>
                  <OutlinedInput name="firstName" value={currentSubmission.firstName} onChange={handleEditChange} fullWidth sx={{ bgcolor: '#FFFFFF', borderRadius: '8px' }} />
                </Box>
                <Box flex={1}>
                  <Typography sx={{ display: 'block', mb: '6px', fontSize: '13px', fontWeight: '500', color: '#334155' }}>Last Name</Typography>
                  <OutlinedInput name="lastName" value={currentSubmission.lastName} onChange={handleEditChange} fullWidth sx={{ bgcolor: '#FFFFFF', borderRadius: '8px' }} />
                </Box>
              </Box>
              
              <Box>
                <Typography sx={{ display: 'block', mb: '6px', fontSize: '13px', fontWeight: '500', color: '#334155' }}>Email</Typography>
                <OutlinedInput name="email" type="email" value={currentSubmission.email} onChange={handleEditChange} fullWidth sx={{ bgcolor: '#FFFFFF', borderRadius: '8px' }} />
              </Box>
              
              <Box display="flex" gap={2.5}>
                <Box flex={1}>
                  <Typography sx={{ display: 'block', mb: '6px', fontSize: '13px', fontWeight: '500', color: '#334155' }}>Gender</Typography>
                  <Select name="gender" value={currentSubmission.gender} onChange={handleEditChange} fullWidth sx={{ bgcolor: '#FFFFFF', borderRadius: '8px', '& .MuiSelect-select': { py: 1.5 } }}>
                    <MenuItem value="MALE">Male</MenuItem>
                    <MenuItem value="FEMALE">Female</MenuItem>
                    <MenuItem value="OTHER">Other</MenuItem>
                  </Select>
                </Box>
                <Box flex={1}>
                  <Typography sx={{ display: 'block', mb: '6px', fontSize: '13px', fontWeight: '500', color: '#334155' }}>Mobile Number</Typography>
                  <OutlinedInput name="mobileNumber" value={currentSubmission.mobileNumber} onChange={handleEditChange} fullWidth sx={{ bgcolor: '#FFFFFF', borderRadius: '8px' }} />
                </Box>
              </Box>
              
              <Box>
                <Typography sx={{ display: 'block', mb: '6px', fontSize: '13px', fontWeight: '500', color: '#334155' }}>Address</Typography>
                <OutlinedInput name="address" multiline rows={3} value={currentSubmission.address} onChange={handleEditChange} fullWidth sx={{ bgcolor: '#FFFFFF', borderRadius: '8px', '& .MuiOutlinedInput-input': { height: 'auto', padding: '12px' } }} />
              </Box>
              
              <Box mt={3} pt={2} display="flex" justifyContent="flex-end" gap={2}>
                <Button onClick={handleEditClose} variant="outlined" sx={{ bgcolor: 'white' }}>Cancel</Button>
                <Button onClick={handleEditSave} variant="contained" disableElevation>Save Changes</Button>
              </Box>
            </Box>
          )}
        </Paper>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        <Paper elevation={0} sx={{ p: 4, width: '100%', maxWidth: 400, borderRadius: '16px' }}>
          <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
            <Box sx={{ bgcolor: '#FEF2F2', p: 2, borderRadius: '50%', mb: 2, color: '#DC2626' }}>
              <Trash2 size={24} />
            </Box>
            <Typography variant="h5" fontWeight="600" mb={1}>Delete Submission?</Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              Are you sure you want to delete the submission from {submissionToDelete?.firstName} {submissionToDelete?.lastName}? This action cannot be undone.
            </Typography>
            
            <Stack direction="row" spacing={2} width="100%">
              <Button onClick={() => setDeleteModalOpen(false)} variant="outlined" fullWidth sx={{ bgcolor: 'white' }}>Cancel</Button>
              <Button onClick={handleDeleteConfirm} variant="contained" color="error" fullWidth disableElevation>Delete</Button>
            </Stack>
          </Box>
        </Paper>
      </Modal>

    </Box>
  );
};

export default AdminDashboard;
