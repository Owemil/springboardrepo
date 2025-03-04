"use strict";

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");
const db = require("../db.js");
const User = require("./user.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll
} = require("./_testCommon");


beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** authenticate */

describe("authenticate", function () {
  test("works", async function () {
    const user = await User.authenticate("u1", "password1");
    expect(user).toEqual({
      username: "u1",
      firstName: "U1F",
      lastName: "U1L",
      email: "u1@email.com",
      zipCode: 98466,
      isAdmin: false,
    });
  });

  test("unauth if no such user", async function () {
    try {
      await User.authenticate("nope", "password");
      fail();
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });

  test("unauth if wrong password", async function () {
    try {
      await User.authenticate("c1", "wrong");
      fail();
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });
});

/************************************** register */

describe("register", function () {
  const newUser = {
    username: "new",
    firstName: "Test",
    lastName: "Tester",
    email: "test@test.com",
    zipCode: 98466,
    isAdmin: false,
  };

  test("works", async function () {
    let user = await User.register({
      ...newUser,
      password: "password",
    });
    expect(user).toEqual(newUser);
    const found = await db.query("SELECT * FROM users WHERE username = 'new'");
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0].is_admin).toEqual(false);
    expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
  });

  test("works: adds admin", async function () {
    let user = await User.register({
      ...newUser,
      password: "password",
      isAdmin: true,
    });
    expect(user).toEqual({ ...newUser, isAdmin: true });
    const found = await db.query("SELECT * FROM users WHERE username = 'new'");
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0].is_admin).toEqual(true);
    expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
  });

  test("bad request with dup data", async function () {
    try {
      await User.register({
        ...newUser,
        password: "password",
      });
      await User.register({
        ...newUser,
        password: "password",
      });
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** findAll */

describe("findAll", function () {
  test("works", async function () {
    const users = await User.findAll();
    expect(users).toEqual([
      {
        username: "u1",
        firstName: "U1F",
        lastName: "U1L",
        email: "u1@email.com",
        zipCode: 98466,
        isAdmin: false,
      },
      {
        username: "u2",
        firstName: "U2F",
        lastName: "U2L",
        email: "u2@email.com",
        zipCode: 98466,
        isAdmin: false,
      },
    ]);
  });
});

/************************************** get */

describe("get", function () {
  test("works", async function () {
    let user = await User.get("u1");
    expect(user).toEqual({
      username: "u1",
      firstName: "U1F",
      lastName: "U1L",
      email: "u1@email.com",
      zipCode: 98466,
      isAdmin: false,
      favPets: [{
        petId: 1,
        petName: "bubbles",
        petPic: "https://tinyeye.com"
      }],
      favOrgs: [{
        orgId: 1,
        orgName: "Tacoma Humane Society",
        orgUrl: "www.rescue.com",
        orgContact: "contact@email.com"
      }]
    });
  });

  test("not found if no such user", async function () {
    try {
      await User.get("nope");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** update */

describe("update", function () {
  const updateData = {
    firstName: "NewF",
    lastName: "NewF",
    email: "new@email.com",
    zipCode: 95847,
    isAdmin: true,
  };

  test("works", async function () {
    let job = await User.update("u1", updateData);
    expect(job).toEqual({
      username: "u1",
      ...updateData,
    });
  });

  test("works: set password", async function () {
    let job = await User.update("u1", {
      password: "new",
    });
    expect(job).toEqual({
      username: "u1",
      firstName: "U1F",
      lastName: "U1L",
      email: "u1@email.com",
      zipCode: 98466,
      isAdmin: false,
    });
    const found = await db.query("SELECT * FROM users WHERE username = 'u1'");
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
  });

  test("not found if no such user", async function () {
    try {
      await User.update("nope", {
        firstName: "test",
      });
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  test("bad request if no data", async function () {
    expect.assertions(1);
    try {
      await User.update("c1", {});
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** remove */

describe("remove", function () {
  test("works", async function () {
    await User.remove("u1");
    const res = await db.query(
      "SELECT * FROM users WHERE username='u1'");
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such user", async function () {
    try {
      await User.remove("nope");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** addFavPet */

describe("addFavPet", function () {
  test("works", async function () {
    const res = await User.addFavPet({
      username: "u1",
      petId: 12,
      petName: "rufus",
      petPic: "https://tinyeye.com"
    })

    expect(res).toEqual({
      petId: 12,
      petName: "rufus",
      petPic: "https://tinyeye.com"
    })
    const res2 = await db.query(`
      SELECT * 
      FROM favPets
      WHERE username = 'u1' AND pet_id = '12'`)
    expect(res2.rows.length).toEqual(1)
  })
  test("works without pet picture", async function () {
    const res = await User.addFavPet({
      username: "u1",
      petId: 12,
      petName: "rufus",
      petPic: ""
    })

    expect(res).toEqual({
      petId: 12,
      petName: "rufus",
      petPic: ""
    })
    const res2 = await db.query(`
      SELECT * 
      FROM favPets
      WHERE username = 'u1' AND pet_id = '12'`)
    expect(res2.rows.length).toEqual(1)
  })
  test("fails fav dupe", async function () {

    try {
      await User.addFavPet({
        username: "u1",
        petId: 12,
        petName: "rufus",
        petPic: "https://tinyeye.com"
      })
      await User.addFavPet({
        username: "u1",
        petId: 12,
        petName: "rufus",
        petPic: "https://tinyeye.com"
      })
      fail()
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
    const res = await db.query(`
    SELECT * 
    FROM favPets
    WHERE username = 'u1' AND pet_id = '12'`)
    expect(res.rows.length).toEqual(1)
  })
  test("fails missing petName", async function () {

    try {
      await User.addFavPet({
        username: "u1",
        petId: 12,
        petName: "",
        petPic: "https://tinyeye.com"
      })
      fail()
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
    const res = await db.query(`
    SELECT * 
    FROM favPets
    WHERE username = 'u1' AND pet_id = '12'`)
    expect(res.rows.length).toEqual(0)
  })

})

/************************************** removeFavPet */

describe("removeFavPet", function () {
  test("works", async function () {
    await User.removeFavPet("u1", 1);
    const res = await db.query(
      "SELECT * FROM favPets WHERE username='u1' AND pet_id='1'");
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such favPet", async function () {
    try {
      await User.removeFavPet("u1", 300);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** addFavOrg */

describe("addFavOrg", function () {
  test("works", async function () {
    const res = await User.addFavOrg({
      username: "u1",
      orgId: 12,
      orgName: "Bothell Shelter",
      orgUrl: "www.shelter.org",
      orgContact: "123-456-789"
    })

    expect(res).toEqual({
      username: "u1",
      orgId: 12,
      orgName: "Bothell Shelter",
      orgUrl: "www.shelter.org",
      orgContact: "123-456-789"
    })
    const res2 = await db.query(`
      SELECT * 
      FROM favOrgs
      WHERE username = 'u1' AND org_id = '12'`)
    expect(res2.rows.length).toEqual(1)
  })
  test("fails fav dupe", async function () {

    try {
      await User.addFavOrg({
        username: "u1",
        orgId: 12,
        orgName: "Bothell Shelter",
        orgUrl: "www.shelter.org",
        orgContact: "123-456-789"
      })
      await User.addFavOrg({
        username: "u1",
        orgId: 12,
        orgName: "Bothell Shelter",
        orgUrl: "www.shelter.org",
        orgContact: "123-456-789"
      })
      fail()
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
    const db = await db.query(`
    SELECT * 
    FROM favOrgs
    WHERE username = 'u1' AND org_id = '12'`)
    expect(db.rows.length).toEqual(1)
  })
  test("fails missing data", async function () {

    try {
      await User.addFavOrg({
        username: "u1",
        orgId: 12,
        orgName: "",
        orgUrl: "",
        orgContact: ""
      })
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
    const res = await db.query(`
    SELECT * 
    FROM favOrgs
    WHERE username = 'u1' AND org_id = '12'`)
    expect(res.rows.length).toEqual(0)
  })

})

/************************************** removeFavPet */

describe("removeFavOrg", function () {
  test("works", async function () {
    await User.removeFavOrg("u1", 1);
    const res = await db.query(
      "SELECT * FROM favOrgs WHERE username='u1' AND org_id='1'");
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such favOrg", async function () {
    try {
      await User.removeFavOrg("u1", 300);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});