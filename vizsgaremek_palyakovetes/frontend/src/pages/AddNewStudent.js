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
import { BackToPageButton } from "../components/BackToPageButton";
import { AuthContext } from "../context/auth/AuthContext";
const studentNameRegex = new RegExp("([A-Za-z]+(['|-|s]?[A-Za-z]+)*)+");
const omIdentifierPattern = new RegExp("^[0-9]{11}$");

export const AddNewStudent = () => {
  const { logout } = useContext(AuthContext);
  const { classData } = useContext(ClassContext);
  const [formData, setFormData] = useState({
    leiras: " ",
    om_azon: "",
    tanuloNev: "",
    nappali_munkarend: 1,
    osztalyid: Number(localStorage.getItem("currentclassid")),
    szakid: null,
    agazatid: null,
  });
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [valid, setValid] = useState(false);
  const [validOM, setValidOM] = useState(false);

  const handleAddStudent = (formData) => {
    axios
      .post("http://localhost:8080/students/addStudent", formData, {
        withCredentials: true,
      })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") navigate("/login");
        if (err.response.status === 401) logout();
      });
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
    axios
      .get("http://localhost:8080/categories/getCategories", {
        withCredentials: true,
      })
      .then((e) => setCategories(e.data))
      .catch((err) => {
        if (err.code === "ERR_NETWORK") navigate("/login");
        if (err.response.status === 401) logout();
      });
    axios
      .get("http://localhost:8080/categories/getProfessions", {
        withCredentials: true,
      })
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
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") navigate("/login");
        if (err.response.status === 401) logout();
      });

    axios
      .get("http://localhost:8080/categories/getSectors", {
        withCredentials: true,
      })
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
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") navigate("/login");
        if (err.response.status === 401) logout();
      });
  }, []);

  return (
    <>
      <Nav />
      <Paper elevation={2} className="wrapper">
        <BackToPageButton
          style={{ marginBottom: "1rem" }}
          onClick={() => {
            navigate("/");
          }}
        />
        <Typography
          variant="h4"
          color="primary"
          className="add-new-student-text"
        >
          ÚJ TANULÓ FELVÉTELE
        </Typography>
        <h2 className="school-class-text">
          {currentClassData().iskola_nev || ""} :{" "}
          {currentClassData().osztaly_nev || ""}
        </h2>

        <div className="formMain">
          <div className="form1">
            <TextField
              error={!validOM}
              helperText={
                formData.om_azon === ""
                  ? "Kérjük, írjon be egy létező OM azonosítót!"
                  : " " && omIdentifierPattern.test(formData.om_azon) === false
                  ? "A megadott OM azonosító nem felel meg a formátumnak. [11 hosszú, csak számok]"
                  : " "
              }
              value={formData?.om_azon || ""}
              onChange={({ target: { name, value } }) => {
                setFormData({ ...formData, [name]: value });
                console.log(formData);
                setValidOM(omIdentifierPattern.test(value));
              }}
              required
              fullWidth
              label="OM azonosító"
              name="om_azon"
              autoComplete="om_azon"
              autoFocus
              inputProps={{ pattern: omIdentifierPattern }}
            />
            <TextField
              helperText={
                formData.tanuloNev.trim() === ""
                  ? "Kérjük, írja be egy tanuló nevét!"
                  : " " && studentNameRegex.test(formData.tanuloNev) === false
                  ? "A megadott név nem felel meg a formátumnak."
                  : " "
              }
              error={!valid}
              value={formData?.tanuloNev || ""}
              onChange={({ target: { name, value } }) => {
                setFormData({ ...formData, [name]: value });
                setValid(studentNameRegex.test(value));
              }}
              required
              fullWidth
              label="Tanuló neve"
              name="tanuloNev"
              autoComplete="tanuloNev"
              autoFocus
              inputProps={{
                pattern: studentNameRegex,
              }}
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
                  console.log(formData.szakmaid + "  " + formData.agazatid);
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
                  defaultChecked
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      nappali_munkarend: event.target.checked ? 1 : 0,
                    });
                    console.log(event.target.checked);
                    console.log(formData.nappali_munkarend);
                  }}
                />
              }
              label="Nappali munkarend"
            />
            <Button
              style={{
                width: "50%",
                margin: "0 auto",
                height: "80%",
              }}
              onClick={(event) => {
                if (valid || validOM) handleAddStudent(formData);
              }}
              variant="contained"
            >
              TANULÓ HOZZÁADÁSA
            </Button>
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
                helperText={
                  "A pálya leírása maximum 255 karakter hosszú lehet."
                }
                multiline
                rows={10}
                defaultValue=" "
                value={formData?.leiras || ""}
                onChange={({ target: { name, value } }) => {
                  setFormData({ ...formData, [name]: value });
                }}
                margin="normal"
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
