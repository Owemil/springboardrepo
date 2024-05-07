-- from the terminal run:
-- psql < soccer_league.sql

DROP DATABASE IF EXISTS soccer_league;

CREATE DATABASE soccer_league;

\c soccer_league

CREATE TABLE countries 
(
    id SERIAL PRIMARY KEY
    country TEXT NOT NULL
)

CREATE TABLE teams 
(
    id SERIAL PRIMARY KEY
    team_name TEXT NOT NULL
    country_id INT REFERENCES countries
)

CREATE TABLE players 
(
    id SERIAL PRIMARY KEY
    country TEXT NOT NULL
    team_id INT REFERENCES teams
)

CREATE TABLE referees 
(
    id SERIAL PRIMARY KEY
    ref_name TEXT NOT NULL
)

CREATE TABLE games
(
    id SERIAL PRIMARY KEY
    date_time TIMESTAMP 
    team1 INT REFERENCES teams
    team2 INT REFERENCES teams
    ref1 INT REFERENCES referees
    ref2 INT REFERENCES referees
    ref3 INT REFERENCES referees
)

CREATE TABLE goals 
(
    id SERIAL PRIMARY KEY
    player_id INT REFERENCES players
    game_id INT REFERENCES games
    
)

