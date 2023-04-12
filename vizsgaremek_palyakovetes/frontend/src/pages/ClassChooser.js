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
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { ClassContext } from "../context/auth/ClassContext";

const classId = createContext();

export const ClassChooser = () => {
  const { classData } = useContext(ClassContext);
  console.log(classData);
  const navigate = useNavigate();

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
          {classData.map((el, i) => {
            return (
              <Grid item xs={12} sm={6} md={3} key={el.id}>
                <Grow
                  in={true}
                  style={{ transformOrigin: "0 0 0" }}
                  timeout={1500}
                >
                  <Card sx={{ minWidth: 150 }}>
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
                    <CardActions>
                      <Button
                        onClick={() => {
                          localStorage.setItem("currentclassid", el.id);
                          navigate("/");
                        }}
                        sx={{ fontWeight: "bold" }}
                      >
                        Tovább
                      </Button>
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
