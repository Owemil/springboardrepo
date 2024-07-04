const express = require("express");
const router = new express.Router()
const db = require('../db')
const ExpressError = require("../expressError")

router.get("/", async (req, res) => {
    const results = db.query(`SELECT id, comp_code FROM invoices`)
    return res.status(200).json({ invoices: results.rows })
})
router.get("/:id", async (req, res) => {
    try {
        let id = req.params.id;

        const result = await db.query(
            `SELECT i.id, 
                      i.comp_code, 
                      i.amt, 
                      i.paid, 
                      i.add_date, 
                      i.paid_date, 
                      c.name, 
                      c.description 
               FROM invoices AS i
                 INNER JOIN companies AS c ON (i.comp_code = c.code)  
               WHERE id = $1`,
            [id]);

        if (result.rows.length === 0) {
            throw new ExpressError(`No such invoice: ${id}`, 404);
        }

        const data = result.rows[0];
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

        return res.json({ "invoice": invoice });
    }

    catch (err) {
        return next(err);
    }
})
router.post("/", async (req, res) => {
    const { comp_code } = req.body
    const { amt } = req.body
    const results = await db.query(`INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) RETURNING *`, [comp_code, amt])

    res.status(201).json(results.rows[0])
})
router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { amt } = req.body
        const results = await db.query(
            `UPDATE invoices SET amt = $1
        WHERE id = $2
        RETURNING *`, [amt, id])
        if (!results.rows[0]) throw new ExpressError("invoice not found", 404)
        return res.json({ invoice: results.rows[0] })
    } catch (err) {
        return next(err)
    }

})
router.delete("/:id", async (req, res) => {
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