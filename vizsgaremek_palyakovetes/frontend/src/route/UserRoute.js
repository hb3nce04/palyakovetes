import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { GenericError } from "../pages/error-pages/GenericError";

export const UserRoute = ({ user, redirectPath = "/login" }) => {
  if (user == null || user.isAdmin === 1) {
    return <GenericError message={"Ehhez az oldalhoz nincs hozzáférésed."} />;
  }
  return <Outlet/>
};
