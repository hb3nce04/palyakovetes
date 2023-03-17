import express from "express";
import cors from "cors";
import auth from './routes/auth.js';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { db } from "./db.js";


const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

app.use("/auth", auth);

db.connect((err) => {
  if (err) console.log(err);
  console.log("Connected");
});

app.listen(8080, () => {
  console.log("Listening to port 8080");
});
