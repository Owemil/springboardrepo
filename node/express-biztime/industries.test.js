process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("./app");
const db = require("./db");

describe("get /industries", function () {
    test("get all /industries", async function () {
        const resp = await request(app).get("/industries")

        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({
            "industries": {
                "Agriculture": null,
                "Computer": null,
                "Energy": [
                    "tsla"
                ],
                "Food Industry": [
                    "crmbl"
                ],
                "Manufacturing": null,
                "Research": [
                    "crmbl",
                    "tsla"
                ],
                "Technology": null
            }
        })
    })
})

describe("post /industries", function () {
    test("post /industries", async function () {
        const resp = await request(app)
            .post("/industries")
            .send({
                "code": "hlth",
                "industry": "health"
            })
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({
            "industry": {
                "code": "hlth",
                "industry": "health"
            }
        })
    })

    test("post /industries/:ind_code", async function () {
        const resp = await request(app)
            .post("/industries/mnfct")
            .send({
                comp_code: "crmbl"
            })
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({
            "comp_ind": {
                "comp_code": "crmbl",
                "ind_code": "mnfct"
            }
        })
    })
})