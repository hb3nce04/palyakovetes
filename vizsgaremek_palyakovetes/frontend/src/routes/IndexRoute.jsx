import { Navigate } from "react-router-dom";

export const IndexRoute = ({ user }) => {
	return (
		<Navigate
			to={
				user === null || user === undefined
					? "/login"
					: user.isAdmin === 1
					? "/admin/users"
					: "/classes"
			}
		/>
	);
};
