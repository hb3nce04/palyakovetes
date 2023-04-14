import { db } from "../db.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";

export const getUsers = (req, res) => {
  db.query("SELECT * FROM felhasznalo;", (err, data) => {
    if (!err) {
      return res.status(StatusCodes.OK).json(data);
    } else {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("error : " + err);
    }
  });
};

export const deleteUser = (req, res) => {
  const { om_azon } = req.body;
  if (!om_azon) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Missing OM ID");
  } else {
    db.query(
      "SELECT * FROM felhasznalo WHERE om_azon = ?",
      [om_azon],
      (err, data) => {
        if (err) {
          return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send("Error: " + err);
        }
        if (data.length === 0) {
          return res.status(StatusCodes.BAD_REQUEST).send("No such user");
        } else {
          db.query(
            "DELETE FROM felhasznalo WHERE om_azon = ?;",
            [om_azon],
            (err, data) => {
              if (err) {
                return res
                  .status(StatusCodes.INTERNAL_SERVER_ERROR)
                  .send("error : " + err);
              }
              return res.status(StatusCodes.OK).send("user has been deleted");
            }
          );
        }
      }
    );
  }
};

export const updatePassword = (req, res) => {
  const { om_azon, jelszo } = req.body;
  if (!om_azon || !jelszo) {
    return res.status(StatusCodes.BAD_REQUEST).send("Missing parameters");
  } else if (jelszo.length < 8) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("Password must be at least 8 characters long");
  } else {
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(jelszo, salt);
    db.query(
      "UPDATE felhasznalo SET jelszo = ? WHERE om_azon = ?;",
      [hash, om_azon],
      (err, data) => {
        if (err) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        } else {
          return res.status(StatusCodes.OK).send("Password has been modified");
        }
      }
    );
  }
};
