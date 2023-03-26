import { Button, Card, CardActions, CardContent, Grid, Grow, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Nav from "../components/Nav";


export const ClassChooser = () => {

  const om_azon = JSON.parse(localStorage.getItem("user")).om_azon;
  const [classData,setClassData] = useState([]);
  const [studentData,setStudentData] = useState([]);
  const navigate = useNavigate();

  const handleClick = (class_id) => {
    fetch(`http://localhost:8080/students/studentList`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({class_id})
    })
    .then(res => res.json())
    .then(res => setStudentData(res))
    .then(console.log(studentData))
    //.then(navigate('/home'));
  }

  useEffect(() => {
    fetch("http://localhost:8080/classes/class_chooser",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({om_azon})
    })
    .then(res => res.json())
    .then(res => setClassData(res));
  },[])

    return (
        <>
            <Nav/>
            <Paper style={{  padding:"3rem 6rem"}} elevation={2} >
            <Typography style={{marginBottom:"1rem"}} variant="h3" color="primary">Válasszon osztályt!</Typography>
            
                
                <Grid container spacing={2}>

            {
            classData.map((el, i) => {
                return (
                    <Grid item xs={12} sm={6} md={3} key={el.id}>
                      
           <Grow
          in={true}
          style={{ transformOrigin: '0 0 0' }}
          timeout={1500}
        >

<Card  sx={{ minWidth: 150 }}>
      <CardContent>
        <Typography variant="h5"  gutterBottom>
          Osztály: {el.osztaly_nev}
        </Typography>
        <Typography variant="h5" >
          Végzési év: {el.vegzesi_ev}
        </Typography>
        <Typography color="text.secondary">
          {el.iskola_nev}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => {return handleClick(el.id)}} sx={{ fontWeight: 'bold' }}>Tovább</Button>
      </CardActions>
    </Card>
    </Grow>
    </Grid>
    
    )
            }
            )

            }
            </Grid>
            
            </Paper>
            <Footer trademark versionNumber />
        </>
    );
  };