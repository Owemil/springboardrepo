// Set ENV VAR to test before we load anything, so our app's config will use
// testing settings

process.env.NODE_ENV = "test";

const db = require("../db");

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { authUser } = require("./auth");

const testJwt = jwt.sign({ username: "jtest", admin: false }, SECRET_KEY);
const badJwt = jwt.sign({ username: "badKey", admin: false }, "wrong");



describe("authUser: should verify jwt", function () {
    test("works: via header", function () {
        const req = {
            query: { _token: testJwt },
            curr_username: {},
            curr_admin: {}
        };

        const res = {};
        const next = function (err) {
            expect(err).toBeFalsy();

        };
        authUser(req, res, next);
        expect(req.curr_username).toEqual("jtest");
        expect(req.curr_admin).toEqual(false);
    });

    test("fails: via header", function () {
        const req = {
            query: { _token: badJwt },
            curr_username: {},
            curr_admin: {}
        };
        const res = {};
        const next = function (err) {
            expect(err).toBeTruthy();

        };
        authUser(req, res, next);
        expect(req.curr_username).toEqual({});
        expect(req.curr_admin).toEqual({});
    });


})


afterAll(function () {
    db.end();
});