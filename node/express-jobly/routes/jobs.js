"use strict";

/** Routes for companies. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureLoggedIn, ensureAdmin } = require("../middleware/auth");
const Job = require("../models/job");

const jobNewSchema = require("../schemas/jobNew.json");
const jobUpdateSchema = require("../schemas/jobUpdate.json");
const jobSearchSchema = require("../schemas/jobSearchSchema.json");
const { json } = require("body-parser");

const router = new express.Router();

/** POST / { job } =>  { job }
 *
 * job should be { title,
                salary,
                equity,
                companyHandle }
 *
 * Returns { id, title, salary, equity, company_handle }
 *
 * Authorization: Admin 
 */
router.post("/", [ensureLoggedIn, ensureAdmin], async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, jobNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const job = await Job.create(req.body);
        return res.status(201).json({ job });
    } catch (err) {
        return next(err)
    }
})

/**GET / {searchFilters} => {jobs}
 *  gets all jobs based off searchFilters or nothing
 * 
 * searchFilters: {
 * title:string,
 * minSalary:integer,
 * hasEquity:boolean
 * }
 * 
 * returns {jobs: [{id, title, salary, equity, company_handle},...]}
 * 
 */

router.get("/", async function (req, res, next) {
    try {
        const q = req.query;
        console.log(q.hasEquity)
        if (q.minSalary !== undefined) q.minSalary = +q.minSalary;
        if (q.hasEquity !== undefined) q.hasEquity = q.hasEquity === "true";
        const validator = jsonschema.validate(q, jobSearchSchema)

        // console.log(validator.valid)
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack)
            throw new BadRequestError(errs)
        }
        const jobs = await Job.getAll(q)
        return res.json({ jobs: jobs })
    } catch (err) {
        return next(err)
    }
})

/**GET /:title
 * 
 * return one or more jobs based on title
 * 
 * if no jobs with that title a notFoundError is raised
 * 
 * returns ([{id, title, salary, equity, company_handle},...])
 */

router.get("/:id", async function (req, res, next) {
    try {
        const job = await Job.get(req.params.id)
        return res.json({ job })
    } catch (err) {
        return next(err)
    }
})

/**PATCH /:id
 * 
 * update fully or partially {
 * title:string,
 * salary:integer,
 * equity:integer
 * }
 * 
 * returns {id,
            title,
            salary,
            equity,
            company_handle}
 * Authorization: Admin
 */

router.patch("/:id", [ensureLoggedIn, ensureAdmin], async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, jobUpdateSchema)
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack)
            throw new BadRequestError(errs)
        }

        const updatedJob = await Job.update(req.params.id, req.body)
        return res.json({ updatedJob })
    } catch (err) {
        return next(err)
    }
})

/**DELETE /:id
 * 
 * deletes job based on id
 * 
 * returns {job: {
            id: 1,
            title: "leak prevention specialist",
            status: "deleted"
        }}
 * Authorization: Admin
 */

router.delete("/:id", [ensureLoggedIn, ensureAdmin], async function (req, res, next) {
    try {
        const job = await Job.remove(req.params.id)
        return res.json({ job })
    } catch (err) {
        return next(err)
    }
})

module.exports = router;