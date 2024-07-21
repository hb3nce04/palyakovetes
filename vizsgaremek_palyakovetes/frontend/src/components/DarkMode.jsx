import { createContext, useState, useMemo, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const ColorModeContext = createContext({
	toggleColorMode: () => {},
	mode: localStorage.getItem("mode")
});

export const DarkMode = ({ children }) => {
	const [mode, setMode] = useState(
		localStorage.getItem("mode") ||
			//Ha még a localstoragenek nincs eleme, alapértelmezetten legyen világos a téma.
			localStorage.setItem("mode", "light")
	);

	const colorMode = useMemo(
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
			}
		}),
		[]
	);

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode
				}
			}),
		[mode]
	);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ColorModeContext.Provider>
	);
};

export const useColorMode = () => useContext(ColorModeContext);
