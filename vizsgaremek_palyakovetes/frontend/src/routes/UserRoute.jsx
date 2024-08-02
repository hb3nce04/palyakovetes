import { Outlet, Navigate } from "react-router-dom";

export const UserRoute = ({ user }) => {
	if (user.isAdmin === 1) {
		return <Navigate to={"/"} />;
	}

	return <Outlet />;
};
