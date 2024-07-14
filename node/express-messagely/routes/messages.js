const express = require("express")
const router = new express.Router()
const Message = require("../models/message");
const middleware = require("../middleware/auth");
const ExpressError = require("../expressError");

/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/
router.get("/:id", middleware.ensureLoggedIn, async function (req, res, next) {
    try {
        const results = await Message.get(req.params.id)
        if (req.user.username == results.from_user.username ||
            req.user.username == results.to_user.username) {
            res.json(results)
        } else {
            throw new ExpressError("unauthorized", 401)
        }

    } catch (err) {
        return next(err)
    }
})

/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/
router.post("/", middleware.ensureLoggedIn, async function (req, res, next) {
    try {
        const { to_username, body } = req.body
        const results = await Message.create(req.user.username, to_username, body)
        return res.json({
            message: {
                id: results.id,
                from_username: results.from_username,
                to_username: results.to_username,
                body: results.body,
                sent_at: results.sent_at
            }
        })
    } catch (err) {
        return next(err)
    }
})

/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/
router.post("/:id/read", middleware.ensureLoggedIn, async function (req, res, next) {
    try {
        const msg = await Message.get(req.params.id)
        if (req.user.username == msg.to_user.username) {
            const results = await Message.markRead(req.params.id)
            return res.json({
                message: {
                    id: results.id,
                    read_at: results.read_at
                }
            })
        } else {
            throw new ExpressError("Not intended recipient", 401)
        }
    } catch (err) {
        return next(err)
    }
})

module.exports = router;