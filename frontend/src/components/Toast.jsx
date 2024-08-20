import { useTheme } from "../contexts/ThemeContext";
import { ToastContainer } from "react-toastify";

function Toast() {
	const { mode } = useTheme();
	return (
		<ToastContainer
			position="bottom-right"
			autoClose={5000}
			draggable
			pauseOnHover
			theme={mode === "light" ? "colored" : "dark"}
		/>
	);
}

export default Toast;
