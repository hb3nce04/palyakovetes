import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Footer from "../components/Footer";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth/AuthContext";
import fingerprint from "../images/fingerprint.svg";

/*
REGEX
*/

const omIdentifierPattern = "^[0-9]{11}$";

/*
REGEX
*/

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleClick = async (event) => {
    event.preventDefault();
    if (formData?.om_azon.trim() !== "" || formData?.jelszo.trim() !== "") {
      try {
        login(formData).then(() => navigate("/classchooser"));
      } catch ({ response: { data } }) {
        alert(data.message);
        setFormData({ om_azon: formData.om_azon, jelszo: "" });
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar src={fingerprint} sx={{ mt: "40%", bgcolor: "white" }}></Avatar>

        <Typography component="h1" variant="h5">
          Bejelentkezés
        </Typography>
        <Box component="form" onSubmit={handleClick} sx={{ mt: 1 }}>
          <TextField
            value={formData?.om_azon || ""}
            onChange={({ target: { name, value } }) =>
              setFormData({ ...formData, [name]: value })
            }
            margin="normal"
            required
            fullWidth
            label="OM azonosító"
            name="om_azon"
            autoComplete="om_azon"
            autoFocus
            inputProps={{ inputMode: "numeric", pattern: omIdentifierPattern }}
          />
          <TextField
            value={formData?.jelszo || ""}
            onChange={({ target: { name, value } }) =>
              setFormData({ ...formData, [name]: value })
            }
            margin="normal"
            required
            fullWidth
            name="jelszo"
            label="Jelszó"
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Bejelentkezés
          </Button>
        </Box>
      </Box>

      <Footer trademark versionNumber privacyPolicy supportedBrowsers />
    </Container>
  );
}
