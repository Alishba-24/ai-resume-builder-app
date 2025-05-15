import axios from 'axios';


  const API = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL || 'http://localhost:5000' ,  
  });

// Register user
export const registerUser = (userData) => {
  return API.post('/api/v1/auth/register', userData);  
};

// Login user and receive JWT token
export const loginUser = async (credentials) => {
  const response = await API.post('/api/v1/auth/login', credentials); 
  return response.data;  
};

// Update user profile
export const updateUserProfile = async (token, updatedData) => {
  try {
    // Make sure to pass correct user ID, name, and email
    const response = await API.put(`/api/v1/users/${updatedData.id}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user profile", error);
    return null;
  }
};


// Get user profile
export const getUserProfile = async (token) => {
  try {
    const response = await API.get('/api/v1/users/profile/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile", error);
    return null;
  }
};

// Delete user account
export const deleteUserAccount = async (token, userId) => {
  try {
    const response = await API.delete(`/api/v1/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting user account", error);
    return null;
  }
};



// Resume Routes


// Get the resume by user ID

export const getResumeById = async (resumeId, token) => {
  return await API.get(`/api/v1/resumes/${resumeId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};



// Delete a resume
export const deleteResume = async (resumeId, token) => {
  const response = await API.delete(`/api/v1/resumes/${resumeId}`, {
    headers: { Authorization: `Bearer ${token}` },  
  });
  return response.data;  
};

// Fetch all resumes (admin use)
export const getAllResumes = async (token) => {
  const response = await API.get('/api/v1/resumes', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;  
};



export const getResumeDetail = async (resumeId, token) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/resumes/${resumeId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch resume');
  }

  return await response.json();
};


// Update resume
export const updateResume = async (resumeId, payload, token) => {
  const response = await API.put(`/api/v1/resumes/${resumeId}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;  // This will return the updated resume data
};


// This function will create or update the resume depending on the resumeId passed
export const createOrUpdateResume = async (token, resumeData, resumeId = null) => {
  try {
    let response;
    if (resumeId) {
      // If a resumeId exists, update the resume
      response = await API.put(`/api/v1/resumes/${resumeId}`, resumeData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      // Otherwise, create a new resume
      response = await API.post('/api/v1/resumes', resumeData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error occurred while creating or updating resume');
  }
};


// Generate AI-based Resume Summary
export const generateAISummary = async (jobTitle, token) => {
  const response = await API.post('/api/v1/ai/generate-summary', { jobTitle }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;  // { success: true, generatedSummary: "..." }
};

// Suggest AI-based Skills
export const suggestAISkills = async (jobTitle, token) => {
  const response = await API.post('/api/v1/ai/suggest-skills', { jobTitle }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data; 
};


export const createCheckoutSession = (template_id) => {
  const token = localStorage.getItem("token"); 
  return API.post(
    "/api/v1/payment/create-checkout-session",
    { template_id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


  export const verifyPayment = (session_id, token) => {
  return API.get(`/api/v1/payment/verify-payment?session_id=${session_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const checkIfUserAlreadyPaid = (token) => {
  return API.get("/api/v1/payment/check-user-paid", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


