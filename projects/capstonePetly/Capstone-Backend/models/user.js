"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class User {
  /** authenticate user with username, password.
   *
   * Returns { username, first_name, last_name, email, is_admin }
   *
   * Throws UnauthorizedError is user not found or wrong password.
   **/

  static async authenticate(username, password) {
    // try to find the user first
    const result = await db.query(
      `SELECT username,
                  password,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email,
                  zip_code AS "zipCode",
                  is_admin AS "isAdmin"
           FROM users
           WHERE username = $1`,
      [username],
    );

    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /** Register user with data.
   *
   * Returns { username, firstName, lastName, email, isAdmin }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async register(
    { username, password, firstName, lastName, email, zipCode, isAdmin }) {
    const duplicateCheck = await db.query(
      `SELECT username
           FROM users
           WHERE username = $1`,
      [username],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users
           (username,
            password,
            first_name,
            last_name,
            email,
            zip_code,
            is_admin)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           RETURNING username, first_name AS "firstName", last_name AS "lastName", email, zip_code AS "zipCode", is_admin AS "isAdmin"`,
      [
        username,
        hashedPassword,
        firstName,
        lastName,
        email,
        zipCode,
        isAdmin,
      ],
    );

    const user = result.rows[0];

    return user;
  }

  /** Find all users.
   *
   * Returns [{ username, first_name, last_name, email, is_admin }, ...]
   **/

  static async findAll() {
    const result = await db.query(
      `SELECT username,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email,
                  zip_code AS "zipCode",
                  is_admin AS "isAdmin"
           FROM users
           ORDER BY username`,
    );

    return result.rows;
  }

  /** Given a username, return data about user.
   *
   * Returns { username, first_name, last_name, is_admin }
   *  
   *
   * Throws NotFoundError if user not found.
   **/

  static async get(username) {
    const userRes = await db.query(
      `SELECT username,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email,
                  zip_code AS "zipCode",
                  is_admin AS "isAdmin"
           FROM users
           WHERE username = $1`,
      [username],
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    const userFavPets = await db.query(
      `SELECT f.pet_id AS "petId", 
          f.pet_name AS "petName", 
          f.pet_pic AS "petPic"
           FROM favPets AS f
           WHERE f.username = $1`, [username]);

    user.favPets = userFavPets.rows.map(fav => fav);

    const userFavOrgs = await db.query(
      `SELECT f.org_id AS "orgId", 
          f.org_name AS "orgName",
          f.org_url AS "orgUrl",
          f.org_contact AS "orgContact"
           FROM favOrgs AS f
           WHERE f.username = $1`, [username]);

    user.favOrgs = userFavOrgs.rows.map(fav => fav);
    return user;
  }

  /** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { firstName, lastName, password, email, zipCode, isAdmin }
   *
   * Returns { username, firstName, lastName, email, zipCode, isAdmin }
   *
   * Throws NotFoundError if not found.
   *
   * WARNING: this function can set a new password or make a user an admin.
   * Callers of this function must be certain they have validated inputs to this
   * or a serious security risks are opened.
   */

  static async update(username, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    const { setCols, values } = sqlForPartialUpdate(
      data,
      {
        firstName: "first_name",
        lastName: "last_name",
        zipCode: "zip_code",
        isAdmin: "is_admin",
      });
    const usernameVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE username = ${usernameVarIdx} 
                      RETURNING username,
                                first_name AS "firstName",
                                last_name AS "lastName",
                                email,
                                zip_code AS "zipCode",
                                is_admin AS "isAdmin"`;
    const result = await db.query(querySql, [...values, username]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    delete user.password;
    return user;
  }

  /** Delete given user from database; returns undefined. */

  static async remove(username) {
    let result = await db.query(
      `DELETE
           FROM users
           WHERE username = $1
           RETURNING username`,
      [username],
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
  }

  /** Add a pet to users favorites */

  static async addFavPet({ username, petId, petName, petPic }) {
    if (!petName) {
      throw new BadRequestError(`missing required: petName`);
    }
    const duplicateCheck = await db.query(
      `SELECT username,
      pet_id
      FROM favPets
      WHERE username = $1 and pet_id = $2`,
      [username, petId]
    )
    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate favorite: ${petId, petName}`);
    }

    const result = await db.query(
      `INSERT INTO favPets
      (username,
      pet_id,
      pet_name,
      pet_pic)
      VALUES($1,$2,$3,$4)
      RETURNING 
      pet_id AS "petId", 
      pet_name AS "petName",
      pet_pic AS "petPic"`,
      [username, petId, petName, petPic]
    )
    const fav = result.rows[0]
    return fav
  }

  /** Delete given users favPet from database.
   * 
   * returns PetName
   */

  static async removeFavPet(username, petId) {
    const result = await db.query(
      `DELETE
           FROM favPets
           WHERE username = $1 AND pet_id = $2
           RETURNING pet_name`,
      [username, petId]
    );
    const exFav = result.rows[0];

    if (!exFav) throw new NotFoundError(`No pet: ${petId}`);

    return exFav
  }

  /** Add an org to users favorites */

  static async addFavOrg({ username, orgId, orgName, orgUrl, orgContact }) {
    if (!orgName) {
      throw new BadRequestError(`missing required: orgName`);
    }
    const duplicateCheck = await db.query(
      `SELECT username,
      org_id
      FROM favOrgs
      WHERE username = $1 and org_id = $2`,
      [username, orgId]
    )
    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate favorite: ${petId, petName}`);
    }
    const result = await db.query(
      `INSERT INTO favOrgs
      (username,
      org_id,
      org_name,
      org_url,
      org_contact)
      VALUES($1,$2,$3,$4,$5)
      RETURNING username, 
      org_id AS "orgId",
      org_name AS "orgName",
      org_url AS "orgUrl",
      org_contact AS "orgContact"`,
      [username, orgId, orgName, orgUrl, orgContact]
    )
    const fav = result.rows[0]

    return fav
  }

  /** Delete given users favOrg from database. */

  static async removeFavOrg(username, orgId) {
    const result = await db.query(
      `DELETE
           FROM favOrgs
           WHERE username = $1 AND org_id = $2
           RETURNING org_name`,
      [username, orgId],
    );
    const exFav = result.rows[0];

    if (!exFav) throw new NotFoundError(`No org: ${orgId}`);
  }


}


module.exports = User;
