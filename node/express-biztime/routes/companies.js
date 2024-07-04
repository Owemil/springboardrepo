const express = require("express");
const router = new express.Router()
const db = require('../db')
const ExpressError = require("../expressError");

router.get("/", async (req, res, next) => {
    const result = await db.query(`SELECT code, name FROM companies`)

    res.status(200).json({ companies: result.rows })
})

router.get("/:code", async (req, res, next) => {
    try {
        const { code } = req.params
        const results = await db.query(
            `SELECT c.code,
        c.name,
        c.description,
        i.id, 
         i.comp_code, 
         i.amt, 
         i.paid, 
         i.add_date,
         i.paid_date
         FROM companies AS c
         INNER JOIN invoices AS i ON (c.code = i.comp_code)
         WHERE code = $1`, [code])

        const data = results.rows[0]
        if (!data) throw new ExpressError(`${code} Not Found`, 404)
        const company = {
            company: {
                code: data.code,
                name: data.name,
                description: data.description,
                invoice: {
                    id: data.id,
                    comp_code: data.comp_code,
                    amt: data.amt,
                    paid: data.paid,
                    add_date: data.add_Date,
                    paid_date: data.paid_date
                }
            }
        }
        return res.json(company)

    } catch (err) {
        return next(err)
    }


})

router.post("/", async (req, res, next) => {
    try {
        const { code, name, description } = req.body;
        const result = await db.query(
            `INSERT INTO companies (code, name, description) 
               VALUES ($1, $2, $3)
               RETURNING code, name, description`,
            [code, name, description]
        );
        if (!name) throw new ExpressError("Name is required", 400)
        return res.status(201).json({ company: result.rows[0] });
    } catch (err) {
        return next(err);
    }
})

router.patch("/:code", async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const { code } = req.params
        const result = await db.query(
            `UPDATE companies SET name=$1, description=$2
               WHERE code = $3
               RETURNING code, name, description`,
            [name, description, code]
        );
        if (!result.rows[0]) throw new ExpressError(`${code} Not Found`, 404)
        return res.json({ company: result.rows });
    } catch (err) {
        return next(err);
    }
})

router.delete("/:code", async (req, res, next) => {
    try {
        const { code } = req.params
        const results = await db.query(`DELETE FROM companies WHERE code = $1`, [code])
        if (results.rowCount == 0) throw new ExpressError(`${code} Not Found`, 404)
        return res.json({ status: `${code} DELETED!` })
    } catch (err) {
        return next(err)
    }

})

module.exports = router;