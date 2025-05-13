import User from '../models/UserSchema.js';

// Update a user
export const updateUser = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json({ success: true, message: "Successfully updated", data: updatedUser });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to update" });
    }
};

// Delete a user
export const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        await User.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Successfully deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to delete" });
    }
};

// Get a single user (without password)
export const getSingleUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id).select("-password");

        res.status(200).json({ success: true, message: "User found", data: user });
    } catch (err) {
        res.status(404).json({ success: false, message: "No user found" });
    }
};

// Get all users (without passwords)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");

        res.status(200).json({ success: true, message: "Users found", data: users });
    } catch (err) {
        res.status(404).json({ success: false, message: "Not found" });
    }
};

// Get logged-in user's profile
export const getUserProfile = async (req, res) => {
    const userId = req.userId;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const { password, ...rest } = user._doc;

        res.status(200).json({ success: true, message: "Profile info fetched", data: { ...rest } });
    } catch (err) {
        res.status(500).json({ success: false, message: "Something went wrong, cannot get profile" });
    }
};
