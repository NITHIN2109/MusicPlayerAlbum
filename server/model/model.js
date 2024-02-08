const mysql = require("mysql2");
const config = require("../config/config.js");
const db = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});
db.connect((err) => {
  if (err) {
    console.log("Error in connecting the database", err);
    return;
  }
  console.log("Database is connected");
});

module.exports = db;
