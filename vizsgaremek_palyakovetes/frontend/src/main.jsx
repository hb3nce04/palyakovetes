import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Classes } from "./context/ClassContext";
import { ToastContainer } from "react-toastify";
import { Auth } from "./context/AuthContext";
import { StudentsRow } from "./context/StudentsRowContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<ToastContainer
			position="bottom-right"
			autoClose={5000}
			closeOnClick
			rtl={false}
			draggable
			pauseOnHover
			theme="light"
		/>
		<Auth>
			<Classes>
				<StudentsRow>
					<App />
				</StudentsRow>
			</Classes>
		</Auth>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
