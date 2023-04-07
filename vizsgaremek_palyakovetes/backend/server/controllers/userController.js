import { db } from "../db.js";
import { StatusCodes } from "http-status-codes";

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
