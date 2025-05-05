import { FaSun, FaMoon } from "react-icons/fa";

interface ThemeToggleProps {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      style = {{
        background: "none",
        border: 'none',
        fontSize: '1.5rem',
        cursor: 'pointer',
        color: theme === 'light' ? '#333' : '#fff'
      }}
    >
      {theme === 'light' ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default ThemeToggle;
 