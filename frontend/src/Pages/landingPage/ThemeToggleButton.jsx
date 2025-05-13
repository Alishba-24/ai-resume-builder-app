import { useContext } from 'react';
import { AppContext } from '../../context/ResumeContext'; 
import { Moon, Sun } from 'lucide-react'; 
import { Button } from '../../components/ui/button'; 

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useContext(AppContext);

  return (
    <Button
      variant="ghost"  
      size="icon"      
      onClick={toggleTheme}
      className="rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5" /> 
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </Button>
  );
}

export default ThemeToggleButton;