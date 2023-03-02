import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Footer from "../components/Footer";

/*
REGEX
*/

const omIdentifierPattern = "^[0-9]{11}$";
const passwordPattern = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,16}$";

/*
REGEX
*/

export default function SignIn() {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      omIdentifier: data.get("omIdentifier"),
      password: data.get("password"),
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="h5">
          Bejelentkezés
        </Typography>
        <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="omIdentifier"
            label="OM azonosító"
            name="omIdentifier"
            autoComplete="omIdentifier"
            autoFocus
            inputProps={{ inputMode: 'numeric', pattern: omIdentifierPattern}} 
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Jelszó"
            type="password"
            id="password"
            autoComplete="current-password"
            inputProps={{inputMode:'text', pattern: passwordPattern}}
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
