import { db } from "../db.js";
import { StatusCodes } from "http-status-codes";

export const getSchools = (req, res) =>{
    db.query("SELECT * FROM iskola;", (err, data) => {
      if (!err) {
        return res.status(StatusCodes.OK).json(data);
      } else {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send("Error: " + err);
      }
    });
  };