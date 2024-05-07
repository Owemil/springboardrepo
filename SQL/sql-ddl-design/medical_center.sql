-- from the terminal run:
-- psql < medical_center.sql

DROP DATABASE IF EXISTS medical_center;

CREATE DATABASE medical_center;

\c medical_center

CREATE TABLE hospitals
(
    id SERIAL PRIMARY KEY
    name TEXT NOT NULL
);

CREATE TABLE diseases
(
    id SERIAL PRIMARY KEY
    name TEXT NOT NULL
);

CREATE TABLE patients
(
    id SERIAL PRIMARY KEY
    first_name TEXT NOT NULL
    last_name TEXT NOT NULL
);

CREATE TABLE doctors
(
    id SERIAL PRIMARY KEY
    first_name TEXT NOT NULL
    last_name TEXT NOT NULL
    hospital_id INT REFERENCES hospitals
);

CREATE TABLE patients_diseases
(
    id SERIAL PRIMARY KEY
    patient_id INT REFERENCES patients
    disease_id INT REFERENCES diseases
);

CREATE TABLE patients_doctors
(
    id SERIAL PRIMARY KEY
    name TEXT NOT NULL
    patient_id INT REFERENCES patients
    doctor_id INT REFERENCES doctors
);