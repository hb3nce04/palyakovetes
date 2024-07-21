import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { GenericError } from "../pages/error-pages/GenericError";

export const UserRoute = ({ user, redirectPath = "/login" }) => {
  if (user === null || user === undefined) {
    return <Navigate to={redirectPath} />;
  }

  if (user.isAdmin === 1) {
    return <Navigate to={"/admin/users/edit"} />;
  }

  return <Outlet />;
};
