import { createContext, useContext, useMemo, useState } from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

const ThemeModeContext = createContext({ toggleMode: () => {} });

// Design tokens
const colors = {
  amber: "#EF9F27",
  teal: "#1D9E75",
  coral: "#D85A30",
  dark: "#0E0C09",
  warm: "#F8F6F1",
  dark_paper: "#1C1A16",
  warm_paper: "#FFFFFF",
};

// Build palette based on mode
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: { main: colors.amber },
    secondary: { main: colors.teal },
    error: { main: colors.coral },
    success: { main: colors.teal },
    ...(mode === "light"
      ? {
          background: { default: colors.warm, paper: colors.warm_paper },
          text: { primary: colors.dark },
        }
      : {
          background: { default: colors.dark, paper: colors.dark_paper },
          text: { primary: colors.warm },
        }),
  },
});

// Wraps MUI ThemeProvider with mode toggle state
export function ThemeProvider({ children }) {
  // Priority: saved preference → OS preference → light
  const [mode, setMode] = useState(
    () =>
      localStorage.getItem("theme-mode") ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"),
  );

  const toggleMode = () => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme-mode", next);
      return next;
    });
  };

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeModeContext.Provider>
  );
}

// Returns { mode, toggleMode } - use in any component to read or switch theme
export const useThemeMode = () => useContext(ThemeModeContext);
