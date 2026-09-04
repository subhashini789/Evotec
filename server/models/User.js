const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
    },
    role: {
        type: String,
        enum: ['CUSTOMER', 'ADMIN'],
        default: 'CUSTOMER',
    },
});

module.exports = mongoose.model('User', userSchema);
