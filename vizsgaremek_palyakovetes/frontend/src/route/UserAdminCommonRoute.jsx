import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const UserAdminCommonRoute = ({ user, redirectPath = "/login" }) => {
  if (user === null || user === undefined) {
    return <Navigate to={redirectPath} />;
  }

  return <Outlet />;
};
