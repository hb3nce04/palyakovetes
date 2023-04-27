import { db } from "../db.js";
import { StatusCodes } from "http-status-codes";

export const getClasses = (req, res) => {
  const token = req.user;

  console.log(token.om_azon);
  if (!token.om_azon) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Missing OM ID");
  } else {
    db.query(
      "SELECT * FROM felhasznalo WHERE om_azon = ?",
      [token.om_azon],
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
            "SELECT osztaly.id, osztaly.nev AS osztaly_nev, iskola.nev AS iskola_nev, osztaly.vegzesi_ev FROM osztaly,iskola WHERE felhasznalo_om = ? AND osztaly.iskolaid = iskola.id",
            [token.om_azon],
            (err, data) => {
              if (err) {
                return res
                  .status(StatusCodes.INTERNAL_SERVER_ERROR)
                  .send("error : " + err);
              }
              return res.status(StatusCodes.OK).json(data);
            }
          );
        }
      }
    );
  }
};

export const createClass = (req, res) => {
  const token = req.user;
  const { iskolaid, nev, vegzesi_ev } = req.body;
  db.query(
    "SELECT * FROM osztaly WHERE iskolaid = ? AND nev = ? AND vegzesi_ev = ?",
    [iskolaid, nev, vegzesi_ev],
    (err, data) => {
      if (err) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send("Error: " + err);
      }
      if (data.length !== 0) {
        return res.status(StatusCodes.BAD_REQUEST).send("Class already exists");
      } else {
        db.query(
          "INSERT INTO osztaly (iskolaid, felhasznalo_om, nev, vegzesi_ev) VALUES (?,?,?,?)",
          [iskolaid, token.om_azon, nev, vegzesi_ev],
          (err, data) => {
            if (err) {
              return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send("Error: " + err);
            }
            return res.status(StatusCodes.OK).send("class has been created");
          }
        );
      }
    }
  );
};

export const deleteClass = (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(StatusCodes.BAD_REQUEST).send("Missing class ID");
  } else {
    db.query("DELETE FROM osztaly WHERE id = ?", [id], (err, data) => {
      if (err) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send("Error: " + err);
      }else{
        return res.status(StatusCodes.OK).send("class has been deleted.");
      }
    });
  }
};