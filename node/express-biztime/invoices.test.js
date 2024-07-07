process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("./app");
const db = require("./db");

describe('get /invoices', function () {
    test("get all invoices", async function () {
        const resp = await request(app).get("/invoices")
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({
            "invoices": [
                {
                    "id": 4,
                    "comp_code": "ibm"
                },
                {
                    "id": 5,
                    "comp_code": "mcrsft"
                },
                {
                    "id": 6,
                    "comp_code": "crmbl"
                },
                {
                    "id": 7,
                    "comp_code": "tsla"
                }
            ]
        })
    })

    test("get single invoice", async function () {
        const resp = await request(app).get("/invoices/6")
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({
            "invoice": {
                "id": 6,
                "company": {
                    "code": "crmbl",
                    "name": "Crumbl",
                    "description": "Maker of cookies"
                },
                "amt": 8500,
                "paid": false,
                "add_date": "2024-07-06T07:00:00.000Z",
                "paid_date": null
            }
        })
    })

    test("throw an error", async function () {
        const resp = await request(app).get("/invoices/0")
        expect(resp.statusCode).toBe(404)

    })
})

describe("post /invoices", function () {
    test("create invoices", async function () {
        const resp = await request(app)
            .post("/invoices")
            .send({
                comp_code: "mcrsft",
                amt: 696969
            })
        expect(resp.statusCode).toBe(201)
        expect(resp.body).toEqual({
            id: 12,
            comp_code: "mcrsft",
            amt: 696969,
            paid: false,
            add_date: "2024-07-07T07:00:00.000Z",
            paid_date: null
        })
    })
})

describe("update /invoices/:id", function () {
    test("update invoice 6", async function () {
        const resp = await request(app)
            .patch("/invoices/6")
            .send({
                amt: 35000,
                paid: "t"
            })
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({
            "invoice": {
                "id": 6,
                "comp_code": "crmbl",
                "amt": 35000,
                "paid": true,
                "add_date": "2024-07-06T07:00:00.000Z",
                "paid_date": "2024-07-07T07:00:00.000Z"
            }
        })
    })

    test("throw an error", async function () {
        const resp = await request(app).patch("/invoices/0")
        expect(resp.statusCode).toBe(404)
    })
})

describe("delete /invoices/:id", function () {
    test("delete invoice 6", async function () {
        const resp = await request(app).delete("/invoices/+6")

        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({
            "status": "DELETED!"
        })
    })

    test("throw an error", async function () {
        const resp = await request(app).delete("/invoices/0")
        expect(resp.statusCode).toBe(404)
    })
})

afterAll(async function () {
    // close db connection
    await db.end();
});