import express from "express";
import mysql from "mysql";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: "palyakovetes",
});

connection.connect((err) => {
  if (err) console.log(err);
  console.log("Connected");
});

/*
app.post("/register", (req, res) => {
  const { om_azon, jelszo } = req.body;
  connection.query(
    "SELECT * FROM felhasznalo WHERE om_azon LIKE ?;",
    [om_azon],
    (err, rows) => {
      if (err) res.status(500).json("Error");
      if (rows.length) res.status(409).json("User already exists!");

      const salt = bcrypt.genSaltSync(12);
      const hash = bcrypt.hashSync(jelszo, salt);

      connection.query(
        "INSERT INTO felhasznalo (om_azon, jelszo) VALUES (?);",
        [[om_azon, hash]],
        (err, data) => {
          if (err) res.status(500).json(err);
          res.status(201).json("User has been created.");
        }
      );
    }
  );
});
*/
app.get("/login", (req, res)=> {
  const { om_azon, jelszo } = req.body;
    connection.query("SELECT * FROM felhasznalo WHERE om_azon = ?;", [om_azon], (err, data) => {
        if(data.length === 0){
          res.status(204).send("User not found.");
        }

        const isCorrectPassword = bcrypt.compareSync(jelszo, data[0].jelszo);
        
        if(!isCorrectPassword)
            res.status(400).json({message: "Wrong username or password."});


        const token = jwt.sign({id: data[0].id}, "secret");

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json({isAdmin: data[0].admin});
    });
});


app.listen(8080, () => {
  console.log("Listening to port 8080");
});
