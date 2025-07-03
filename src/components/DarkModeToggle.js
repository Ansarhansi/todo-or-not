// src/components/DarkModeToggle.js
export default function DarkModeToggle({ theme, setTheme }) {
  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded text-sm"
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
