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

export const UserPage = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const handleClick = async (event) => {
    event.preventDefault();
    if (
      formData?.newPasswordAgain.trim() !== "" ||
      formData?.newPassword.trim() !== ""
    ) {
      try {
        if (
          formData.newPassword === formData.newPasswordAgain &&
          formData.newPassword.length >= 8 &&
          formData.newPasswordAgain.length >= 8
        ) {
          axios
            .post("http://localhost:8080/users/updatePassword", {
              om_azon: currentUser.om_azon,
              jelszo: formData.newPassword,
            })
            .then((e) => {
              navigate("/login");
            });
        }
      } catch ({ response: { data } }) {
        alert(data.message);
        setFormData({ newPasswordAgain: "", newPassword: "" });
      }
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
            value={formData?.newPassword || ""}
            onChange={({ target: { name, value } }) =>
              setFormData({ ...formData, [name]: value })
            }
            margin="normal"
            required
            name="newPassword"
            label="Új jelszó"
            type="password"
            //autoComplete="current-password"
            //inputProps={{inputMode:'text', pattern: passwordPattern}}
          />
          <TextField
            value={formData?.newPasswordAgain || ""}
            onChange={({ target: { name, value } }) =>
              setFormData({ ...formData, [name]: value })
            }
            margin="normal"
            required
            name="newPasswordAgain"
            label="Új jelszó ismétlése"
            type="password"
            //autoComplete="current-password"
            //inputProps={{inputMode:'text', pattern: passwordPattern}}
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
