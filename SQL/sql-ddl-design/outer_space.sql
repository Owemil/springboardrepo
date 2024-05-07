-- from the terminal run:
-- psql < outer_space.sql

DROP DATABASE IF EXISTS outer_space;

CREATE DATABASE outer_space;

\c outer_space

CREATE TABLE planets
(
  id SERIAL PRIMARY KEY 
  planet TEXT NOT NULL
)

CREATE TABLE moons
(
  id SERIAL PRIMARY KEY 
  planet INTEGER REFERENCES planets
  moon(s) TEXT[] NOT NULL
)

CREATE TABLE galaxies
(
  id SERIAL PRIMARY KEY 
  galaxy TEXT NOT NULL
)

CREATE TABLE stars
(
  id SERIAL PRIMARY KEY 
  star TEXT NOT NULL
)

CREATE TABLE planet_orbits
(
  id SERIAL PRIMARY KEY,
  planet INTEGER REFERENCES planets,
  orbits_around INTEGER REFERENCES stars,
  orbital_period_in_years FLOAT NOT NULL,
  galaxy INTEGER REFERENCES galaxies,
  moon(s) INTEGER REFERENCES moons
  
);

