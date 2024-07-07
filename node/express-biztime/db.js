/** Database setup for BizTime. */
const { Client } = require("pg");
process.env.PGPASSWORD = "Salmonidaho123!"
const DB_URI = (process.env.NODE_ENV === "test")
    ? "postgresql:///biztime_test"
    : "postgresql:///biztime";

let db = new Client({
    connectionString: DB_URI,

});

db.connect();

module.exports = db; 
