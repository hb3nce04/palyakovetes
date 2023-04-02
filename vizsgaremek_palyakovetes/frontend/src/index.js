import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Classes } from "./context/auth/ClassContext";
import { Auth } from "./context/auth/AuthContext";
import { StudentsRow } from "./context/auth/StudentsRowContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
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
reportWebVitals();
