process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("./app");
const db = require("./db");

describe('get /companies', function () {
    test("get all companies", async function () {
        const resp = await request(app).get("/companies")
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({
            "companies": [
                {
                    "code": "apple",
                    "name": "Apple Computer"
                },
                {
                    "code": "ibm",
                    "name": "IBM"
                },
                {
                    "code": "mcrsft",
                    "name": "Microsoft"
                },
                {
                    "code": "crmbl",
                    "name": "Crumbl"
                },
                {
                    "code": "tsla",
                    "name": "Tesla"
                }
            ]
        })
    })

    test("get single company", async function () {
        const resp = await request(app).get("/companies/apple")
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({
            "company": {
                "code": "apple",
                "name": "Apple Computer",
                "description": "Maker of OSX.",
                "invoice": {
                    "id": 1,
                    "comp_code": "apple",
                    "amt": 100,
                    "paid": false,
                    "paid_date": null
                },
                "Industry": [
                    "comp",
                    "tech"
                ]
            }
        })
    })

    test("throw an error", async function () {
        const resp = await request(app).get("/companies/asd")
        expect(resp.statusCode).toBe(404)
        expect(resp.res.text).toEqual('{"error":{"message":"asd Not Found","status":404},"message":"asd Not Found"}')
    })
})

describe("post /companies", function () {
    test("create company", async function () {
        const resp = await request(app)
            .post("/companies")
            .send({
                name: "Costco",
                description: "bulk wholesale company/club"
            })
        expect(resp.statusCode).toBe(201)
        expect(resp.body).toEqual({
            "company": {
                "code": "cstc",
                "name": "Costco",
                "description": "bulk wholesale company/club"
            }
        })
    })

    test("throw an error", async function () {
        const resp = await request(app)
            .post("/companies")
            .send({
                description: "adsgag"
            })

        expect(resp.statusCode).toBe(400)
    })
})

describe("update /companies/:code", function () {
    test("update apple", async function () {
        const resp = await request(app)
            .patch("/companies/apple")
            .send({
                name: "applebapple",
                description: "Creator of apples and bapples"
            })
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({
            "company": [
                {
                    "code": "apple",
                    "name": "applebapple",
                    "description": "Creator of apples and bapples"
                }
            ]
        })
    })

    test("throw an error", async function () {
        const resp = await request(app).patch("/companies/asd")
        expect(resp.statusCode).toBe(404)
    })
})

describe("delete /companies/:code", function () {
    test("delete company", async function () {
        const resp = await request(app).delete("/companies/apple")

        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({
            "status": "apple DELETED!"
        })
    })

    test("throw an error", async function () {
        const resp = await request(app).delete("/companies/asd")
        expect(resp.statusCode).toBe(404)
    })
})

afterAll(async function () {
    // close db connection
    await db.end();
});

