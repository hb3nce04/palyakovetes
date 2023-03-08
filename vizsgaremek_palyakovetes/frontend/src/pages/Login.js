import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Footer from "../components/Footer";
import axios from "axios";
import { useState } from "react";
import {useNavigate} from "react-router-dom";



/*
REGEX
*/

const omIdentifierPattern = "^[0-9]{11}$";
//const passwordPattern = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,16}$";

/*
REGEX
*/

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleClick = async (event) => {
    event.preventDefault();
    if(formData?.om_azon.trim() !== "" || formData?.jelszo.trim() !==""){
         try {
          const res = await axios.post("http://localhost:8080/login", formData, {
            headers: {
                'Content-Type':'application/json'
            },
            withCredentials: true
        });
        
        navigate("/");
        
      } catch({response: {data}}) {
        alert(data.message);
        setFormData({om_azon : formData.om_azon, jelszo : ""});
      }
  }
}

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
        <Avatar sx={{ mt: "40%", bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="h5">
          Bejelentkezés
        </Typography>
        <Box component="form" onSubmit={handleClick}  sx={{ mt: 1 }}>
          <TextField
            value={formData?.om_azon || ""}
            onChange={({target: {name, value}})=>setFormData({...formData, [name]: value})}
            margin="normal"
            required
            fullWidth
            label="OM azonosító"
            name="om_azon"
            autoComplete="om_azon"
            autoFocus
            inputProps={{ inputMode: 'numeric', pattern: omIdentifierPattern}} 
          />
          <TextField
          value={formData?.jelszo || ""}
            onChange={({target: {name, value}})=>setFormData({...formData, [name]: value})}
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
