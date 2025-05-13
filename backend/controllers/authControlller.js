import User from '../models/UserSchema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Helper function to generate JWT token
const generateToken = user => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET_KEY
    );
};

// Register a new user
export const register = async (req, res) => {
    const { email, password, name, photo, gender } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        user = new User({
            name,
            email,
            password: hashedPassword,
            photo,
            gender,
            role: 'patient', // Default role to 'patient'
        });

        await user.save();

        res.status(200).json({ success: true, message: 'User successfully created' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server error, Try again' });
    }
};

// User login
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ status: false, message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = generateToken(user);

        // Destructure user data and remove sensitive info (password)
        const { password: userPassword, ...rest } = user._doc;

        res.status(200).json({
            status: true,
            message: "Successfully logged in",
            token,
            data: { ...rest },
        });
    } catch (err) {
        res.status(500).json({ status: false, message: "Failed to login" });
    }
};
