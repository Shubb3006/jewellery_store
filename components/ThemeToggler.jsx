import React from "react";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import toast from "react-hot-toast";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <Sun size={18} />

      <input
        aria-label="Theme toggler"
        type="checkbox"
        className="toggle toggle-sm"
        checked={theme === "dark"}
        onChange={() => {
          setTheme(theme === "light" ? "dark" : "light");
        }}
      />

      <Moon size={18} />
    </label>
  );
};

export default ThemeToggle;
