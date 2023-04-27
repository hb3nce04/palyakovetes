import { db } from "../db.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";

export const getUsers = (req, res) => {
  const token = req.user;
  console.log(token);
  if (token.isAdmin === 0) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized access");
  } else {
    db.query("SELECT * FROM felhasznalo WHERE om_azon <> ?;", [token.om_azon], (err, data) => {
      if (!err) {
        return res.status(StatusCodes.OK).json(data);
      } else {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send("error : " + err);
      }
    });
  }
};

export const deleteUser = (req, res) => {
  const token = req.user;
  const { om_azon } = req.body;
  if (token.isAdmin === 0) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized access");
  } else {
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
            return res.status(StatusCodes.BAD_REQUEST).send("No such user...");
          } else {
            db.query(
              "DELETE FROM felhasznalo WHERE om_azon = ?;",
              [om_azon],
              (err) => {
                if (err) {
                  return res
                    .status(StatusCodes.INTERNAL_SERVER_ERROR)
                    .send("error : " + err);
                }
                return res.status(StatusCodes.OK).send("User has been deleted...");
              }
            );
          }
        }
      );
    }
  }
};

export const updatePassword = (req, res) => {
  const { regiJelszo, ujJelszo } = req.body;
  const token = req.user;
  const salt = bcrypt.genSaltSync(12);
  if (!ujJelszo || !regiJelszo) {
    return res.status(StatusCodes.BAD_REQUEST).send("Missing parameters");
  } else if (ujJelszo.length < 8) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("Password must be at least 8 characters long");
  } else {
    db.query(
      "SELECT * FROM felhasznalo WHERE om_azon = ?;",
      [token.om_azon],
      (err, data) => {
        if (err) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        } else {
          const isCorrectPassword = bcrypt.compareSync(regiJelszo, data[0].jelszo);
          if (isCorrectPassword) {           
            const hash = bcrypt.hashSync(ujJelszo, salt);
            db.query(
              "UPDATE felhasznalo SET jelszo = ? WHERE om_azon = ?;",
              [hash, token.om_azon],
              (err) => {
                if (err) {
                  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
                } else {
                  return res.status(StatusCodes.OK).send("Password has been modified");
                }
              }
            );
          }else{
            return res.status(StatusCodes.UNAUTHORIZED).send("Wrong password");
          }
        }
      }
    );
  }
};

