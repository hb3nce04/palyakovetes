import mysql from "mysql2"

export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    port: "3306",
    password: "root",
    database:"palyakovetes"
  });