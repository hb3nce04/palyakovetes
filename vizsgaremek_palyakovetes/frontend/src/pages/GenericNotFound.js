import { Container, CssBaseline } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const GenericNotFound = () => {
  return (
    <div className="genericNotFound">
      <CssBaseline />
      <img src="https://www.ganeshtourandtravels.com/images/404.gif"></img>
      <h2>A keresett oldal nem található.</h2>
      <Link to="/" className="backToHomePageButton">
        <span>Vissza a főoldalra.</span>
      </Link>
    </div>
  );
};
