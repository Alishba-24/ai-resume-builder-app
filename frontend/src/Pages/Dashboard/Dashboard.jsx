import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect } from 'react';
import { getUserProfile } from '../../../services/api'; // Assuming this is your service to get the user profile
import MyTemplates from './components/MyTemplate';
import Profile from './Profile';
import ManageResumes from './components/ManageResumes';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile'); // Default to profile tab
  const [userData, setUserData] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile(token);
      if (response?.success) {
        setUserData(response.data); // Store the fetched user data
      } else {
        navigate("/login"); // If no data or failed response, redirect to login
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Tab content components
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <Profile />;
      case 'templates':
        return <MyTemplates />;
      case 'resumes':
        return <ManageResumes />
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-200 dark:bg-black dark:text-white text-black p-4">
        <div className="mb-6 flex items-center">
          <Avatar className="cursor-pointer w-20 h-20">
            <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
            <AvatarFallback>{userData?.name?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          {/* Display user's name */}
          <span className="ml-6 text-lg font-semibold">{userData ? userData.name : "Loading..."}</span>
        </div>
        
        <ul className="space-y-4">
          <li>
            <Button
              variant="outline"
              className={`w-full ${activeTab === "profile" ? "bg-gray-700 dark:bg-gray-600 text-white" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              Manage Your Profile
            </Button>
          </li>
          <li>
            <Button
              variant="outline"
              className={`w-full ${activeTab === "templates" ? "bg-gray-700 dark:bg-gray-600 text-white" : ""}`}
              onClick={() => setActiveTab("templates")}
            >
            Templates
            </Button>
          </li>
          <li>
            <Button
              variant="outline"
              className={`w-full ${activeTab === "resumes" ? "bg-gray-700 dark:bg-gray-600 text-white" : ""}`}
              onClick={() => setActiveTab("resumes")}
            >
                Manage Your Resumes
            </Button>
          </li>
          <li>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 dark:bg-gray-900 bg-gray-100">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Dashboard;
