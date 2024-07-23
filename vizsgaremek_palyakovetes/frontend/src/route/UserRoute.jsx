import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Error } from "../pages/Error";

export const UserRoute = ({ user, redirectPath = "/login" }) => {
	if (user === null || user === undefined) {
		return <Navigate to={redirectPath} />;
	}

	if (user.isAdmin === 1) {
		return <Navigate to={"/admin/users/list"} />;
	}

	return <Outlet />;
};
