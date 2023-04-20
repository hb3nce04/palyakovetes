import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const UserRoute = ({ user, redirectPath = "/login" }) => {
  if (user == null || user.isAdmin == 0) {
    return <Outlet />;
  } else if (user.isAdmin === 1) {
    return <Outlet />;
  }
  return <Navigate to={redirectPath} />;
};
