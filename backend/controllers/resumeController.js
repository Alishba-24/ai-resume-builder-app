import Resume from '../models/ResumeSchema.js';

// Create a new resume
export const createResume = async (req, res) => {
  const userId = req.userId; // coming from authenticate middleware
  const resumeData = req.body;

  try {
    const newResume = new Resume({ ...resumeData, user: userId });
    await newResume.save();

    res.status(201).json({ success: true, message: 'Resume created successfully', data: newResume });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create resume', error: err.message });
  }
};

// Get all resumes of the logged-in user
export const getUserResumes = async (req, res) => {
  const userId = req.userId;

  try {
    const resumes = await Resume.find({ user: userId });
    res.status(200).json({ success: true, data: resumes });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch resumes', error: err.message });
  }
};

// Get a single resume by ID
export const getSingleResume = async (req, res) => {
  const resumeId = req.params.id;

  try {
    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    res.status(200).json({ success: true, data: resume });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch resume', error: err.message });
  }
};

// Update a resume
export const updateResume = async (req, res) => {
  const resumeId = req.params.id;
  const updatedData = req.body;

  try {
    const resume = await Resume.findByIdAndUpdate(resumeId, updatedData, { new: true });

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    res.status(200).json({ success: true, message: 'Resume updated successfully', data: resume });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update resume', error: err.message });
  }
};

// Delete a resume
export const deleteResume = async (req, res) => {
  const resumeId = req.params.id;

  try {
    const resume = await Resume.findByIdAndDelete(resumeId);

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    res.status(200).json({ success: true, message: 'Resume deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete resume', error: err.message });
  }
};
