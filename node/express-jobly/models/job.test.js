"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Job = require("./job.js");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
    const newJob = {
        title: "j4",
        salary: 90000,
        equity: "1",
        companyHandle: "c2",

    };

    test("works", async function () {
        let job = await Job.create(newJob);
        expect(job).toEqual({
            id: 4,
            title: "j4",
            salary: 90000,
            equity: "1",
            companyHandle: "c2",

        });

        const result = await db.query(
            `SELECT id, title, salary, equity, company_handle 
           FROM jobs
           WHERE id = 4`);
        expect(result.rows[0]).toEqual(
            {
                id: 4,
                title: "j4",
                salary: 90000,
                equity: "1",
                company_handle: "c2",
            },
        );
    });

});

/************************************** findAll */

describe("findAll", function () {
    test("works: no filter", async function () {
        let jobs = await Job.getAll();
        expect(jobs).toEqual([
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
        );
    });

    test("works: filter name", async function () {
        let jobs = await Job.getAll({ title: "j3" })
        expect(jobs).toEqual([{
            id: 3,
            title: "j3",
            salary: 125000,
            equity: "0",
            companyHandle: "c3",

        }])
    })
    test("works: filter minSalary", async function () {
        let jobs = await Job.getAll({ minSalary: 125000 })
        expect(jobs).toEqual([{
            id: 3,
            title: "j3",
            salary: 125000,
            equity: "0",
            companyHandle: "c3",

        }])
    })
    test("works: filter hasEquity", async function () {
        let jobs = await Job.getAll({ hasEquity: true })
        expect(jobs).toEqual([{
            id: 2,
            title: "j2",
            salary: 75000,
            equity: "1",
            companyHandle: "c2",

        }])
    })
    test("works: filter minSalary/hasEquity", async function () {
        let jobs = await Job.getAll({
            minSalary: 90000,
            hasEquity: false
        })
        expect(jobs).toEqual([{
            id: 3,
            title: "j3",
            salary: 125000,
            equity: "0",
            companyHandle: "c3",

        }])
    })

    test("works: filter title, minSalary, hasEquity", async function () {
        let jobs = await Job.getAll({
            minSalary: 90000,
            hasEquity: false,
            title: "j"
        })
        expect(jobs).toEqual([{
            id: 3,
            title: "j3",
            salary: 125000,
            equity: "0",
            companyHandle: "c3",

        }])
    })
});

/************************************** get */

describe("get", function () {
    test("works", async function () {
        let job = await Job.get("1");
        expect(job).toEqual({
            id: 1,
            title: "j1",
            salary: 50000,
            equity: "0",
            companyHandle: "c1",

        });
    });

    test("not found if no such job", async function () {
        try {
            await Job.get(20);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});
//
/************************************** update */

describe("update", function () {
    const updateData = {
        title: "gg",
        salary: 150000,
        equity: 0,

    };

    test("works", async function () {
        let job = await Job.update(3, updateData);
        expect(job).toEqual({
            id: 3,
            title: "gg",
            salary: 150000,
            equity: "0",
            companyHandle: "c3"
        }
        );

        const result = await db.query(
            `SELECT id, title, salary, equity, company_handle
           FROM jobs
           WHERE id = '3'`);
        expect(result.rows).toEqual([{
            id: 3,
            title: "gg",
            salary: 150000,
            equity: "0",
            company_handle: "c3"
        }]);
    });

    test("works: null fields", async function () {
        const updateDataSetNulls = {
            title: "new",
            salary: null,
            equity: null,

        };

        let job = await Job.update(3, updateDataSetNulls);
        expect(job).toEqual({
            id: 3,
            title: "new",
            salary: null,
            equity: null,
            companyHandle: "c3"
        }
        );

        const result = await db.query(
            `SELECT id, title, salary, equity, company_handle
           FROM jobs
           WHERE id = '3'`);
        expect(result.rows).toEqual([{
            id: 3,
            title: "new",
            salary: null,
            equity: null,
            company_handle: "c3"
        }]);
    });

    test("not found if no such job", async function () {
        try {
            await Job.update(300, updateData);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });

    test("bad request with no data", async function () {
        try {
            await Job.update(1, {});
            fail();
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });
});

/************************************** remove */

describe("remove", function () {
    test("works", async function () {
        await Job.remove(1);
        const res = await db.query(
            "SELECT title FROM jobs WHERE id='1'");
        expect(res.rows.length).toEqual(0);
    });

    test("not found if no such company", async function () {
        try {
            await Job.remove(10);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});
