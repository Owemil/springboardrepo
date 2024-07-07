\c biztime_test

DROP TABLE IF EXISTS invoices CASCADE;
DROP TABLE IF EXISTS companies CASCADE;
DROP TABLE IF EXISTS industries CASCADE;
DROP TABLE IF EXISTS comp_ind CASCADE;

CREATE TABLE companies (
    code text PRIMARY KEY,
    name text NOT NULL UNIQUE,
    description text
);

CREATE TABLE invoices (
    id serial PRIMARY KEY,
    comp_code text NOT NULL REFERENCES companies ON DELETE CASCADE,
    amt float NOT NULL,
    paid boolean DEFAULT false NOT NULL,
    add_date date DEFAULT CURRENT_DATE NOT NULL,
    paid_date date,
    CONSTRAINT invoices_amt_check CHECK ((amt > (0)::double precision))
);

CREATE TABLE industries (
  code text PRIMARY KEY,
  industry text NOT NULL UNIQUE
);

CREATE TABLE comp_ind (
  comp_code text NOT NULL REFERENCES companies ON DELETE CASCADE,
  ind_code text NOT NULL REFERENCES industries ON DELETE CASCADE,
  PRIMARY KEY(comp_code, ind_code)
);

INSERT INTO companies
  VALUES ('apple', 'Apple Computer', 'Maker of OSX.'),
         ('ibm', 'IBM', 'Big blue.'),
         ('mcrsft', 'Microsoft', 'Make of Windows OS'),
         ('crmbl', 'Crumbl', 'Maker of cookies'),
         ('tsla', 'Tesla', 'Make of electric stuff');

INSERT INTO invoices (comp_Code, amt, paid, paid_date)
  VALUES ('apple', 100, false, null),
         ('apple', 200, false, null),
         ('apple', 300, true, '2018-01-01'),
         ('ibm', 400, false, null),
         ('mcrsft', 3000, true, '2022-08-15'),
         ('crmbl', 8500, false, null),
         ('tsla', 60000, false, null);

INSERT INTO industries
  VALUES ('tech', 'Technology'),
         ('mnfct', 'Manufacturing'),
         ('rsrch', 'Research'),
         ('comp', 'Computer'),
         ('enrgy', 'Energy'),
         ('agri', 'Agriculture'),
         ('food', 'Food Industry');

INSERT INTO comp_ind
  VALUES ('apple','comp'),
         ('apple','tech'),
         ('tsla','rsrch'),
         ('tsla','enrgy'),
         ('crmbl','food');