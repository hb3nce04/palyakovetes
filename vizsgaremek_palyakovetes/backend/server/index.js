import express from "express";
import cors from "cors";
import authRoute from './routes/auth.js';
import classRoute from "./routes/classRoute.js";
import userRoute from "./routes/user.js"
import studentRoute from "./routes/student.js";
import categoryRoute from "./routes/category.js"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { db } from "./db.js";
import dotenv from 'dotenv';

dotenv.config();


const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

app.use("/auth", authRoute);
app.use("/classes", classRoute);
app.use("/users", userRoute);
app.use("/students", studentRoute);
app.use("/categories", categoryRoute);

db.connect((err) => {
  if (err) console.log(err);
  console.log("Connected");
});

app.listen(process.env.PORT, () => {
  console.log("Listening to port " + process.env.PORT);
});
