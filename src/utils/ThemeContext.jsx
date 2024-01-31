import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return JSON.parse(localStorage.getItem("theme")) || "white";
  });
  //   console.log("theme from themecontext: ", theme);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("something went wrong in themecontext");
  } else {
    return theme;
  }
};

export { useTheme, ThemeProvider };
