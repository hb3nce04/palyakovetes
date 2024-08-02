import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export const Error = ({ message }) => {
	const { currentUser } = useContext(AuthContext);

	return (
		<div className="genericNotFound">
			<h2>{message}</h2>
			<Link to={"/"} className="backToHomePageButton">
				<span>Vissza a főoldalra</span>
			</Link>
		</div>
	);
};
