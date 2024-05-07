-- from the terminal run:
-- psql < music.sql

DROP DATABASE IF EXISTS music;

CREATE DATABASE music;

\c music

CREATE TABLE producers 
(
  id SERIAL PRIMARY KEY
  producer TEXT NOT NULL
)

CREATE TABLE artists
(
  id SERIAL PRIMARY KEY
  artist TEXT NOT NULL
  producer_id INTEGER REFERENCES producers
)

CREATE TABLE albums
(
  id SERIAL PRIMARY KEY
  album TEXT NOT NULL
  artist_id INTEGER REFERENCES artists
)

CREATE TABLE songs
(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  duration_in_seconds INTEGER NOT NULL,
  release_date DATE NOT NULL,
  artist INTEGER REFERENCES artists,
  album INTEGER REFERENCES albums,
  producers INTEGER REFERENCES producers
);
