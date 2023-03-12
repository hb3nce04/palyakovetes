import { db } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


export const register = (req, res) => {
  const { om_azon, jelszo, admin } = req.body;
  db.query(
    "SELECT * FROM felhasznalo WHERE om_azon LIKE ?;",
    [om_azon],
    (err, rows) => {
      if (err) {
        return res.status(500).json("Error");
      }
      if (rows.length) {
        return res.status(409).json("User already exists!");
      }
      const salt = bcrypt.genSaltSync(12);
      const hash = bcrypt.hashSync(jelszo, salt);

      const values = [om_azon, hash, admin];
      db.query(
        "INSERT INTO felhasznalo (om_azon, jelszo, admin) VALUES (?);",
        [values],
        (err, data) => {
          if (err) return res.status(500).json(err);
          else return res.status(201).json("User has been created.");
        }
      );
    }
  );
};

export const login = (req, res) => {
  const { om_azon, jelszo } = req.body;
  db.query(
    "SELECT * FROM felhasznalo WHERE om_azon = ?;",
    [om_azon],
    (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Error" });
      }
      if (data.length === 0) {
        return res.status(404).json({ message: "User not found." });
      }

      const isCorrectPassword = bcrypt.compareSync(jelszo, data[0].jelszo);

      if (!isCorrectPassword) {
        console.log(isCorrectPassword);
        return res.status(400).json({ message: "Wrong username or password." });
      }

      const token = jwt.sign({ id: data[0].id }, "secret");

      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ isAdmin: data[0].admin });
    }
  );
};

export const logout = (req, res) =>{
    res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
}