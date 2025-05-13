import express from 'express';
import { createResume, getUserResumes, getSingleResume, updateResume, deleteResume } from '../controllers/resumeController.js';
import { authenticate } from '../auth/verifyToken.js';

const router = express.Router();

// Create a new resume
router.post('/', authenticate, createResume);

// Get all resumes of the logged-in user
router.get('/', authenticate, getUserResumes);

// Get a single resume by ID
router.get('/:id', authenticate, getSingleResume);

// Update a resume
router.put('/:id', authenticate, updateResume);

// Delete a resume
router.delete('/:id', authenticate, deleteResume);

export default router;
