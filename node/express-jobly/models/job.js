"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for jobs. */

class Job {

    /** Create a job (from data), update db, return new job data.
   *
   * data should be { title, salary, equity, companyHandle }
   *
   * Returns { id, title, salary, equity, companyHandle }
   *
   * Throws BadRequestError if job already in database.
   * */

    static async create({ title, salary, equity, companyHandle }) {

        const result = await db.query(
            `INSERT INTO jobs
                 (title, salary, equity, company_handle)
                 VALUES ($1, $2, $3, $4)
                 RETURNING id, title, salary, equity, company_handle AS "companyHandle"`,
            [
                title,
                salary,
                equity,
                companyHandle
            ],
        );
        const job = result.rows[0];

        return job;
    }

    /** Find all jobs.
   * 
   * filter your search by adding one or all -> {
   * title:full or partial, case insensitive,
   * minSalary:integer,
   * hasEquity:boolean
   * }
   *
   * Returns [{ id, title, salary, equity, company_handle }, ...]
   * */

    static async getAll(searchFilters = {}) {
        let query = `SELECT id,
                        title,
                        salary,
                        equity,
                        company_handle AS "companyHandle"
                 FROM jobs`;
        let whereExpressions = [];
        let queryValues = [];

        const { title, minSalary, hasEquity } = searchFilters;

        // For each possible search term, add to whereExpressions and queryValues so
        // we can generate the right SQL
        if (title) {
            queryValues.push(`%${title}%`);
            whereExpressions.push(`title ILIKE $${queryValues.length}`);
        }

        if (minSalary !== undefined) {
            queryValues.push(minSalary);
            whereExpressions.push(`salary >= $${queryValues.length}`);
        }

        if (hasEquity === true) {
            queryValues.push(0);
            whereExpressions.push(`equity <> $${queryValues.length}`);
        }


        if (whereExpressions.length > 0) {
            query += " WHERE " + whereExpressions.join(" AND ");
        }

        // Finalize query and return results

        query += " ORDER BY title";
        const jobsRes = await db.query(query, queryValues);
        return jobsRes.rows;
    }

    /**get job by (id)
     * 
     * if not found, throws notFoundError
     */

    static async get(id) {
        const result = await db.query(
            `SELECT id,
                    title,
                    salary,
                    equity,
                    company_handle AS "companyHandle"
            FROM jobs
            WHERE id = $1 
            `, [id])

        if (!result.rows[0])
            throw new NotFoundError(`no job with id ${id}`)

        return result.rows[0]
    }

    /** Update job data with `data`.
       *
       * This is a "partial update" --- it's fine if data doesn't contain all the
       * fields; this only changes provided ones.
       *
       * Data can include: {id, title, salary, equity, companyHandle}
       *
       * Returns {id, title, salary, equity, companyHandle}
       *
       * Throws NotFoundError if not found.
       */

    static async update(id, data) {
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                companyHandle: "company_handle"
            });
        const handleVarIdx = "$" + (values.length + 1);

        const querySql = `UPDATE jobs 
                      SET ${setCols} 
                      WHERE id = ${handleVarIdx} 
                      RETURNING id,
                                title,
                                salary,
                                equity,
                                company_handle AS "companyHandle"`;
        const result = await db.query(querySql, [...values, id]);
        const job = result.rows[0];

        if (!job) throw new NotFoundError(`No job: ${id}`);

        return job;
    }

    /** Delete given job from database; returns undefined.
     *
     * Throws NotFoundError if job not found.
     **/

    static async remove(id) {
        const result = await db.query(
            `DELETE
           FROM jobs
           WHERE id = $1
           RETURNING id, title`,
            [id]);
        const job = result.rows[0];

        if (!job) throw new NotFoundError(`No job with id: ${id}`);
        return {
            id: `${id}`,
            title: `${result.rows[0].title}`,
            status: "deleted"
        }

    }
}

module.exports = Job;