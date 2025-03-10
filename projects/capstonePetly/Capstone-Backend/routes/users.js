"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const userNewSchema = require("../schemas/userNew.json");
const userUpdateSchema = require("../schemas/userUpdate.json");

const router = express.Router();


/** POST / { user }  => { user, token }
 *
 * Adds a new user. This is not the registration endpoint --- instead, this is
 * only for admin users to add new users. The new user being added can be an
 * admin.
 *
 * This returns the newly created user and an authentication token for them:
 *  {user: { username, firstName, lastName, email, isAdmin }, token }
 *
 * Authorization required: admin
 **/

router.post("/", ensureAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.register(req.body);
    const token = createToken(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    return next(err);
  }
});


/** GET / => { users: [ {username, firstName, lastName, email }, ... ] }
 *
 * Returns list of all users.
 *
 * Authorization required: admin
 **/

router.get("/", ensureAdmin, async function (req, res, next) {
  try {
    const users = await User.findAll();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});


/** GET /[username] => { user }
 *
 * Returns { username, firstName, lastName, isAdmin, jobs }
 *   where jobs is { id, title, companyHandle, companyName, state }
 *
 * Authorization required: admin or same user-as-:username
 **/

router.get("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const user = await User.get(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});


/** PATCH /[username] { user } => { user }
 *
 * Data can include:
 *   { firstName, lastName, password, email }
 *
 * Returns { username, firstName, lastName, email, isAdmin }
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.patch("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.update(req.params.username, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});


/** DELETE /[username]  =>  { deleted: username }
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.delete("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    await User.remove(req.params.username);
    return res.json({ deleted: req.params.username });
  } catch (err) {
    return next(err);
  }
});

/**POST [username]/favorites/pets/[petId] 
 * 
 * required in body {petName, petPic(if no pic put empty str)}
 * 
 * returns {"favAdded":[petName] (Pet)}
 * 
 * Authorization required: admin or same-user-as-:username
*/

router.post("/:username/favorites/pets/:petId", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    let { username, petId } = req.params
    petId = +petId
    let { petName, petPic } = req.body
    await User.addFavPet({ username, petId, petName, petPic })
    return res.json({ favAdded: `${petName} (Pet)` })
  } catch (err) {
    return next(err);
  }
});

/** DELETE [username]/favorites/pets/[petId] 
 * 
 * returns {"deleted": [petId]}
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.delete("/:username/favorites/pets/:petId", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    let { username, petId } = req.params
    await User.removeFavPet(username, petId);
    return res.json({
      data: {
        deleted: petId
      }
    });
  } catch (err) {
    return next(err);
  }
});

/**POST [username]/favorites/orgs/[orgId] 
 * 
 * data must include {orgName}
 * 
 * returns {"favAdded":[orgName] (organization)}
 * 
 * Authorization required: admin or same-user-as-:username
*/

router.post("/:username/favorites/orgs/:orgId", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {

    let { username, orgId } = req.params
    orgId = +orgId
    let { orgName, orgUrl, orgContact } = req.body
    await User.addFavOrg({ username, orgId, orgName, orgUrl, orgContact })
    return res.json({ favAdded: `${orgName} (Organization)` })
  } catch (err) {
    return next(err);
  }
});

/** DELETE [username]/favorites/orgs/[orgId]  =>  { deleted: petId }
 *
 * returns {"deleted: [orgId]"}
 * 
 * Authorization required: admin or same-user-as-:username
 **/

router.delete("/:username/favorites/orgs/:orgId", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    let { username, orgId } = req.params
    await User.removeFavOrg(username, orgId);
    return res.json({
      data: {
        deleted: orgId
      }
    }
    );
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
