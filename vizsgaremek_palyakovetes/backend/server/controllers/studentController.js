import { db } from "../db.js";
import { StatusCodes } from "http-status-codes";

export const getStudentByOm = (req, res) => {
  console.log(req.body);
  const { om_azon } = req.body;

  if (!om_azon) {
    return res.status(StatusCodes.BAD_REQUEST).send("Missing OM ID");
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
              return res.status(StatusCodes.OK).json(data[0]);
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
    return res.status(StatusCodes.BAD_REQUEST).send("Missing OM ID");
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
          "SELECT tanulo.om_azon, tanulo.nev as tanulo_nev, tanulo.osztalyid, tanulo.nappali_munkarend, szakma.nev as szakma_nev, agazat.nev as agazat_nev FROM ( ((tanulo INNER JOIN osztaly ON tanulo.osztalyid = osztaly.id ) LEFT JOIN szakma ON tanulo.szakid = szakma.id ) LEFT JOIN agazat ON tanulo.agazatid = agazat.id) WHERE osztaly.id = ?;",
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

export const addStudent = async (req, res) => {
  const {
    om_azon,
    tanuloNev,
    osztalyid,
    nappali_munkarend,
    agazatid,
    szakid,
    kategoriaid,
    leiras,
  } = req.body;

  if (
    !om_azon ||
    !osztalyid ||
    !tanuloNev ||
    !nappali_munkarend ||
    !kategoriaid ||
    !leiras ||
    !(szakid || agazatid)
  ) {
    return res.status(StatusCodes.BAD_REQUEST).send("Missing parameters");
  }

  try {
    db.query(
      "SELECT * FROM tanulo WHERE om_azon = ?",
      [om_azon],
      async (err, data) => {
        if (err) {
          return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send("Error: " + err);
        }
        if (data.length !== 0) {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .send("OM ID already in use");
        } else {
          if (agazatid) {
            await db.query(
              "INSERT INTO tanulo (om_azon, nev, osztalyid, nappali_munkarend, agazatid) VALUES (?, ?, ?, ?, ?);",
              [om_azon, tanuloNev, osztalyid, nappali_munkarend, agazatid]
            );
          } else if (szakid) {
            await db.query(
              "INSERT INTO tanulo (om_azon, nev, osztalyid, nappali_munkarend, szakid) VALUES (?, ?, ?, ?, ?);",
              [om_azon, tanuloNev, osztalyid, nappali_munkarend, szakid]
            );
          }
          await db.query(
            "INSERT INTO palya (diak_om_azon, kategoriaid, leiras) VALUES (?, ?, ?);",
            [om_azon, kategoriaid, leiras]
          );
          return res
            .status(StatusCodes.OK)
            .send("Student and palya have been created");
        }
      }
    );
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error: " + err);
  }
};

export const deleteStudent = (req, res) => {
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
          let tmp = false;
          db.query(
            "DELETE FROM tanulo WHERE om_azon = ?;",
            [om_azon],
            async (err, data) => {
              if (err) {
                return res
                  .status(StatusCodes.INTERNAL_SERVER_ERROR)
                  .send("error : " + err);
              }
              db.query(
                "DELETE FROM palya WHERE diak_om_azon = ?;",
                [om_azon],
                (err, data) => {
                  if (err) {
                    return res
                      .status(StatusCodes.INTERNAL_SERVER_ERROR)
                      .send("error : " + err);
                  }
                  return res
                    .status(StatusCodes.OK)
                    .send("palya and studnet have been deleted");
                }
              );
            }
          );
        }
      }
    );
  }
};


export const editStudent = async (req, res) => {
  const {
    om_azon,
    tanuloNev,
    nappali_munkarend,
    agazatid,
    szakid,
    kategoriaid,
    leiras,
  } = req.body;

  if (
    !om_azon ||
    !tanuloNev ||
    !nappali_munkarend ||
    !kategoriaid ||
    !leiras ||
    !(szakid || agazatid)
  ) {
    return res.status(StatusCodes.BAD_REQUEST).send("Missing parameters");
  }

  try {
    db.query(
      "SELECT * FROM tanulo WHERE om_azon = ?",
      [om_azon],
      async (err, data) => {
        if (err) {
          return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send("Error: " + err);
        }
        if (data.length === 0) {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .send("No such student");
        } else {
          if (agazatid) {
            await db.query(
              "UPDATE tanulo SET nev = ?, nappali_munkarend = ?, agazatid = ? WHERE om_azon = ?",
              [tanuloNev, nappali_munkarend, agazatid, om_azon]
            );
          } else if (szakid) {
            await db.query(
              "UPDATE tanulo SET nev = ?, nappali_munkarend = ?, szakid = ? WHERE om_azon = ?",
              [tanuloNev, nappali_munkarend, szakid, om_azon]
            );
          }
          await db.query(
            "UPDATE palya SET kategoriaid = ?, leiras = ? WHERE diak_om_azon = ?",
            [kategoriaid, leiras, om_azon]
          );
          return res
            .status(StatusCodes.OK)
            .send("Student and palya have been edited");
        }
      }
    );
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error: " + err);
  }
};
