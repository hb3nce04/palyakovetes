import {
  Autocomplete,
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

export const AddClass = () => {
  useEffect(() => {
    axios
      .get("http://localhost:8080/schools/getSchools", {
        withCredentials: true,
      })
      .then((e) => {
        setSchoolsData(e.data);
        console.log(e);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const { currentUser } = useContext(AuthContext);
  const [schoolsData, setSchoolsData] = useState([]);
  const year = new Date().getFullYear();
  const years = Array.from(new Array(50), (val, index) => String(year - index));

  const [formData, setFormData] = useState({
    om_azon: currentUser.om_azon,
    vegzesi_ev: null,
    iskolaid: null,
    nev: "",
  });
  const navigate = useNavigate();

  const [severity, setSeverity] = useState("");

  const handleAddClass = () => {
    console.log(formData);
    axios
      .post("http://localhost:8080/classes/create", formData, {
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
              navigate("/classchooser");
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
              value={formData?.nev}
              onChange={({ target: { name, value } }) => {
                console.log(formData);
                setFormData({ ...formData, [name]: value });
              }}
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
        <PositionedSnackbar
          buttonMessage={"OSZTÁLY FELVÉTELE"}
          severity={severity}
          onClick={handleAddClass}
          variant="contained"
        />
      </Paper>
      <Footer trademark versionNumber />
    </>
  );
};
