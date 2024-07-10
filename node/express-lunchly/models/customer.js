/** Customer for Lunchly */

const db = require("../db");
const Reservation = require("./reservation");

/** Customer of the restaurant. */

class Customer {
  constructor({ id, firstName, lastName, phone, notes }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this._notes = notes;
  }

  /** find all customers. */

  static async all() {
    const results = await db.query(
      `SELECT id, 
         first_name AS "firstName",  
         last_name AS "lastName", 
         phone, 
         notes
       FROM customers
       ORDER BY last_name, first_name`
    );
    return results.rows.map(c => new Customer(c));
  }

  /** get a customer by ID. */

  static async get(id) {
    const results = await db.query(
      `SELECT id, 
         first_name AS "firstName",  
         last_name AS "lastName", 
         phone, 
         notes 
        FROM customers WHERE id = $1`,
      [id]
    );

    const customer = results.rows[0];

    if (customer === undefined) {
      const err = new Error(`No such customer: ${id}`);
      err.status = 404;
      throw err;
    }

    return new Customer(customer);
  }

  // search for customer by name

  static async search(name) {
    const split = name.split(" ")
    const fname = split[0][0].toUpperCase() + split[0].substring(1)
    const lname = split[1][0].toUpperCase() + split[1].substring(1)
    const results = await db.query(
      `SELECT id, 
         first_name AS "firstName",  
         last_name AS "lastName", 
         phone, 
         notes 
        FROM customers WHERE first_name = $1 AND last_name = $2`,
      [fname, lname])

    const customer = results.rows[0]

    if (customer === undefined) {
      const err = new Error(`No such customer: ${fname} ${lname}`);
      err.status = 404;
      throw err;
    }

    return new Customer(customer)
  }

  // Search for 10 best customers

  static async bestCustomers() {

    try {
      const results = await db.query(
        `SELECT c.id,
         c.first_name AS "firstName",
          c.last_name AS "lastName",
          COUNT(r.id)
          FROM customers AS c 
          INNER JOIN reservations AS r ON(c.id = r.customer_id)
          GROUP BY c.id 
          ORDER BY COUNT(r.id) DESC LIMIT 10`)

      if (results.rows === undefined) {
        const err = new Error(`Can't fetch customers`);
        err.status = 404;
        throw err
      };
      return results.rows.map(c => new Customer(c))
    } catch (err) {
      return next(err)
    }


  }

  /** get all reservations for this customer. */

  async getReservations() {
    return await Reservation.getReservationsForCustomer(this.id);
  }

  /** save this customer. */

  async save() {
    if (this.id === undefined) {
      const result = await db.query(
        `INSERT INTO customers (first_name, last_name, phone, notes)
             VALUES ($1, $2, $3, $4)
             RETURNING id`,
        [this.firstName, this.lastName, this.phone, this.notes]
      );
      this.id = result.rows[0].id;
    } else {
      await db.query(
        `UPDATE customers SET first_name=$1, last_name=$2, phone=$3, notes=$4
             WHERE id=$5`,
        [this.firstName, this.lastName, this.phone, this.notes, this.id]
      );
    }
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }

  get notes() {
    return this._notes
  }
  set notes(val) {
    if (val == false) {
      this._notes = ""
    } else {
      this._notes = val
    }
  }


}

module.exports = Customer;