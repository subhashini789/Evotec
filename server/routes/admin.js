const express = require('express');
const router = express.Router();
const FormSubmission = require('../models/FormSubmission');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

// All routes here are protected and require ADMIN role
router.use(protect);
router.use(authorize('ADMIN'));

// Get All Submissions (with filtering and search)
router.get('/', async (req, res) => {
    const { gender, search } = req.query;
    
    let query = {};

    if (gender) {
        query.gender = gender;
    }

    if (search) {
        query.$or = [
            { firstName: { $regex: search, $options: 'i' } },
            { lastName: { $regex: search, $options: 'i' } }
        ];
    }

    try {
        const submissions = await FormSubmission.find(query).populate('userCreated', 'email').populate('userModified', 'email');
        res.json(submissions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a Submission
router.put('/:id', async (req, res) => {
    try {
        let submission = await FormSubmission.findById(req.params.id);

        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }

        const updateData = {
            ...req.body,
            userModified: req.user._id,
            dateModified: Date.now()
        };

        submission = await FormSubmission.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        res.json(submission);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a Submission
router.delete('/:id', async (req, res) => {
    try {
        const submission = await FormSubmission.findById(req.params.id);

        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }

        await submission.deleteOne();

        res.json({ message: 'Submission removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
