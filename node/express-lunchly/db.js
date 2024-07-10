/** Database for lunchly */

const pg = require("pg");
process.env.PGPASSWORD = "Salmonidaho123!"
const db = new pg.Client("postgresql:///lunchly");

db.connect();

module.exports = db;
