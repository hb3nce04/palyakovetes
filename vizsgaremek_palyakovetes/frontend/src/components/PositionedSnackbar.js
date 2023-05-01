import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

export default function PositionedSnackbar(props) {
  const autoHideDurationDefault = 100000;

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState, click) => () => {
    setState({ open: true, ...newState });
    click();
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div>
      <Button
        className={props.className}
        variant={props.variant}
        color={props.color}
        onClick={handleClick(
          {
            vertical: "bottom",
            horizontal: "center",
          },
          props.onClick
        )}
      >
        {props.buttonMessage}
      </Button>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
        autoHideDuration={
          props.autoHideDuration === undefined
            ? autoHideDurationDefault
            : props.autoHideDuration
        }
      >
        <Alert variant="filled" severity={props.severity}>
          {props.severity === "success" ? "Siker" : "Hiba történt"}
        </Alert>
      </Snackbar>
    </div>
  );
}
