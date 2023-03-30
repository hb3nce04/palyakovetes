import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import Papa from "papaparse";

export const GridToolbarImportButton = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = (event) => {
    console.log(event.target.files[0]);
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        console.log(results.data);
      },
    });
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <i className="fa-solid fa-file-import" style={{ marginRight: 8 }}></i>
        IMPORTÁLÁS
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem>
          <label htmlFor="file-upload" className="importAsCSVLabel">
            CSV fájlként
          </label>
        </MenuItem>
        <input
          type="file"
          accept=".csv"
          onChange={handleChange}
          id="file-upload"
        />
      </Menu>
    </div>
  );
};
