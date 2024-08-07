/** Shared config for application; can be req'd many places. */

require('dotenv').config();
// BUG #5
const SECRET_KEY = process.env.SECRET_KEY;

const PORT = +process.env.PORT || 3000;
// BUG #5
const BCRYPT_WORK_FACTOR = process.env.BCRYPT_WORK_FACTOR;

const DB_URI =
  process.env.NODE_ENV === 'test'
    ? 'postgresql:///bankly_test'
    : 'postgresql:///bankly';

module.exports = {
  BCRYPT_WORK_FACTOR,
  SECRET_KEY,
  PORT,
  DB_URI
};
