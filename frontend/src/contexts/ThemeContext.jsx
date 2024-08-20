import { createContext, useState, useMemo, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const ThemeContext = createContext({
	toggleColorMode: () => {},
	mode: localStorage.getItem("mode")
});

export const Theme = ({ children }) => {
	const [mode, setMode] = useState(
		localStorage.getItem("mode") ||
			localStorage.setItem(
				"mode",
				window.matchMedia &&
					window.matchMedia("(prefers-color-scheme: dark)")
					? "dark"
					: "light"
			)
	);

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => {
					const newMode = prevMode === "light" ? "dark" : "light";
					localStorage.setItem("mode", newMode);
					return newMode;
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
		<ThemeContext.Provider value={{ colorMode, mode }}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);
