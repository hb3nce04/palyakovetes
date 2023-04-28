import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (event) => {
    event.stopPropagation();
    setOpen(true);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleClickOpen}>{props.alertButton}</div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.dialogTitle}</DialogTitle>

        {props.dialogContent}

        <DialogActions>
          {props.disableAgreeButton ? (
            <></>
          ) : (
            <Button
              variant="contained"
              color="error"
              onClick={props.onAgreeEvent}
              autoFocus
            >
              {props.onAgreeButtonMessage}
            </Button>
          )}
          {props.disableDisagreeButton ? (
            <></>
          ) : (
            <Button color="primary" variant="contained" onClick={handleClose}>
              {props.onDisagreeButtonMessage}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
