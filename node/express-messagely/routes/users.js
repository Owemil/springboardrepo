const express = require("express")
const router = new express.Router()
const ExpressError = require("../expressError")
const User = require("../models/user")
const middleware = require("../middleware/auth")

/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/
router.get("/", middleware.ensureLoggedIn, async function (req, res, next) {
    try {
        if (!req.user) throw new ExpressError("unauthroized", 401)
        const results = await User.all()
        if (!results) throw new ExpressError("Can not fetch data", 400)

        return res.json({
            users: results
        })
    } catch (err) {
        return next(err)
    }

})

/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/
router.get("/:username", middleware.ensureCorrectUser, async function (req, res, next) {
    try {
        const user = await User.get(req.params.username)

        if (!user) throw new ExpressError("Can not fetch data", 400)

        return res.json({
            user: {
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                phone: user.phone,
                join_at: user.joined_at,
                last_login_at: user.last_login_at
            }
        }
        )

    } catch (err) {
        return next(err)
    }

})

/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/
router.get("/:username/to", middleware.ensureCorrectUser, async function (req, res, next) {
    try {
        const results = await User.messagesTo(req.params.username)
        return res.json(results)
    } catch (err) {
        return next(err)
    }

})

/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/
router.get("/:username/from", middleware.ensureCorrectUser, async function (req, res, next) {
    try {

        const results = await User.messagesFrom(req.params.username)
        return res.json(results)
    } catch (err) {
        return next(err)
    }

})

module.exports = router;