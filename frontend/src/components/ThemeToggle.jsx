import { useTheme } from "../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="theme-toggle-btn"
    >
      <span className={`toggle-icon ${theme === "dark" ? "active" : ""}`}>
        <FiMoon size={16} />
      </span>
      <span className={`toggle-icon ${theme === "light" ? "active" : ""}`}>
        <FiSun size={16} />
      </span>
    </button>
  );
}
