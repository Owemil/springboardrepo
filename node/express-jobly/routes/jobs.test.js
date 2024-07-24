"use strict";

const request = require("supertest");

const db = require("../db");
const app = require("../app");

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    u1Token,
    u2Token,
} = require("./_testCommon");
const { UnauthorizedError, BadRequestError } = require("../expressError");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /companies */

describe("POST /jobs", function () {
    const newJob = {
        title: "j4",
        salary: 90000,
        equity: 1,
        companyHandle: "c1",

    }

    test("not ok for anons", async function () {
        try {
            const resp = await request(app)
                .post("/jobs")
                .send(newJob)
            expect(resp.statusCode).toEqual(401);
        } catch (err) {
            expect(err instanceof UnauthorizedError).toBeTruthy()
        }

    });
    test("not ok for users", async function () {
        try {
            const resp = await request(app)
                .post("/jobs")
                .send(newJob)
                .set("authorization", `Bearer ${u1Token}`);
            expect(resp.statusCode).toEqual(401);
        } catch (err) {
            expect(err instanceof UnauthorizedError).toBeTruthy()
        }

    });

    test("ok for admins", async function () {
        const resp = await request(app)
            .post("/jobs")
            .send(newJob)
            .set("authorization", `Bearer ${u2Token}`);
        expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({
            job: {
                id: 4,
                title: 'j4',
                salary: 90000,
                equity: '1',
                companyHandle: 'c1'
            }
        });
    });

    test("bad request with missing title", async function () {
        try {
            const resp = await request(app)
                .post("/jobs")
                .send({
                    salary: 90000,
                    equity: 1,
                    companyHandle: "johnnies-testers",

                })
                .set("authorization", `Bearer ${u2Token}`);
            expect(resp.statusCode).toEqual(400);
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy()
        }

    });
    test("bad request with missing companyHandle", async function () {
        try {
            const resp = await request(app)
                .post("/jobs")
                .send({
                    title: "j4",
                    salary: 90000,
                    equity: 1
                })
                .set("authorization", `Bearer ${u2Token}`);
            expect(resp.statusCode).toEqual(400);
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy()
        }

    });

    test("bad request with invalid data: salary is str instead of int", async function () {
        const resp = await request(app)
            .post("/companies")
            .send({
                title: "j4",
                salary: "90000",
                equity: 1,
                companyHandle: "johnnies-testers",

            })
            .set("authorization", `Bearer ${u2Token}`);
        expect(resp.statusCode).toEqual(400);
    });
});

/************************************** GET /companies */

describe("GET /jobs", function () {
    test("ok for anon/no filters", async function () {
        const resp = await request(app).get("/jobs");
        expect(resp.body).toEqual({
            jobs:
                [
                    {
                        id: 1,
                        title: "j1",
                        salary: 50000,
                        equity: "0",
                        companyHandle: "c1",

                    },
                    {
                        id: 2,
                        title: "j2",
                        salary: 75000,
                        equity: "1",
                        companyHandle: "c2",

                    },
                    {
                        id: 3,
                        title: "j3",
                        salary: 125000,
                        equity: "0",
                        companyHandle: "c3",

                    },
                ],
        });
    });

    test("works: all filters", async function () {
        const resp = await request(app)
            .get("/jobs")
            .query({
                title: "3",
                minSalary: 125000,
                hasEquity: false
            })

        expect(resp.body).toEqual({
            jobs: [{
                id: 3,
                title: "j3",
                salary: 125000,
                equity: "0",
                companyHandle: "c3",

            }]
        })
    })

    test("works: title", async function () {
        const resp = await request(app)
            .get("/jobs")
            .query({
                title: "2"
            })

        expect(resp.body).toEqual({
            jobs: [
                {
                    id: 2,
                    title: "j2",
                    salary: 75000,
                    equity: "1",
                    companyHandle: "c2",

                }
            ]
        })
    })
    test("works: minSalary", async function () {
        const resp = await request(app)
            .get("/jobs")
            .query({
                minSalary: "75000"
            })

        expect(resp.body).toEqual({
            jobs: [
                {
                    id: 2,
                    title: "j2",
                    salary: 75000,
                    equity: "1",
                    companyHandle: "c2",

                },
                {
                    id: 3,
                    title: "j3",
                    salary: 125000,
                    equity: "0",
                    companyHandle: "c3",

                }
            ]
        })
    })
    test("works: hasEquity = false", async function () {
        const resp = await request(app)
            .get("/jobs")
            .query({
                hasEquity: false
            })

        expect(resp.body).toEqual({
            jobs: [
                {
                    id: 1,
                    title: "j1",
                    salary: 50000,
                    equity: "0",
                    companyHandle: "c1",

                },
                {
                    id: 2,
                    title: "j2",
                    salary: 75000,
                    equity: "1",
                    companyHandle: "c2",

                },
                {
                    id: 3,
                    title: "j3",
                    salary: 125000,
                    equity: "0",
                    companyHandle: "c3",

                }
            ]
        })
    })
    test("works: hasEquity = true", async function () {
        const resp = await request(app)
            .get("/jobs")
            .query({
                hasEquity: true
            })

        expect(resp.body).toEqual({
            jobs: [
                {
                    id: 2,
                    title: "j2",
                    salary: 75000,
                    equity: "1",
                    companyHandle: "c2",

                }
            ]
        })
    })

    test("fails: test next() handler", async function () {
        // there's no normal failure event which will cause this route to fail ---
        // thus making it hard to test that the error-handler works with it. This
        // should cause an error, all right :)
        await db.query("DROP TABLE jobs CASCADE");
        const resp = await request(app)
            .get("/jobs")
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.statusCode).toEqual(500);
    });

    test("fails schema:inapropriate filter ", async function () {
        try {
            const resp = await request(app)
                .get("/jobs")
                .query(
                    {
                        inapropriate: 5
                    })
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy()
        }

    })

});

