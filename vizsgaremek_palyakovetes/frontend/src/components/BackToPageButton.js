import { Button } from "@mui/material";
import React from "react";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
export const BackToPageButton = (props) => {
  return (
    <Button style={props.style} onClick={props.onClick} variant="contained">
      <KeyboardReturnIcon />
      Vissza
    </Button>
  );
};
