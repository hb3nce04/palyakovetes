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
app.get("/login", (req, res)=> {
    connection.query("SELECT * FROM user WHERE email = ?;", [email], (err, data) => {
        if (err) res.status(500).send(err);
        if(data.length === 0) res.status(204).send("User not found.");

        const isCorrectPassword = bcrypt.compareSync(req.body.password, data[0].password);
        
        if(!isCorrectPassword)
            res.status(400).send("Wrong username or password.");


        const token = jwt.sign({id: data[0].id}, "secret");

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json({isAdmin: data[0].admin});
    });
});
*/
app.listen(8080, () => {
  console.log("Listening to port 8080");
});
