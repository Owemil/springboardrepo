const express = require("express");
const router = new express.Router()
const db = require('../db')
const ExpressError = require("../expressError");

//get all industries and their copany code(s)
router.get("/", async (req, res, next) => {
    try {
        const results = await db.query(
            `SELECT ind.industry,
                    ci.comp_code
             FROM industries AS ind
             LEFT JOIN comp_ind AS ci ON (ind.code = ci.ind_code)
             GROUP BY ind.industry, ci.comp_code
             ORDER BY ind.industry`
        )
        if (results.rows == 0) throw new ExpressError(`industries Not Found`, 404)
        let industries = {}
        let rows = results.rows.length
        for (let i = 0; i < rows; i++) {
            let code = results.rows[i].comp_code
            let industry = results.rows[i].industry
            if (code == null) {
                industries[industry] = null
            } else if (industry in industries) {

                industries[industry].push(code)
            } else {
                industries[industry] = [code]
            }
        }
        return res.json({ industries })
    } catch (err) {
        next(err)
    }
})
// make new industry
router.post("/", async (req, res, next) => {
    try {
        const { code, industry } = req.body
        const results = await db.query(
            `INSERT INTO industries (code, industry)
             VALUES ($1, $2)
             RETURNING code, industry`, [code, industry]
        )
        return res.status(201).json({ industry: results.rows[0] })
    } catch (err) {
        next(err)
    }

})
//make new industry-company association
router.post("/:ind_code", async (req, res, next) => {
    try {
        const { ind_code } = req.params
        const { comp_code } = req.body
        const results = await db.query(
            `INSERT INTO comp_ind (comp_code, ind_code)
             VALUES ($1, $2)
             RETURNING comp_code, ind_code`, [comp_code, ind_code]
        )
        return res.status(201).json({ comp_ind: results.rows[0] })
    } catch (err) {
        next(err)
    }

})

module.exports = router;