import { db } from "../db.js";
import { StatusCodes } from "http-status-codes";

export const getCategories = (req, res) => {
  const token = req.user;
  if (token.isAdmin === 1) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
  } else {
    db.query("SELECT * FROM kategoria;", (err, data) => {
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

export const getProfessions = (req, res) => {
  const token = req.user;
  if (token.isAdmin === 1) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
  } else {
    db.query("SELECT id AS szakmaid,nev,szam FROM szakma;", (err, data) => {
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

export const getSectors = (req, res) => {
  const token = req.user;
  if (token.isAdmin === 1) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
  } else {
    db.query("SELECT id AS agazatid,nev,szam FROM agazat;", (err, data) => {
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
