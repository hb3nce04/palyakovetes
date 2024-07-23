import { CssBaseline } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Error = ({ message }) => {
	const { currentUser } = useContext(AuthContext);

	return (
		<div className="genericNotFound">
			<CssBaseline />
			<h2>{message}</h2>
			<Link
				to={
					currentUser === null
						? "/login"
						: currentUser.isAdmin === 1
						? "/admin/users/list"
						: "/"
				}
				className="backToHomePageButton"
			>
				<span>Vissza a főoldalra</span>
			</Link>
		</div>
	);
};
