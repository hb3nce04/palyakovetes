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
            (err, osztalyok) => {
              
              if (err) {
                return res
                  .status(StatusCodes.INTERNAL_SERVER_ERROR)
                  .send("error : " + err);
              }
              
              db.query(
                "SELECT tanulo.osztalyid, tanulo.nev AS tanulo_nev,tanulo.om_azon,tanulo.nappali_munkarend,agazat.nev AS agazat_nev,szakma.nev AS szakma_nev FROM tanulo,osztaly,agazat,szakma WHERE tanulo.osztalyid = osztaly.id AND tanulo.agazatid = agazat.id AND tanulo.szakid = szakma.id;",
              (err, tanulok) => {
                console.log("Osztály?")
                console.log(tanulok)
                return res.status(StatusCodes.OK).json({osztalyok,tanulok})
              }
              )

              //return res.status(StatusCodes.OK).json(data);
            }
          );
        }
      }
    );
  }
};
