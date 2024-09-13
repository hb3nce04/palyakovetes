import { Outlet } from "react-router-dom";
import { Error } from "../pages/Error";

export const AdminRoute = ({ user }) => {
	if (user.isAdmin === 0) {
		return <Error message={"Ehhez az oldalhoz nincs hozzáférésed."} />;
	}
	return <Outlet />;
};
