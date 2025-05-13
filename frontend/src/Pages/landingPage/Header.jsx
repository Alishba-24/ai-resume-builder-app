import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { House } from "lucide-react";
import ThemeToggleButton  from "./ThemeToggleButton"; 

const Header = ({ 
  isLoggedIn, 
  setIsLoggedIn, 
  setIsLoginModalOpen,
  setIsRegisterModalOpen 
}) => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/');
  };

  const handleDashboardAccess = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      window.redirectAfterLogin = '/dashboard';
      setIsLoginModalOpen(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header className="w-full flex justify-between items-center p-4 shadow-md">
          <h1 className="text-2xl font-bold cursor-pointer" onClick={handleNavigateHome}>
            AI Resume Builder
          </h1>
      <div className="flex items-center gap-4 min-w-fit">
        <ThemeToggleButton className="mr-4" />
        {!isLoggedIn ? (
          <>
            <Button variant="outline" onClick={() => setIsLoginModalOpen(true)}>
              Login
            </Button>
            <Button onClick={() => setIsRegisterModalOpen(true)}>
              Get Started
            </Button>
          </>
        ) : (
          <div className="flex items-center gap-5">
            <div onClick={handleNavigateHome} className="cursor-pointer">
              <House size={40} />
            </div>
            <div onClick={handleDashboardAccess} className="cursor-pointer">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;