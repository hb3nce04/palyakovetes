import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
  mode: localStorage.getItem("mode"),
});

export const DarkMode = ({ children }) => {
  const [mode, setMode] = React.useState(
    localStorage.getItem("mode") ||
      //Ha még a localstoragenek nincs eleme, alapértelmezetten legyen világos a téma.
      localStorage.setItem("mode", "light")
  );

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          if (localStorage.getItem("mode") === "light") {
            localStorage.setItem("mode", "dark");
            return "dark";
          } else {
            localStorage.setItem("mode", "light");
            return "light";
          }
        });
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => React.useContext(ColorModeContext);
