import {Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { useContext } from "react";

import Footer from "../components/Footer";
import Nav from "../components/Nav";
import PositionedSnackbar from "../components/PositionedSnackbar";
import { ClassContext } from "../context/auth/ClassContext";

export const AddNewStudent = () => {

  const {classData} = useContext(ClassContext);

  const currentClassData = () => {
    if(!classData.osztalyok) {
      return [];
    } 
    return classData.osztalyok.find(classes => classes.id == localStorage.getItem("currentclassid"))
    
  }

    return (
        <>
        
        <Nav/>
        <Paper style={{ padding:"3rem 6rem"}} elevation={2} >
            <Typography variant="h4" color="primary">ÚJ TANULÓ FELVÉTELE</Typography>
            <h2>{currentClassData().iskola_nev} : {currentClassData().osztaly_nev}</h2>
            <div style={{display:"flex"}}>
            <div className="formstest" style={{width:"35%" ,display: "grid"}}>
                <TextField defaultValue="" id="outlined-basic" label="OM azonosító" variant="outlined" />
                <TextField id="outlined-basic" label="Név" variant="outlined" />
                
                <FormControl>
                <InputLabel id="demo-simple-select-label">Szakma / Ágazat</InputLabel>
                <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Szakma / ágazat"
          
        >
          <MenuItem value={"Ágazat 1"}>Ágazat 1</MenuItem>
          <MenuItem value={"Ágazat 2"}>Ágazat 2</MenuItem>
          <MenuItem value={"Ágazat 3"}>Ágazat 3</MenuItem>
        </Select>
        </FormControl>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Nappali munkarend" />
                <PositionedSnackbar variant="contained" severity='success' buttonMessage='TANULÓ HOZZÁADÁSA' alertMessage='Pompás' navigateTo="/" navigateAfter={250}/>
                </div>
                <div className="formstest" style={{marginLeft:"2rem", width:"35%" ,display: "grid"}}>
                <FormControl>
                <InputLabel id="demo-simple-select-label">Pálya kategóriája</InputLabel>
                <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Pálya kategóriája"
          
        >
          <MenuItem value={"Kategória 1"}>Kategória 1</MenuItem>
          <MenuItem value={"Kategória 2"}>Kategória 2</MenuItem>
          <MenuItem value={"Kategória 3"}>Kategória 3</MenuItem>
        </Select>
        
        <TextField
          id="outlined-multiline-static"
          label="Pálya leírása"
          multiline
          rows={10}
          defaultValue=""
        />
        </FormControl>
        
                </div>
                </div>
            </Paper>
        <Footer trademark versionNumber />
        </>
    );
  };