import React, { useContext, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import lightprofile from "../images/lightprofile.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth/AuthContext";
import { BackToPageButton } from "../components/BackToPageButton";

const passwordPattern = new RegExp(
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,24}$"
);

export const UserPage = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const { currentUser, logout } = useContext(AuthContext);

  const [newValidPassword, setNewValidPassword] = useState(false);
  const [newValidPasswordAgain, setNewValidPasswordAgain] = useState(false);

  const handleClick = async (event) => {
    event.preventDefault();
    if (
      formData?.newPasswordAgain.trim() !== "" ||
      formData?.newPassword.trim() !== ""
    ) {
      axios
        .post(
          "http://localhost:8080/users/updatePassword",
          {
            om_azon: currentUser.om_azon,
            regiJelszo: formData.oldPassword,
            ujJelszo: formData.newPassword,
          },
          { withCredentials: true }
        )
        .then((e) => {
          console.log(e);
          navigate("/login");
        })
        .catch((err) => {
          if (err.code === "ERR_NETWORK") navigate("/login");
          if (err.response.status === 401) logout();
        });
    }
  };

  return (
    <>
      <Nav />
      <Paper elevation={2}>
        <Box
          component="form"
          onSubmit={handleClick}
          sx={{
            marginLeft: "4rem",
            padding: "3rem",
            width: "30rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <BackToPageButton
            style={{ width: "30%", marginBottom: "1rem" }}
            onClick={() => {
              currentUser.isAdmin === 1
                ? navigate("/admin/users/edit")
                : navigate("/");
            }}
          />
          <Typography variant="h4" color="primary">
            Felhasználói profil
          </Typography>

          <img
            src={lightprofile}
            style={{
              width: "150px",
              height: "150px",
              margin: "2.5rem 0",
            }}
          />
          <Typography
            variant="h5"
            color="primary"
            style={{ marginBottom: "2.5rem" }}
          >
            OM azonosító: {currentUser.om_azon}
          </Typography>
          <CssBaseline />
          <TextField
            value={formData?.oldPassword || ""}
            onChange={({ target: { name, value } }) =>
              setFormData({ ...formData, [name]: value })
            }
            margin="normal"
            required
            label="Régi jelszó"
            type="password"
            name="oldPassword"
            //autoComplete="current-password"
            //inputProps={{inputMode:'text', pattern: passwordPattern}}
          />
          <TextField
            error={!newValidPassword}
            helperText={
              formData.newPassword === ""
                ? "Kérjük, írja be felvenni kívánt felhasználó jelszavát!"
                : " " && passwordPattern.test(formData.newPassword) === false
                ? "Az új jelszó nem felel meg a formátumnak. [(8-24 hosszú), 1 nagy betű, 1 kis betű, 1 szám, 1 speciális karakter(#?!@$%^&*-)]"
                : " "
            }
            value={formData?.newPassword || ""}
            onChange={({ target: { name, value } }) => {
              setFormData({ ...formData, [name]: value });
              setNewValidPassword(passwordPattern.test(value));
            }}
            margin="normal"
            required
            name="newPassword"
            label="Új jelszó"
            type="password"
          />
          <TextField
            error={formData.newPassword !== formData.newPasswordAgain}
            helperText={
              formData.newPasswordAgain === ""
                ? "Kérjük, írja be felvenni kívánt felhasználó jelszavát mégegyszer!"
                : " " && formData.newPassword === formData.newPasswordAgain
                ? " "
                : "A két jelszó nem egyezik."
            }
            value={formData?.newPasswordAgain || ""}
            onChange={({ target: { name, value } }) => {
              setFormData({ ...formData, [name]: value });
              setNewValidPasswordAgain(passwordPattern.test(value));
            }}
            margin="normal"
            required
            name="newPasswordAgain"
            label="Új jelszó mégegyszer"
            type="password"
          />
          {/*
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Emlékezzen rám"
            />
            */}
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Jelszó módosítása
          </Button>
        </Box>
      </Paper>
      <Footer />
    </>
  );
};
