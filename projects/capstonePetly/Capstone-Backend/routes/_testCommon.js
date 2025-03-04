"use strict";

const db = require("../db.js");
const User = require("../models/user");


const { createToken } = require("../helpers/tokens");



async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");

  await User.register({
    username: "u1",
    password: "password1",
    firstName: "U1F",
    lastName: "U1L",
    email: "user1@user.com",
    zipCode: 98466,
    isAdmin: false,
  });
  await User.register({
    username: "u2",
    password: "password2",
    firstName: "U2F",
    lastName: "U2L",
    email: "user2@user.com",
    zipCode: 98466,
    isAdmin: false,
  });
  await User.register({
    username: "u3",
    password: "password3",
    firstName: "U3F",
    lastName: "U3L",
    email: "user3@user.com",
    zipCode: 98466,
    isAdmin: false,
  });

  await User.addFavPet({
    username: "u1",
    petId: 1,
    petName: "rufus",
    petPic: "https://tinyeye.com"
  })

  await User.addFavPet({
    username: "u2",
    petId: 2,
    petName: "creature",
    petPic: "https://tinyeye.com"
  })
  await User.addFavPet({
    username: "u3",
    petId: 3,
    petName: "pepper",
    petPic: "https://tinyeye.com"
  })

  await User.addFavOrg({
    username: "u1",
    orgId: 1,
    orgName: "Renton Rescue",
    orgUrl: "www.rescue.com",
    orgContact: "rescue@gmail.com"
  })
  await User.addFavOrg({
    username: "u2",
    orgId: 2,
    orgName: "Seattle Shetler",
    orgUrl: "www.rescue.com",
    orgContact: "rescue@gmail.com"
  })
  await User.addFavOrg({
    username: "u3",
    orgId: 3,
    orgName: "Issiquah Humane society",
    orgUrl: "www.rescue.com",
    orgContact: "rescue@gmail.com"
  })
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


const u1Token = createToken({ username: "u1", isAdmin: false });
const u2Token = createToken({ username: "u2", isAdmin: false });
const adminToken = createToken({ username: "admin", isAdmin: true });


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
  adminToken,
};
