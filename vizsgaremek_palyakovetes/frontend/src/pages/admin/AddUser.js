import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListSubheader,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { BackToPageButton } from "../../components/BackToPageButton";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import PositionedSnackbar from "../../components/PositionedSnackbar";

export const AddUser = () => {
  const [formData, setFormData] = useState({
    om_azon: "",
    jelszo: "",
    admin: 0,
  });
  const navigate = useNavigate();

  const [severity, setSeverity] = useState("");

  const handleAddUser = () => {
    console.log(formData);
    axios
      .post("http://localhost:8080/auth/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then(
        (res) => {
          if (res) {
            setSeverity("success");
            setTimeout(() => {
              navigate("/admin/users/edit");
            }, 250);
          }
        },
        (error) => {
          console.log(error);
          setSeverity("error");
        }
      );
  };

  return (
    <>
      <Nav />
      <Paper elevation={2} className="wrapper">
        <BackToPageButton
          style={{ marginBottom: "1rem" }}
          onClick={() => {
            navigate("/admin/users/edit");
          }}
        />
        <Typography
          variant="h4"
          color="primary"
          className="add-new-student-text"
          style={{ marginBottom: "1rem" }}
        >
          FELHASZNÁLÓ FELVÉTELE
        </Typography>

        <div className="add-user-form">
          <div className="form1">
            <TextField
              value={formData?.om_azon || ""}
              onChange={({ target: { name, value } }) => {
                setFormData({ ...formData, [name]: value });
              }}
              required
              fullWidth
              label="OM azonosító"
              name="om_azon"
              autoComplete="om_azon"
              autoFocus
              inputProps={{ inputMode: "", pattern: "0-9" }}
            />
            <TextField
              value={formData?.jelszo || ""}
              onChange={({ target: { name, value } }) => {
                setFormData({ ...formData, [name]: value });
              }}
              required
              fullWidth
              label="Jelszó"
              name="jelszo"
              autoFocus
              type="password"
              inputProps={{ inputMode: "", pattern: "" }}
            />
            <div>
              <Switch
                value={formData?.admin}
                checked={formData.admin === 1 ? true : false}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    admin: event.target.checked ? 1 : 0,
                  });
                }}
              />
              <Typography variant="h7">
                {formData.admin == 1 ? "Admin" : "Felhasználó"}
              </Typography>
            </div>
          </div>
        </div>
        <PositionedSnackbar
          buttonMessage={"FELHASZNÁLÓ FELVÉTELE"}
          severity={severity}
          onClick={handleAddUser}
          variant="contained"
        />
      </Paper>
      <Footer trademark versionNumber />
    </>
  );
};
