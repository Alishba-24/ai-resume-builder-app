import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import LandingPage from './Pages/landingPage/LandingPage';
import Dashboard from './Pages/Dashboard/Dashboard';
import Header from './Pages/landingPage/Header';
import ModalManager from './Pages/Auth/ModalManager';
import { ResumeProvider } from './context/ResumeContext'; 
import EditResume from "./Pages/Dashboard/components/EditResume";
import PaymentSuccess from "./Pages/Dashboard/components/PaymentSuccess";
import PaymentFail from "./Pages/Dashboard/components/PaymentFail";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const authStatus = !!token;
    setIsLoggedIn(authStatus);

    if (!authStatus && location.pathname.startsWith('/dashboard')) {
      setIsLoginModalOpen(true);
      window.redirectAfterLogin = '/dashboard';
      navigate('/', { replace: true });
    }
  }, [location, navigate]);

  return (
    <div>
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setIsLoginModalOpen={setIsLoginModalOpen}
        setIsRegisterModalOpen={setIsRegisterModalOpen}
      />

      <ModalManager
        isLoginModalOpen={isLoginModalOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
        isRegisterModalOpen={isRegisterModalOpen}
        setIsRegisterModalOpen={setIsRegisterModalOpen}
        setIsLoggedIn={setIsLoggedIn}
      />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/payment-success' element={<PaymentSuccess/>} />
        <Route path='/payment-fail' element={<PaymentFail/>} />


        {isLoggedIn ? (
          <>
            <Route path="/dashboard" element={
              <ResumeProvider>
                <Dashboard />
              </ResumeProvider>
            } />
            <Route path="/dashboard/edit-resume/:resumeId" element={
              <ResumeProvider>
                <EditResume />
              </ResumeProvider>
            } />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" replace />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
