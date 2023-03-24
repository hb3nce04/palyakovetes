import express from "express";
import cors from "cors";
import auth from './routes/auth.js';
import classRoute from "./routes/classRoute.js";
import getUsers from "./routes/userList.js"
import getStudents from "./routes/studentList.js"
import getStudent from "./routes/student.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { db } from "./db.js";
import dotenv from 'dotenv';

dotenv.config();


const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

app.use("/auth", auth);
app.use("/classes", classRoute);
app.use("/users", getUsers);
app.use("/students", getStudents);
app.use("/student", getStudent)

db.connect((err) => {
  if (err) console.log(err);
  console.log("Connected");
});

app.listen(process.env.PORT, () => {
  console.log("Listening to port " + process.env.PORT);
});
