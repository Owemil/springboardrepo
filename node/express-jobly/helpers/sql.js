const { BadRequestError } = require("../expressError");


/** takes in two objects {dataToUpdate},{jsToSql}
 * 
 * isolate keys of {dataToUpdate} and map them by comparing to {jsToSql}
 * 
 * if key is a key of {jsToSql} use its value to parameterize, else use {dataToUpdate}(s) colName and parameterize off of idx + 1
 * 
 * returns object of parameterized keys for query and values of original {dataToUpdate}
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
    `"${jsToSql[colName] || colName}"=$${idx + 1}`
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
