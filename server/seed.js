require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for seeding');

        const adminExists = await User.findOne({ email: 'admin@evotec.com' });
        
        if (adminExists) {
            console.log('Admin already exists!');
            process.exit(0);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        await User.create({
            email: 'admin@evotec.com',
            password: hashedPassword,
            role: 'ADMIN'
        });

        console.log('Admin seeded successfully! Email: admin@evotec.com, Password: admin123');
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedAdmin();
