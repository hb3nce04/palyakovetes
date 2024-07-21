import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { GenericError } from "../pages/error-pages/GenericError";

export const AdminRoute = ({ user, redirectPath = "/login" }) => {
  if (user === null || user === undefined) {
    return <Navigate to={redirectPath} />;
  }

  if (user.isAdmin === 0) {
    return <GenericError message={"Ehhez az oldalhoz nincs hozzáférésed."} />;
  }

  return <Outlet />;
};
