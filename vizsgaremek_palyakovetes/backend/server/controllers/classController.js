import { db } from "../db.js";
import { StatusCodes } from "http-status-codes";

export const getClasses = (req, res) => {
  console.log(req.body);
  const { om_azon } = req.body;

  if (!om_azon) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Missing OM ID");
  } else {
    db.query(
      "SELECT osztaly.id, osztaly.nev AS osztaly_nev, iskola.nev AS iskola_nev, osztaly.vegzesi_ev FROM osztaly,iskola WHERE felhasznalo_om = ? AND osztaly.iskolaid = iskola.id",
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
