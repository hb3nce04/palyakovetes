import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
  mode: localStorage.getItem("mode"),
});

export const DarkModeTest = ({ children }) => {
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
