// Import mysql
const mysql = require("mysql");

// Import dotenv
require("dotenv").config();

const { HOST, USERDB, PASSWORD, DB } = process.env;

//For mysql db connection
const dbConn = mysql.createPool({
  connectionLimit: 1000,
  host: HOST,
  user: USERDB,
  password: PASSWORD,
  database: DB,
  debug: false,
});

module.exports = dbConn;
