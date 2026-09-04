const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};

const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '7d',
    });
};

// Customer Registration
router.post('/register', async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'Please include all fields' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (password.length < 4) {
        return res.status(400).json({ message: 'Password must be at least 4 characters' });
    }

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            email,
            password: hashedPassword,
            role: 'CUSTOMER'
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
                refreshToken: generateRefreshToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Customer Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && user.role === 'CUSTOMER' && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
                refreshToken: generateRefreshToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password, or unauthorized role' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Admin Login
router.post('/admin/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && user.role === 'ADMIN' && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
                refreshToken: generateRefreshToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password, or unauthorized role' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Admin Creation (Protected)
router.post('/admin/create', protect, authorize('ADMIN'), async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Please include an email' });
    }

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Auto-generate random password
        const password = Math.random().toString(36).slice(-8);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            email,
            password: hashedPassword,
            role: 'ADMIN'
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                email: user.email,
                role: user.role,
                password: password // Returning it so they can see the generated password
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
