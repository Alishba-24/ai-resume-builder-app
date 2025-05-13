import React, { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../../../services/api";

const Login = ({ setIsLoggedIn, closeModal, openRegisterModal }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await loginUser(formData);

      if (data && data.token) {
        localStorage.setItem('token', data.token);
          setIsLoggedIn(true);
        closeModal();
        navigate(window.redirectAfterLogin || '/');
        window.redirectAfterLogin = null;
      } else {
        setError("Invalid credentials, please try again.");
      }

    } catch (error) {
      console.error("Login failed:", error);
      setError("An error occurred during login, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchToRegister = () => {
    closeModal();
    openRegisterModal();
  };

  return (
    <div className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
      
      {/* Dashboard access message */}
      {window.redirectAfterLogin && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded-md text-center">
          Please login to access your dashboard
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={loading}
          className="w-full mt-2"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </span>
          ) : "Login"}
        </Button>
      </form>

      <div className="mt-4 text-center text-sm">
        <p>
          Don't have an account?{" "}
          <button
            type="button"
            onClick={handleSwitchToRegister}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;