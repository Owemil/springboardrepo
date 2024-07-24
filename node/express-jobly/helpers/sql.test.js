const { sqlForPartialUpdate } = require("./sql")
const { BadRequestError, NotFoundError } = require("../expressError");

describe('sqlForPartialUpdate', () => {
    test("Users update", function () {
        expect(sqlForPartialUpdate(
            {
                "firstName": "jobby",
                "lastName": "jest",
                "email": "bjestt@test.test"
            },
            {
                firstName: "first_name",
                lastName: "last_name",
                isAdmin: "is_admin",
            })).toEqual({
                setCols: '"first_name"=$1, "last_name"=$2, "email"=$3',
                values: ['jobby', 'jest', 'bjestt@test.test']
            })
    })
    test("Users update key error", function () {
        try {
            sqlForPartialUpdate(
                {

                },
                {
                    firstName: "first_name",
                    lastName: "last_name",
                    isAdmin: "is_admin",
                })
        } catch (err) {

            expect(err instanceof BadRequestError).toBeTruthy()
        }
    })

    test("company update", function () {
        expect(sqlForPartialUpdate(
            {
                "name": "krusty Krab",
                "description": "just a crab making burgers out of krab",
                "numEmployees": 3
            },
            {
                numEmployees: "num_employees",
                logoUrl: "logo_url",
            })).toEqual({
                setCols: '"name"=$1, "description"=$2, "num_employees"=$3',
                values: ['krusty Krab', 'just a crab making burgers out of krab', 3]
            })
    })
    test("company update key error", function () {
        try {
            sqlForPartialUpdate(
                {

                },
                {
                    numEmployees: "num_employees",
                    logoUrl: "logo_url",
                })
        } catch (err) {

            expect(err instanceof BadRequestError).toBeTruthy()
        }
    })
})
