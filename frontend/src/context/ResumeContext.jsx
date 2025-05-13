// src/context/ResumeContext.jsx

import React, { createContext, useState } from "react";

// Dummy Data — tumne jo bheja tha wahi rakh raha hoon
const defaultResumeInfo = {
  firstname: "John",
  lastname: "Doe",
  jobTitle: "Software Engineer",
  address: '123 Main St, Cityville, ST 12345',
  phone: '123-456-7890',
  email: 'example@gmail.com',
  themeColor: "#ff6666",
  summary: 'A highly motivated software engineer with a passion for developing innovative programs that expedite the efficiency and effectiveness of organizational success.',
  experience: [
    {
      id: 1,
      title: 'Software Engineer',
      company: 'Tech Company',
      city: 'Cityville',
      state: 'ST',
      startDate: '2022-01-01',
      endDate: '',
      currentlyWorking: true,
      workSummary: 'Worked on various projects using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.'
    },
    // {
      // id: 2,
      // title: 'Software Engineer',
      // company: 'Tech Company',
      // city: 'Cityville',
      // state: 'ST',
      // startDate: '2022-01-01',
      // endDate: '',
      // currentlyWorking: true,
      // workSummery: 'Worked on various projects using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.'
    // },
    // {
      // id: 3,
      // title: 'Software Engineer',
      // company: 'Tech Company',
      // city: 'Cityville',
      // state: 'ST',
      // startDate: '2022-01-01',
      // endDate: '',
      // currentlyWorking: true,
      // workSummery: 'Worked on various projects using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.'
    // }
  ],
  education: [
    {
      id: 1,
      universityName: 'University of Cityville',
      startDate: '2018-01-01',
      endDate: '2022-01-01',
      degree: 'Bachelor of Science in Computer Science',
      major: 'Computer Science',
      description: 'Studied various computer science topics including algorithms, data structures, and software engineering.'
    },
    // {
      // id: 2,
      // universityName: 'University of Cityville',
      // startDate: '2018-01-01',
      // endDate: '2022-01-01',
      // degree: 'Bachelor of Science in Computer Science',
      // major: 'Computer Science',
      // description: 'Studied various computer science topics including algorithms, data structures, and software engineering.'
    // },
    // {
      // id: 3,
      // universityName: 'University of Cityville',
      // startDate: '2018-01-01',
      // endDate: '2022-01-01',
      // degree: 'Bachelor of Science in Computer Science',
      // major: 'Computer Science',
      // description: 'Studied various computer science topics including algorithms, data structures, and software engineering.'
    // }
  ],
  skills: [
    { id: 1, name: 'Angular', rating: 80 },
    { id: 2, name: 'MongoDB', rating: 50 },
    { id: 3, name: 'Laravel', rating: 20 },
    { id: 4, name: 'Vue', rating: 100 }
  ]
};

export const ResumeContext = createContext();


export const ResumeProvider = ({ children }) => {
  const [resumeInfo, setResumeInfo] = useState(defaultResumeInfo);
  const [resumeId, setResumeId] = useState(null);  // Store resumeId

  const updateResumeId = (id) => setResumeId(id);  // Function to update resumeId

  return (
    <ResumeContext.Provider value={{ resumeInfo, setResumeInfo, resumeId, setResumeId: updateResumeId }}>
      {children}
    </ResumeContext.Provider>
  );
};


// import { createContext, useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const { theme, setTheme } = useTheme();
  const [someOtherState, setSomeOtherState] = useState('');

  // Toggle theme light <-> dark
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <AppContext.Provider
      value={{ theme, setTheme, toggleTheme, someOtherState, setSomeOtherState }}
    >
      {children}
    </AppContext.Provider>
  );
}

