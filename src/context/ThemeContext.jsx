import { createContext, useContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("nexaai-theme") || "dark";
  });

  useEffect(() => {
    localStorage.setItem("nexaai-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    document.body.style.background = theme === "dark" ? "#080614" : "#f1f0f7";
    document.body.style.color = theme === "dark" ? "#ffffff" : "#0f0c1a";
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggle, isDark: theme === "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);