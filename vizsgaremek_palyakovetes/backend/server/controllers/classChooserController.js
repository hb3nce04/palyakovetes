import { db } from "../db.js";
import { StatusCodes } from "http-status-codes";

export const getClasses = (req, res) => {

  console.log(req.body);
  const { om_azon } = req.body;
  
  if (!om_azon) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Missing OM ID");
  } else {

  let userExists = false;

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
          "SELECT * FROM osztaly WHERE felhasznalo_om = ?",
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
