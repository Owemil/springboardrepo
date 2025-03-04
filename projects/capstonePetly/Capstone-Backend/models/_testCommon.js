const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

async function commonBeforeAll() {

  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");

  await db.query(`
        INSERT INTO users(username,
                          password,
                          first_name,
                          last_name,
                          email,
                          zip_code)
        VALUES ('u1', $1, 'U1F', 'U1L', 'u1@email.com', 98466),
               ('u2', $2, 'U2F', 'U2L', 'u2@email.com', 98466)
        RETURNING username`,
    [
      await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
      await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
    ]);

  await db.query("DELETE FROM favPets");

  await db.query(`
      INSERT INTO favPets(username,
                          pet_id,
                          pet_name,
                          pet_pic)
      VALUES ('u1', 1, 'bubbles', 'https://tinyeye.com'),
             ('u2', 2, 'pepper', 'https://tinyeye.com')`)

  await db.query("DELETE FROM favOrgs");

  await db.query(`
      INSERT INTO favOrgs(username,
                          org_id,
                          org_name,
                          org_url,
                          org_contact)
      VALUES ('u1', '1',
        'Tacoma Humane Society',
        'www.rescue.com',
        'contact@email.com'),
             ('u2', '2',
        'Seattle Rescue',
        'www.rescue.com',
        '123-456-7890')`)


}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,

};