import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const UserRoute = ({ user, redirectPath = "/login" }) => {
  if (!user || user.isAdmin !== 0) {
    return <Navigate to={redirectPath} />;
  }
  return <Outlet />;
};
