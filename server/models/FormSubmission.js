const mongoose = require('mongoose');

const formSubmissionSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    gender: {
        type: String,
        enum: ['MALE', 'FEMALE', 'OTHER'],
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
        match: [/^\+?[1-9]\d{1,14}$/, 'Please add a valid mobile number']
    },
    address: {
        type: String,
        required: true,
    },
    feedback: {
        type: String,
    },
    userCreated: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    userModified: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    dateModified: {
        type: Date,
    }
});

// Ensure email is unique per submission per user, or just unique globally depending on the requirements.
// The requirement says: "email (String, Yes, Valid email format, unique per submission)".
// If it's unique per submission globally, we should add an index. But users might submit multiple forms?
// Actually, it says "unique per submission" which means it's unique across all submissions.
formSubmissionSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('FormSubmission', formSubmissionSchema);
