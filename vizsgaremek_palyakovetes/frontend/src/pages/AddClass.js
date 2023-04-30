import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackToPageButton } from "../components/BackToPageButton";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import PositionedSnackbar from "../components/PositionedSnackbar";
import { AuthContext } from "../context/auth/AuthContext";

const classNameRegex = new RegExp(
  /^[\w!@#$%^&*()\-+=[\]{};':"\\|,.<>/?]{1,15}$/i
);

export const AddClass = () => {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:8080/schools/getSchools", {
        withCredentials: true,
      })
      .then((e) => {
        setSchoolsData(e.data);
        console.log(e);
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") navigate("/login");
        if (err.response.status === 401) logout();
      });
  }, []);

  const { currentUser } = useContext(AuthContext);
  const [schoolsData, setSchoolsData] = useState([]);
  const year = new Date().getFullYear();
  const years = Array.from(new Array(50), (val, index) => String(year - index));
  const [valid, setValid] = useState(false);

  const [formData, setFormData] = useState({
    om_azon: currentUser.om_azon,
    vegzesi_ev: null,
    iskolaid: null,
    nev: "",
  });
  const navigate = useNavigate();

  const handleAddClass = () => {
    if (valid)
      axios
        .post("http://localhost:8080/classes/create", formData, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((res) => {
          navigate("/classchooser");
        })
        .catch((err) => {
          if (err.code === "ERR_NETWORK") navigate("/login");
          if (err.response.status === 401) logout();
        });
  };

  return (
    <>
      <Nav />
      <Paper elevation={2} className="wrapper">
        <BackToPageButton
          style={{ marginBottom: "1rem" }}
          onClick={() => {
            navigate("/classchooser");
          }}
        />
        <Typography
          variant="h4"
          color="primary"
          className="add-new-student-text"
          style={{ marginBottom: "1rem" }}
        >
          OSZTÁLY FELVÉTELE
        </Typography>

        <div className="add-user-form">
          <div className="form1">
            <TextField
              error={!valid}
              helperText={
                formData.nev === ""
                  ? "Kérjük, írjon be egy osztály nevet!"
                  : " " && classNameRegex.test(formData.nev) === false
                  ? "A megadott osztály nem felel meg a formátumnak. [1-15 karakter]"
                  : " "
              }
              value={formData?.nev}
              onChange={({ target: { name, value } }) => {
                console.log(formData);
                setFormData({ ...formData, [name]: value });
                setValid(classNameRegex.test(value));
              }}
              inputProps={{ pattern: classNameRegex }}
              required
              fullWidth
              label="Osztály neve"
              name="nev"
              autoFocus
            />
            <FormControl>
              <InputLabel id="demo-simple-select-label">Végzési év</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Végzési év"
                value={formData?.vegzesi_ev}
                name="vegzesi_ev"
                onChange={({ target: { name, value } }) => {
                  setFormData({ ...formData, [name]: value });
                }}
              >
                {years.map((e) => {
                  return <MenuItem value={e}>{e}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="demo-simple-select-label2">Iskola</InputLabel>
              <Select
                labelId="demo-simple-select-label2"
                id="demo-simple-select2"
                label="Iskola"
                name="iskolaid"
                value={formData?.iskolaid}
                onChange={({ target: { name, value } }) => {
                  setFormData({ ...formData, [name]: value });
                }}
              >
                {schoolsData.map((e) => {
                  return <MenuItem value={e.id}>{e.nev}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </div>
        </div>
        <Button
          onClick={() => {
            if (valid) {
              handleAddClass();
            }
          }}
          variant="contained"
        >
          OSZTÁLY FELVÉTELE
        </Button>
      </Paper>
      <Footer trademark versionNumber />
    </>
  );
};
