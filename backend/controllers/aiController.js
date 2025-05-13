import axios from 'axios';

// Generate AI Summary (only using jobTitle)
export const generateSummary = async (req, res) => {
  try {
    const { jobTitle } = req.body;

    if (!jobTitle) {
      return res.status(400).json({ success: false, message: "Job title is required" });
    }

    const prompt = `Write a professional and compelling resume summary in 4-5 lines for a profession ${jobTitle}. Highlight the candidate's strong skills, passion for the field, eagerness to learn and grow, and commitment to excellence. Keep the tone confident, motivated, and career-focused.`;

    const modelName = "gemini-1.5-flash"; // Using Gemini API Studio

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          key: process.env.GEMINI_API_KEY,
        },
      }
    );

    const summary = response.data.candidates[0]?.content?.parts[0]?.text || "No summary generated";

    res.status(200).json({ success: true, generatedSummary: summary });

  } catch (error) {
    console.error('Error generating summary:', error.response?.data || error.message);
    res.status(500).json({ success: false, message: "Failed to generate summary", error: error.response?.data || error.message });
  }
};

// Suggest Skills
export const suggestSkills = async (req, res) => {
  try {
    const { jobTitle } = req.body;

    if (!jobTitle) {
      return res.status(400).json({ success: false, message: "Job title is required" });
    }

    const prompt = `Suggest 4-6 important skills for a ${jobTitle}. Just give a comma separated list without any explanation.`;

    const modelName = "gemini-1.5-flash";

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          key: process.env.GEMINI_API_KEY,
        },
      }
    );

    const skillsText = response.data.candidates[0]?.content?.parts[0]?.text || "";
    const skills = skillsText.split(',').map(skill => skill.trim());

    res.status(200).json({ success: true, skills });

  } catch (error) {
    console.error('Error suggesting skills:', error.response?.data || error.message);
    res.status(500).json({ success: false, message: "Failed to suggest skills", error: error.response?.data || error.message });
  }
};
