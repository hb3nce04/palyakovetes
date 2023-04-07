import { db } from "../db.js";
import { StatusCodes } from "http-status-codes";

export const getCategories = (req, res) => {
    db.query("SELECT * FROM kategoria;", (err, data) => {
      if (!err) {
        return res.status(StatusCodes.OK).json(data);
      } else {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send("error : " + err);
      }
    });
  };

  export const getProfessions = (req, res) => {
    db.query("SELECT * FROM szakma;", (err, data) => {
      if (!err) {
        return res.status(StatusCodes.OK).json(data);
      } else {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send("error : " + err);
      }
    });
  };

  export const getSectors = (req, res) => {
    db.query("SELECT * FROM agazat;", (err, data) => {
      if (!err) {
        return res.status(StatusCodes.OK).json(data);
      } else {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send("error : " + err);
      }
    });
  };