-- from the terminal run:
-- psql < air_traffic.sql

DROP DATABASE IF EXISTS air_traffic;

CREATE DATABASE air_traffic;

\c air_traffic


CREATE TABLE  passengers
(
  id SERIAL PRIMARY KEY 
  first_name TEXT NOT NULL
  last_name TEXT NOT NULL
)

CREATE TABLE  cities
(
  id SERIAL PRIMARY KEY 
  city TEXT NOT NULL
)

CREATE TABLE  countries
(
  id SERIAL PRIMARY KEY 
  country TEXT NOT NULL
)

CREATE TABLE  airlines
(
  id SERIAL PRIMARY KEY 
  airline TEXT NOT NULL

)

CREATE TABLE tickets
(
  id SERIAL PRIMARY KEY,
  passenger INTEGER REFERENCES passengers,
  seat INTEGER NOT NULL,
  departure TIMESTAMP NOT NULL,
  arrival TIMESTAMP NOT NULL,
  airline INTEGER REFERENCES airlines,
  from_city INTEGER REFERENCES cities,
  from_country INTEGER REFERENCES countries,
  to_city INTEGER REFERENCES cities,
  to_country INTEGER REFERENCES countries
);

