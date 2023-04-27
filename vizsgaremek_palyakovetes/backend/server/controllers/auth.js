import { db } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {StatusCodes} from "http-status-codes";
import dotenv from 'dotenv';
dotenv.config();


export const register = (req, res) => {
  const { om_azon, jelszo, admin } = req.body;

  if(!om_azon || !jelszo || !admin){
    return res.status(StatusCodes.BAD_REQUEST).send("Missing parameters");
  } else {
    db.query(
      "SELECT * FROM felhasznalo WHERE om_azon LIKE ?;",
      [om_azon],
      (err, rows) => {
        if (err) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("Error");
        }
        if (rows.length) {
          return res.status(StatusCodes.NOT_ACCEPTABLE).json("User already exists!");
        }
        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(jelszo, salt);
  
        const values = [om_azon, hash, admin];
        db.query(
          "INSERT INTO felhasznalo (om_azon, jelszo, admin) VALUES (?);",
          [values],
          (err, data) => {
            if (err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
            else return res.status(StatusCodes.CREATED).json("User has been created.");
          }
        );
      }
    );
  }
};

export const login = (req, res) => {
  const { om_azon, jelszo } = req.body;
  db.query(
    "SELECT * FROM felhasznalo WHERE om_azon = ?;",
    [om_azon],
    (err, data) => {
      if (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error" });
      }
      if (data.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found." });
      }

      const isCorrectPassword = bcrypt.compareSync(jelszo, data[0].jelszo);

      if (!isCorrectPassword) {
        console.log(isCorrectPassword);
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Wrong username or password." });
        
      }

      const token = jwt.sign({ om_azon: data[0].om_azon, isAdmin: data[0].admin }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});

      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(StatusCodes.OK)
        .json({ isAdmin: data[0].admin,om_azon: data[0].om_azon });
    }
  );
};

export const logout = (req, res) =>{
    res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(StatusCodes.OK)
    .json("User has been logged out.");
}