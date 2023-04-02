import { db } from "../db.js";
import { StatusCodes } from "http-status-codes";

export const getClasses = (req, res) => {
  console.log(req.body);
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
            "SELECT osztaly.id, osztaly.nev AS osztaly_nev, iskola.nev AS iskola_nev, osztaly.vegzesi_ev FROM osztaly,iskola WHERE felhasznalo_om = ? AND osztaly.iskolaid = iskola.id",
            [om_azon],
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
  const { iskolaid, felhasznalo_om, nev, vegzesi_ev } = req.body;
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
          [iskolaid, felhasznalo_om, nev, vegzesi_ev],
          (err, data) => {
            if (err) {
              return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send("Error: " + err);
            }
            return res.status(StatusCodes.OK).json(data);
          }
        );
      }
    }
  );
};

export const addStudent = (req, res) => {
  const { om_azon, nev, osztalyid, nappali_munkarend, agazatid, szakid } =
    req.body;
  db.query("SELECT * FROM tanulo WHERE om_azon = ?", [om_azon], (err, data) => {
    if (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Error: " + err);
    }
    if (data.length !== 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("This OM is already in use");
    } else {
      db.query("SELECT * FROM felhasznalo WHERE om_azon = ?", [om_azon], (err, data) => {
        if (err) {
          return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send("Error: " + err);
        }
        if (data.length !== 0) {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .send("This OM is already in use");
        } else {
          db.query(
            "INSERT INTO tanulo (om_azon, nev, osztalyid, nappali_munkarend, agazatid, szakid) VALUES (?,?,?,?,?,?);",
            [om_azon, nev, osztalyid, nappali_munkarend, agazatid, szakid],
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
      });
    }
  });
};

