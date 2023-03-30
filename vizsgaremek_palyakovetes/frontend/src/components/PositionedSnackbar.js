import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

export default function PositionedSnackbar(props) {
  const autoHideDurationDefault = 1000;

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const navigate = useNavigate();

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
    setTimeout(() => navigate(props.navigateTo), props.navigateAfter);
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div>
      <Button
        variant={props.variant}
        color={props.color}
        onClick={handleClick({
          vertical: "bottom",
          horizontal: "center",
        })}
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
          {props.alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
