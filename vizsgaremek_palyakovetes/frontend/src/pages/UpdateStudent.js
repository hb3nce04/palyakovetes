import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListSubheader,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import PositionedSnackbar from "../components/PositionedSnackbar";
import { ClassContext } from "../context/auth/ClassContext";
import { useNavigate } from "react-router-dom";
import { StudentRowContext } from "../context/auth/StudentsRowContext";
import { resolveTo } from "@remix-run/router";

export const UpdateStudent = () => {
  const { classData } = useContext(ClassContext);
  const { studentRow, handleSet: handleStudentRow } = useContext(
    StudentRowContext
  );

  const [formData, setFormData] = useState({
    tanuloNev: "",
    nappali_munkarend: null,
    osztalyid: Number(localStorage.getItem("currentclassid")),
    szakid: null,
    agazatid: null,
    kategoriaid: null,
    leiras: "",
  });
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [sectors, setSectors] = useState([]);

  const [severity, setSeverity] = useState("");

  const handleUpdateStudent = () => {
    console.log(formData);
    axios
      .post("http://localhost:8080/students/editStudent", formData, {
        withCredentials: true,
      })
      .then(
        (res) => {
          if (res) {
            setSeverity("success");
            setTimeout(() => {
              navigate("/");
            }, 250);
          }
        },
        (error) => {
          setSeverity("error");
        }
      );
  };

  const currentClassData = () => {
    console.log(classData);
    if (!classData) {
      return [];
    }
    return (
      classData.find(
        (classes) => classes.id == localStorage.getItem("currentclassid")
      ) || []
    );
  };

  useEffect(() => {
    new Promise((res, rej) => {
      res(studentRow);
    }).then((e) => {
      axios
        .post(
          "http://localhost:8080/students/getStudent",
          { om_azon: e },
          {
            withCredentials: true,
          }
        )
        .then((e) => {
          console.log(e.data);
          setFormData({
            om_azon: e.data.om_azon || "",
            tanuloNev: e.data.nev || "",
            nappali_munkarend: e.data.nappali_munkarend,
            szakid: e.data.szakid || null,
            agazatid: e.data.agazatid || null,
            leiras: e.data.leiras || "",
            kategoriaid: e.data.kategoriaid || null,
          });
        });
    });

    axios
      .get("http://localhost:8080/categories/getCategories",{withCredentials:true})
      .then((e) => setCategories(e.data));
    axios
      .get("http://localhost:8080/categories/getProfessions",{withCredentials:true})
      .then((e) => {
        const updatedArray = e.data.map((obj) => {
          const updatedObj = { ...obj };

          if (typeof obj.szakmaid === "number") {
            console.log(updatedObj);
            updatedObj.szakmaid = obj.szakmaid + "p";
          }
          return updatedObj;
        });
        console.log(updatedArray);
        return updatedArray;
      })
      .then((e) => {
        setProfessions(e);
      });

    axios
      .get("http://localhost:8080/categories/getSectors",{withCredentials:true})
      .then((e) => {
        const updatedArray = e.data.map((obj) => {
          const updatedObj = { ...obj };
          if (typeof obj.agazatid === "number") {
            updatedObj.agazatid = obj.agazatid + "s";
          }
          return updatedObj;
        });
        console.log(updatedArray);
        return updatedArray;
      })
      .then((e) => {
        setSectors(e);
      });
  }, []);

  return (
    <>
      <Nav />
      <Paper elevation={2} className="wrapper">
        <Typography
          variant="h4"
          color="primary"
          className="add-new-student-text"
        >
          TANULÓ MÓDOSÍTÁSA
        </Typography>
        <h2 className="school-class-text">
          {currentClassData().iskola_nev || ""} :{" "}
          {currentClassData().osztaly_nev || ""}
        </h2>

        <div className="formMain">
          <div className="form1">
            <TextField
              value={formData?.om_azon || ""}
              disabled
              required
              fullWidth
              label="OM azonosító"
              name="om_azon"
              autoComplete="om_azon"
              autoFocus
              inputProps={{ inputMode: "", pattern: "" }}
            />
            <TextField
              value={formData?.tanuloNev || ""}
              onChange={({ target: { name, value } }) => {
                setFormData({ ...formData, [name]: value });
              }}
              required
              fullWidth
              label="Tanuló neve"
              name="tanuloNev"
              autoComplete="tanuloNev"
              autoFocus
              inputProps={{ inputMode: "", pattern: "" }}
            />

            <FormControl required>
              <InputLabel htmlFor="grouped-select">Szakma / Ágazat</InputLabel>

              <Select
                defaultValue=""
                name=""
                id="grouped-select"
                label="Szakma / Ágazat"
                value={
                  (formData.agazatid ? formData.agazatid + "s" : "") ||
                  (formData.szakid ? formData.szakid + "p" : "")
                }
                onChange={(event) => {
                  if (event.target.value.includes("p")) {
                    setFormData({
                      ...formData,
                      szakid: Number(event.target.value.replace("p", "")),
                      agazatid: null,
                    });
                    event.target.name = "szakid";
                  }
                  if (event.target.value.includes("s")) {
                    setFormData({
                      ...formData,
                      agazatid: Number(event.target.value.replace("s", "")),
                      szakid: null,
                    });
                    event.target.name = "agazatid";
                  }
                }}
              >
                <ListSubheader>Szakma</ListSubheader>

                {professions.map((e) => {
                  return (
                    <MenuItem value={e.szakmaid} key={e.szakmaid}>
                      {e.nev + " - " + e.szam}
                    </MenuItem>
                  );
                }) || []}
                <ListSubheader>Ágazat</ListSubheader>
                {sectors.map((e) => {
                  return (
                    <MenuItem value={e.agazatid} key={e.agazatid}>
                      {e.nev + " - " + e.szam}
                    </MenuItem>
                  );
                }) || []}
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  value={formData?.nappali_munkarend}
                  checked={formData.nappali_munkarend === 1 ? true : false}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      nappali_munkarend: event.target.checked ? 1 : 0,
                    });
                  }}
                />
              }
              label="Nappali munkarend"
            />
            <PositionedSnackbar
              className="add-new-student-button"
              onClick={(event) => {
                handleUpdateStudent();
              }}
              severity={severity}
              variant="contained"
              buttonMessage="TANULÓ MÓDOSÍTÁSA"
            />
          </div>
          <div className="form2">
            <FormControl required>
              <InputLabel id="demo-simple-select-label">
                Pálya kategóriája
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Pálya kategóriája"
                value={formData?.kategoriaid || ""}
                onChange={({ target: { name, value } }) => {
                  setFormData({ ...formData, [name]: value });
                }}
                fullWidth
                name="kategoriaid"
                autoFocus
                inputProps={{ inputMode: "", pattern: "" }}
              >
                {categories.map((e) => {
                  return <MenuItem value={e.id}>{e.megnevezes}</MenuItem>;
                }) || []}
              </Select>

              <TextField
                id="outlined-multiline-static"
                label="Pálya leírása"
                multiline
                rows={10}
                defaultValue=""
                value={formData?.leiras || ""}
                onChange={({ target: { name, value } }) => {
                  setFormData({ ...formData, [name]: value });
                }}
                margin="normal"
                required
                fullWidth
                name="leiras"
                autoFocus
                inputProps={{ inputMode: "", pattern: "" }}
              />
            </FormControl>
          </div>
        </div>
      </Paper>
      <Footer trademark versionNumber />
    </>
  );
};
