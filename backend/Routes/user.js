import express from "express";
import { updateUser, deleteUser, getAllUsers, getSingleUser, getUserProfile } from '../controllers/userController.js';
import { authenticate } from "../auth/verifyToken.js";

const router = express.Router();


router.get('/:id', authenticate, getSingleUser);


router.get('/', authenticate, getAllUsers);


router.put('/:id', authenticate, (req, res, next) => {
    if (req.userId !== req.params.id) {
        return res.status(403).json({ success: false, message: "You are not allowed to update this user" });
    }
    next(); 
}, updateUser);


router.delete('/:id', authenticate, (req, res, next) => {
    if (req.userId !== req.params.id) {
        return res.status(403).json({ success: false, message: "You are not allowed to delete this user" });
    }
    next(); 
}, deleteUser);

router.get('/profile/me', authenticate, getUserProfile);

export default router;
