import { db } from "../db.js";
import { StatusCodes } from "http-status-codes";

export const getUsers = (req, res) => {
  db.query("SELECT * FROM felhasznalo;", (err, data) => {
    if (!err) {
      return res.status(StatusCodes.OK).json(data);
    } else {
      console.log("xd");
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("error : " + err);
    }
  });
};


