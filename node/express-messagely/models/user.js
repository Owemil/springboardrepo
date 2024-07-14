/** User class for message.ly */
const db = require("../db");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, BCRYPT_WORK_FACTOR } = require("../config");
const bcrypt = require("bcrypt")
const ExpressError = require("../expressError");
const Test = require("supertest/lib/test");




/** User of the site. */

class User {

  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */

  static async register({ username, password, first_name, last_name, phone }) {
    const hashWord = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
    const results = await db.query(
      `INSERT INTO users (username, password, first_name, last_name, phone,join_at) 
      VALUES ($1, $2, $3, $4, $5,current_timestamp)
      RETURNING username, password, first_name, last_name, phone`,
      [username, hashWord, first_name, last_name, phone])
    const token = jwt.sign({ username }, SECRET_KEY)
    return {
      user: results.rows[0],
      token: token
    }
  }

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) {

    const results = await db.query(
      `SELECT password 
        FROM users
        WHERE username = $1`, [username])
    const hashword = results.rows[0].password
    if (hashword) {
      if (bcrypt.compare(hashword, password)) {
        return true
      } else {
        return false
      }
    } else {
      throw new ExpressError("Unauthorized", 401)
    }


  }


  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) {
    const results = await db.query(
      `UPDATE users 
      SET last_login_at = current_timestamp
      WHERE username = $1`, [username])
  }

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */

  static async all() {
    const results = await db.query(
      `SELECT username,
        first_name,
        last_name,
        phone
        FROM users`)

    return results.rows.map(u => u)
  }
  // username: u.username,
  // first_name: u.first_name,
  // last_name: u.last_name,
  // phone: u.phone
  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) {
    const results = await db.query(
      `SELECT username,
              first_name,
              last_name,
              phone,
              join_at,
              last_login_at
      FROM users
      WHERE username = $1`, [username])

    return results.rows[0]
  }

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) {
    console.log(username)
    const results = await db.query(
      `SELECT m.id,
              m.to_username,
              m.from_username,
              m.body,
              m.sent_at,
              m.read_At,
              u.username,
              u.first_name,
              u.last_name,
              u.phone
       FROM messages AS m
       JOIN users AS u ON m.to_username = u.username
       WHERE from_username = $1`, [username])

    const messages = results.rows.map(m => ({
      id: m.id,
      to_user: {
        username: m.username,
        first_name: m.first_name,
        last_name: m.last_name,
        phone: m.phone
      },
      body: m.body,
      sent_at: m.sent_at,
      read_at: m.read_at
    }))
    return messages
  }

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesTo(username) {
    const results = await db.query(
      `SELECT m.id,
              m.from_username,
              m.body,
              m.sent_at,
              m.read_At,
              u.username,
              u.first_name,
              u.last_name,
              u.phone
       FROM messages AS m
       INNER JOIN users AS u ON m.from_username = u.username
       WHERE to_username = $1`, [username])

    const messages = results.rows.map(m => ({
      id: m.id,
      from_user: {
        username: m.username,
        first_name: m.first_name,
        last_name: m.last_name,
        phone: m.phone
      },
      body: m.body,
      sent_at: m.sent_at,
      read_at: m.read_at
    }))
    return messages
  }

}


module.exports = User;

// jtest test123
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imp0ZXN0IiwiaWF0IjoxNzIwOTI0MDQ5fQ.IQLYPJVaqDpJQc1Wdq0jCahmtq-OyPAxn-r1lCpXk8o"

// btest 321tset
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJ0ZXN0IiwiaWF0IjoxNzIwOTI2Njk3fQ.719f6KSPcs8NtZkGR5YuUMXoj47G-VGfyRG75zDJYMU"