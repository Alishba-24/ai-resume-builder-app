import jwt from 'jsonwebtoken';
import User from '../models/UserSchema.js';

// Authentication Middleware
export const authenticate = async (req, res, next) => {
    const authToken = req.headers.authorization;

    console.log("Authenticating user...");

    // Check if token is provided
    if (!authToken || !authToken.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "No token, authorization denied" });
    }

    try {
        // Extract token and verify it
        const token = authToken.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Store user info in the request for further use
        req.userId = decoded.id;
        req.role = decoded.role; // you might not need this if no roles are in use

        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Invalid Token" });
    }
};

// Restrict Access Middleware (if you're still using roles like "patient")
export const restrict = (roles) => async (req, res, next) => {
    const userId = req.userId;

    console.log("User ID:", userId);

    const user = await User.findById(userId);

    // If user doesn't exist or role isn't authorized, deny access
    if (!user || (roles.length > 0 && !roles.includes(user.role))) {
        return res.status(401).json({ success: false, message: "You're not authorized" });
    }

    next();
};
