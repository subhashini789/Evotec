const express = require('express');
const router = express.Router();
const FormSubmission = require('../models/FormSubmission');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

// Submit a form (Customer Protected Route)
router.post('/', protect, authorize('CUSTOMER'), async (req, res) => {
    const { firstName, lastName, email, gender, mobileNumber, address, feedback } = req.body;

    try {
        // Basic validation
        if (!firstName || !lastName || !email || !gender || !mobileNumber || !address) {
            return res.status(400).json({ message: 'Please include all required fields' });
        }

        // Check if email already submitted
        const existingSubmission = await FormSubmission.findOne({ email });
        if (existingSubmission) {
            return res.status(400).json({ message: 'A submission with this email already exists' });
        }

        const submission = await FormSubmission.create({
            firstName,
            lastName,
            email,
            gender,
            mobileNumber,
            address,
            feedback,
            userCreated: req.user._id,
        });

        res.status(201).json(submission);
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
