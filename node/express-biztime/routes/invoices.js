const express = require("express");
const router = new express.Router()
const db = require('../db')
const ExpressError = require("../expressError")
const date = require('date-and-time')
//get all invoices
router.get("/", async (req, res) => {
    const results = await db.query(`SELECT id, comp_code FROM invoices`)
    return res.status(200).json({ invoices: results.rows })
})
// get single invoice and company data
router.get("/:id", async (req, res, next) => {
    try {
        let { id } = req.params;
        const results = await db.query(
            `SELECT i.id, 
                    i.comp_code, 
                    i.amt, 
                    i.paid, 
                    i.add_date, 
                    i.paid_date, 
                    c.name, 
                    c.description 
                FROM invoices AS i
                LEFT JOIN companies AS c ON (i.comp_code = c.code)  
                WHERE id = $1`, [id]);

        if (results.rows.length === 0) {
            throw new ExpressError(`No such invoice: ${id}`, 404);
        }

        const data = results.rows[0];
        const invoice = {
            id: data.id,
            company: {
                code: data.comp_code,
                name: data.name,
                description: data.description,
            },
            amt: data.amt,
            paid: data.paid,
            add_date: data.add_date,
            paid_date: data.paid_date,
        };

        return res.json({ invoice: invoice });
    }

    catch (err) {
        return next(err);
    }
})
//create new invoice
router.post("/", async (req, res) => {
    try {
        const { comp_code } = req.body
        const { amt } = req.body
        const results = await db.query(
            `INSERT INTO invoices (comp_code, amt) 
            VALUES ($1, $2) 
            RETURNING *`, [comp_code, amt])

        res.status(201).json(results.rows[0])
    } catch (err) {
        return next(err)
    }

})
//update existing invoice
router.patch("/:id", async (req, res, next) => {
    try {
        const { id } = req.params
        const { amt, paid } = req.body
        console.log(paid)
        const paid_date = date.format(new Date(), 'YYYY/MM/DD')
        if (!paid) {
            const results = await db.query(
                `UPDATE invoices SET amt = $1
                WHERE id = $2
                RETURNING *`, [amt, id])
            if (!results.rows[0]) throw new ExpressError("invoice not found", 404)
            return res.json({ invoice: results.rows[0] })
        }
        if (paid == "f") {
            const results = await db.query(
                `UPDATE invoices SET amt = $1, paid = $2, paid_date = $3
                WHERE id = $4
                RETURNING *`, [amt, paid, null, id])
            if (!results.rows[0]) throw new ExpressError("invoice not found", 404)
            return res.json({ invoice: results.rows[0] })
        }
        if (paid == "t") {
            const results = await db.query(
                `UPDATE invoices SET amt = $1, paid = $2, paid_date = $3
                WHERE id = $4
                RETURNING *`, [amt, paid, paid_date, id])
            if (!results.rows[0]) throw new ExpressError("invoice not found", 404)
            return res.json({ invoice: results.rows[0] })
        }


    } catch (err) {
        return next(err)
    }

})
// delete existing invoice
router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params
        const results = db.query(`DELETE FROM invoices WHERE id = $1`, [id])
        if (results.rowCount == 0) throw new ExpressError(`invoice Not Found`, 404)
        return res.json({ status: `DELETED!` })
    } catch (err) {
        return next(err)
    }

})

module.exports = router;