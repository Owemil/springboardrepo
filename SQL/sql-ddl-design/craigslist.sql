-- from the terminal run:
-- psql < craigslist.sql

DROP DATABASE IF EXISTS craigslist;

CREATE DATABASE craigslist;

\c craigslist

CREATE TABLE regions 
(
    id SERIAL PRIMARY KEY
    region_name TEXT NOT NULL
)

CREATE TABLE categories
(
    id SERIAL PRIMARY KEY
    category TEXT NOT NULL
)

CREATE TABLE users
(
    id SERIAL PRIMARY KEY
    first_name TEXT NOT NULL
    last_name TEXT NOT NULL
    preffered_region INT REFERENCES regions
)

CREATE TABLE posts
(
    id SERIAL PRIMARY KEY
    title TEXT NOT NULL
    text TEXT 
    posted_by INT REFERENCES users
    category_id INT REFERENCES categories
    region_id INT REFERENCES regions
)
