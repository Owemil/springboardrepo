const express = require("express")
const router = new express.Router()
const ExpressError = require("../expressError")
const User = require("../models/user");

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/
router.post("/login", async function (req, res, next) {
    try {
        const { username, password } = req.body
        if (await User.authenticate(username, password)) {
            return res.json({
                welcome: `${username}`
            })
        }
    } catch (err) {
        return next(err)
    }
})

/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */
router.post("/register", async function (req, res, next) {
    try {
        const { username, password, first_name, last_name, phone } = req.body
        const results = await User.register({ username, password, first_name, last_name, phone })
        User.updateLoginTimestamp(username)
        return res.json(results)
    } catch (err) {
        return next(err)
    }
})

module.exports = router;