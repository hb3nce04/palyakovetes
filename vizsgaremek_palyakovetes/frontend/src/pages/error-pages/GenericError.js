import { Container, CssBaseline } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const GenericError = ({ message }) => {
  return (
    <div className="genericNotFound">
      <CssBaseline />
      <h2>{message}</h2>
      <Link to="/" className="backToHomePageButton">
        <span>Vissza a főoldalra.</span>
      </Link>
    </div>
  );
};
