import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import CustomerRegister from './pages/CustomerRegister';
import CustomerLogin from './pages/CustomerLogin';
import AdminLogin from './pages/AdminLogin';
import ApplicationPage from './pages/ApplicationPage';
import AdminDashboard from './pages/AdminDashboard';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563EB',
      light: '#EFF6FF',
      dark: '#1D4ED8',
    },
    secondary: {
      main: '#64748B',
      light: '#94A3B8',
      dark: '#334155',
    },
    error: {
      main: '#DC2626',
      light: '#FEF2F2',
      dark: '#B91C1C',
    },
    success: {
      main: '#16A34A',
      light: '#F0FDF4',
      dark: '#15803d',
    },
    info: {
      main: '#0EA5E9',
      light: '#E0F2FE',
    },
    warning: {
      main: '#F59E0B',
      light: '#FFFBEB',
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0F172A',
      secondary: '#64748B',
      disabled: '#94A3B8',
    },
    divider: '#E2E8F0',
  },
  typography: {
    fontFamily: '"Inter", Arial, sans-serif',
    h1: { fontSize: '48px', fontWeight: 700, color: '#0F172A' },
    h2: { fontSize: '32px', fontWeight: 700, color: '#0F172A' },
    h3: { fontSize: '24px', fontWeight: 600, color: '#0F172A' },
    h4: { fontSize: '20px', fontWeight: 600, color: '#0F172A' },
    h5: { fontSize: '18px', fontWeight: 600, color: '#0F172A' },
    h6: { fontSize: '16px', fontWeight: 600, color: '#0F172A' },
    body1: { fontSize: '15px', color: '#64748B', lineHeight: 1.6 },
    body2: { fontSize: '14px', color: '#64748B' },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    }
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 18px',
          boxShadow: 'none',
          fontSize: '14px',
          '&:hover': {
            boxShadow: 'none',
          }
        },
        containedPrimary: {
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#1D4ED8',
          }
        },
        outlined: {
          borderColor: '#CBD5E1',
          color: '#334155',
          backgroundColor: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#F8FAFC',
            borderColor: '#94A3B8',
          }
        }
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
        },
        rounded: {
          borderRadius: 16,
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: '#FFFFFF',
            color: '#0F172A',
            height: '44px',
            '& fieldset': {
              borderColor: '#CBD5E1',
              borderWidth: '1px',
              transition: '0.2s',
            },
            '&:hover fieldset': {
              borderColor: '#94A3B8',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2563EB',
              borderWidth: '1px',
              boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.12)',
            }
          },
          '& .MuiOutlinedInput-input': {
            height: '44px',
            boxSizing: 'border-box',
          },
          '& .MuiInputLabel-root': {
            top: '-4px', // Adjust label due to fixed height
          },
          '& .MuiInputLabel-shrink': {
            top: '0',
          },
          '& .MuiInputBase-input::placeholder': {
            color: '#94A3B8',
            opacity: 1,
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          fontWeight: 500,
          color: '#334155',
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        standardError: {
          backgroundColor: '#FEF2F2',
          color: '#991B1B',
          border: '1px solid #FECACA',
        },
        standardSuccess: {
          backgroundColor: '#F0FDF4',
          color: '#166534',
          border: '1px solid #BBF7D0',
        }
      }
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<CustomerRegister />} />
            <Route path="/login" element={<CustomerLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Protected Customer Routes */}
            <Route 
              path="/apply" 
              element={
                <ProtectedRoute roleRequired="CUSTOMER">
                  <ApplicationPage />
                </ProtectedRoute>
              } 
            />

            {/* Protected Admin Routes */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute roleRequired="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
