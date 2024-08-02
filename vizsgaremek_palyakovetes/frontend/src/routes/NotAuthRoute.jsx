import { Navigate, Outlet } from "react-router-dom";

export const NotAuthRoute = ({ user }) => {
	if (user !== null && user !== undefined) {
		return <Navigate to={"/"} />;
	}

	return <Outlet />;
};
