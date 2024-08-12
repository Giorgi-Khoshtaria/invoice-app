import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

type Theme = "light" | "dark";

type TThemeContext = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeContext = createContext<TThemeContext>({
  theme: "light",
  toggleTheme: () => {},
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const storageTheme = localStorage.getItem("theme") as null | Theme;
    if (storageTheme) return storageTheme;
    return "light";
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be within a ThemeProvider");
  }
  return context;
};
