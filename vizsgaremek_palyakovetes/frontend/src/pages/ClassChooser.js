import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Grow,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { ClassContext } from "../context/auth/ClassContext";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AlertDialog from "../components/AlertDialog";
import { AuthContext } from "../context/auth/AuthContext";

const classId = createContext();

export const ClassChooser = () => {
  const { classData, handleSet: handleClasses } = useContext(ClassContext);
  console.log(classData);
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/classes/class_chooser", {
        withCredentials: true,
      })
      .then((res) => {
        handleClasses(res.data);
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") navigate("/login");
        if (err.response.status === 401) logout();
      });
  }, []);

  return (
    <>
      <Nav />
      <Paper style={{ padding: "3rem 6rem" }} elevation={2}>
        <Typography
          style={{ marginBottom: "1rem" }}
          variant="h3"
          color="primary"
        >
          Válasszon osztályt!
        </Typography>

        <Grid container spacing={2}>
          {[0, ...classData].map((el, i) => {
            console.log(i);
            return el === 0 ? (
              <Grid item xs={12} sm={6} md={3} key={el.id}>
                <Card sx={{ minWidth: 150, height: "100%" }}>
                  <CardActions sx={{ height: "100%" }}>
                    <Button
                      color="success"
                      style={{
                        width: "100%",
                        height: "100%",
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                      }}
                      onClick={() => {
                        navigate("/addclass");
                      }}
                    >
                      + OSZTÁLY HOZZÁADÁSA
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ) : (
              <Grid item xs={12} sm={6} md={3} key={el.id}>
                <Grow
                  in={true}
                  style={{ transformOrigin: "0 0 0" }}
                  timeout={1500}
                >
                  <Card sx={{ minWidth: 150, height: "100%" }}>
                    <CardContent>
                      <Typography variant="h5" gutterBottom>
                        Osztály: {el.osztaly_nev}
                      </Typography>
                      <Typography variant="h5">
                        Végzési év: {el.vegzesi_ev}
                      </Typography>
                      <Typography color="text.secondary">
                        {el.iskola_nev}
                      </Typography>
                    </CardContent>
                    <CardActions
                      style={{ justifyContent: "space-between", width: "100%" }}
                    >
                      <Button
                        onClick={() => {
                          localStorage.setItem("currentclassid", el.id);
                          navigate("/");
                        }}
                        sx={{ fontWeight: "bold" }}
                      >
                        Tovább
                      </Button>
                      <AlertDialog
                        alertButton={
                          <Button color="error">
                            <DeleteForeverIcon
                              variant="contained"
                              color="error"
                            />
                            {"Törlés"}
                          </Button>
                        }
                        dialogTitle="Biztosan szeretné törölni ezt az osztályt?"
                        dialogContent={
                          <table>
                            <thead>
                              <tr>
                                <th>Osztály</th>
                                <th>Végzési év</th>
                                <th>Iskola</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{el.osztaly_nev}</td>
                                <td>{el.vegzesi_ev}</td>
                                <td>{el.iskola_nev}</td>
                              </tr>
                            </tbody>
                          </table>
                        }
                        onAgreeButtonMessage={"Igen"}
                        onDisagreeButtonColor={"primary"}
                        onAgreeButtonColor={"error"}
                        onDisagreeButtonMessage={"Nem"}
                        onAgreeEvent={(e) => {
                          e.stopPropagation();

                          axios
                            .post(
                              "http://localhost:8080/classes/delete",
                              { id: el.id },
                              {
                                withCredentials: true,
                              }
                            )
                            .then(() => {
                              axios
                                .get(
                                  "http://localhost:8080/classes/class_chooser",
                                  {
                                    withCredentials: true,
                                  }
                                )
                                .then((res) => {
                                  handleClasses(res.data);
                                });
                            })

                            .catch((err) => {
                              if (err.code === "ERR_NETWORK")
                                navigate("/login");
                              if (err.response.status === 401) logout();
                            });
                        }}
                      />
                    </CardActions>
                  </Card>
                </Grow>
              </Grid>
            );
          }) || []}
        </Grid>
      </Paper>
      <Footer trademark versionNumber />
    </>
  );
};