/************************************** GET /companies/:handle */

describe("GET /jobs/:id", function () {
    test("works for anon", async function () {
        const resp = await request(app).get(`/jobs/1`);
        expect(resp.body).toEqual({
            job: {
                id: 1,
                title: "j1",
                salary: 50000,
                equity: "0",
                companyHandle: "c1",

            }
        });
    });

    test("not found for no such job", async function () {
        const resp = await request(app).get(`/jobs/401`);
        expect(resp.statusCode).toEqual(404);
    });
});

/************************************** PATCH /companies/:handle */

describe("PATCH /jobs/:id", function () {
    test("works for admins", async function () {
        const resp = await request(app)
            .patch(`/jobs/1`)
            .send({
                title: "j1-new",
            })
            .set("authorization", `Bearer ${u2Token}`);
        expect(resp.body).toEqual({
            updatedJob: {
                id: 1,
                title: "j1-new",
                salary: 50000,
                equity: "0",
                companyHandle: "c1",

            }
        });
    });
    test("unauth for users", async function () {
        const resp = await request(app)
            .patch(`/jobs/1`)
            .send({
                title: "j1-new",
            })
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.statusCode).toEqual(401);
    });

    test("unauth for anon", async function () {
        const resp = await request(app)
            .patch(`/jobs/1`)
            .send({
                title: "j1-new",
            });
        expect(resp.statusCode).toEqual(401);
    });

    test("not found on no such job", async function () {
        const resp = await request(app)
            .patch(`/jobs/598`)
            .send({
                title: "new nope",
            })
            .set("authorization", `Bearer ${u2Token}`);
        expect(resp.statusCode).toEqual(404);
    });

    test("bad request on invalid data", async function () {
        const resp = await request(app)
            .patch(`/jobs/1`)
            .send({
                salary: "not-a-salary",
            })
            .set("authorization", `Bearer ${u2Token}`);
        expect(resp.statusCode).toEqual(400);
    });
});

/************************************** DELETE /jobs/:id */

describe("DELETE /jobs/:id", function () {
    test("works for admins", async function () {
        const resp = await request(app)
            .delete(`/jobs/1`)
            .set("authorization", `Bearer ${u2Token}`);
        expect(resp.body).toEqual({
            job: {
                id: "1",
                title: "j1",
                status: "deleted"
            }
        });
    });

    test("unauth for users", async function () {
        const resp = await request(app)
            .delete(`/jobs/1`)
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.statusCode).toEqual(401);
    });

    test("unauth for anon", async function () {
        const resp = await request(app)
            .delete(`/jobs/1`);
        expect(resp.statusCode).toEqual(401);
    });

    test("not found for no such job", async function () {
        const resp = await request(app)
            .delete(`/jobs/398`)
            .set("authorization", `Bearer ${u2Token}`);
        expect(resp.statusCode).toEqual(404);
    });
});
