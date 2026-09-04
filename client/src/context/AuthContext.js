import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password, isAdminLogin = false) => {
        try {
            const url = isAdminLogin ? '/auth/admin/login' : '/auth/login';
            const res = await api.post(url, { email, password });
            
            if (res.data) {
                localStorage.setItem('user', JSON.stringify(res.data));
                setUser(res.data);
                return { success: true };
            }
        } catch (error) {
            return { 
                success: false, 
                message: error.response?.data?.message || 'Login failed' 
            };
        }
    };

    const register = async (email, password, confirmPassword) => {
        try {
            const res = await api.post('/auth/register', { email, password, confirmPassword });
            
            if (res.data) {
                localStorage.setItem('user', JSON.stringify(res.data));
                setUser(res.data);
                return { success: true };
            }
        } catch (error) {
            return { 
                success: false, 
                message: error.response?.data?.message || 'Registration failed' 
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
