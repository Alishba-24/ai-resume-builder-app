import express from "express";
import { generateSummary, suggestSkills } from "../controllers/aiController.js";
import { authenticate } from '../auth/verifyToken.js';

const router = express.Router();

// Protected Routes (user must be logged in)
router.post("/generate-summary", authenticate, generateSummary);
router.post("/suggest-skills", authenticate, suggestSkills);

export default router;
