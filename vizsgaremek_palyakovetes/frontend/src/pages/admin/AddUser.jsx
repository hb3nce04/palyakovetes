import { Button, Paper, Switch, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import { BackToPageButton } from "../../components/BackToPageButton";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import { AuthContext } from "../../context/auth/AuthContext";
import { omIdentifierPattern, passwordPattern } from "../../utils/utils";

export const AddUser = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [validOM, setValidOM] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [formData, setFormData] = useState({
    om_azon: "",
    jelszo: "",
    admin: 0,
  });

  const handleAddUser = () => {
    axios
      .post("http://localhost:8080/auth/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        navigate("/admin/users/edit");
      })
      .catch((err) => {
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
              error={!validOM}
              helperText={
                formData.om_azon === ""
                  ? "Kérjük, írja be felvenni kívánt felhasználó OM azonosítóját!"
                  : " " && omIdentifierPattern.test(formData.om_azon) === false
                  ? "A megadott OM azonosító nem felel meg a formátumnak. [11 hosszú, csak számok]"
                  : " "
              }
              value={formData?.om_azon || ""}
              onChange={({ target: { name, value } }) => {
                setFormData({ ...formData, [name]: value });
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
              error={!validPassword}
              helperText={
                formData.jelszo === ""
                  ? "Kérjük, írja be felvenni kívánt felhasználó jelszavát!"
                  : " " && passwordPattern.test(formData.jelszo) === false
                  ? "A megadott jelszó nem felel meg a formátumnak. [(8-24 hosszú), 1 nagy betű, 1 kis betű, 1 szám, 1 speciális karakter(#?!@$%^&*-_)]"
                  : " "
              }
              value={formData?.jelszo || ""}
              onChange={({ target: { name, value } }) => {
                setFormData({ ...formData, [name]: value });
                setValidPassword(passwordPattern.test(value));
              }}
              required
              fullWidth
              label="Jelszó"
              name="jelszo"
              autoFocus
              type="password"
              inputProps={{ pattern: passwordPattern }}
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
        <Button
          onClick={() => {
            if (validOM && validPassword) handleAddUser();
          }}
          variant="contained"
        >
          FELHASZNÁLÓ FELVÉTELE
        </Button>
      </Paper>
      <Footer trademark versionNumber />
    </>
  );
};
