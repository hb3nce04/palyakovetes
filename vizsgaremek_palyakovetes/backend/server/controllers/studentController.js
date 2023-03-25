import { db } from "../db.js";
import { StatusCodes } from "http-status-codes";

export const getStudentByOm = (req, res) => {
  console.log(req.body);
  const { om_azon } = req.body;

  if (!om_azon) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Missing OM ID");
  } else {
    db.query(
      "SELECT * FROM tanulo WHERE om_azon = ?",
      [om_azon],
      (err, data) => {
        if (err) {
          return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send("Error: " + err);
        }
        if (data.length === 0) {
          return res.status(StatusCodes.BAD_REQUEST).send("No such student");
        } else {
          db.query(
            "SELECT * FROM tanulo WHERE om_azon = ?",
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

export const getStudentListByClass = (req, res) => {
  console.log(req.body);
  const { class_id } = req.body;

  if (!class_id) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Missing OM ID");
  } else {
    db.query("SELECT * FROM osztaly WHERE id = ?", [class_id], (err, data) => {
      if (err) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send("Error: " + err);
      }
      if (data.length === 0) {
        return res.status(StatusCodes.BAD_REQUEST).send("No such class");
      } else {
        db.query(
          "SELECT * FROM tanulo INNER JOIN osztaly ON tanulo.osztalyid = osztaly.id WHERE osztaly.id = ?",
          [class_id],
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
};
