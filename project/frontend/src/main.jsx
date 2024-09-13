import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Classes } from "./contexts/ClassContext";
import Toast from "./components/Toast";
import { Auth } from "./contexts/AuthContext";
import { StudentsRow } from "./contexts/StudentsRowContext";
import { CssBaseline } from "@mui/material";
import { Theme } from "./contexts/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Theme>
			<CssBaseline />
			<Toast />
			<Auth>
				<Classes>
					<StudentsRow>
						<App />
					</StudentsRow>
				</Classes>
			</Auth>
		</Theme>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
