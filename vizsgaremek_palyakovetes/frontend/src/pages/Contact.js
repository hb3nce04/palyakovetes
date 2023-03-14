import { Button, Paper, TextField, Typography } from "@mui/material";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

export const Contact = () => {

return (
<>
        
<Nav/>
<Paper style={{ padding:"3rem 6rem"}} elevation={2} >
    <Typography style={{marginBottom:"3rem"}} variant="h4" color="primary">KAPCSOLAT</Typography>
    <div style={{display:"flex"}}>
    <div className="formstest" style={{width:"35%" ,display: "grid"}}>
        <TextField defaultValue="" id="outlined-basic" label="Email cím" variant="outlined" />
        <TextField id="outlined-basic" label="Üzenet tárgya" variant="outlined" />
        
<TextField
  id="outlined-multiline-static"
  label="Üzenet"
  multiline
  rows={10}
  defaultValue=""
/>
        </div>
        </div>
        <Button variant="contained">ÜZENET KÜLDÉSE</Button>
    </Paper>
<Footer trademark versionNumber />
</>
)
}