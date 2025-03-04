CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),

  zip_code INTEGER,

  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);


CREATE TABLE favPets (
  username VARCHAR(25) NOT NULL
    REFERENCES users ON DELETE CASCADE,
  pet_id INTEGER PRIMARY KEY,
  pet_name TEXT NOT NULL,
  pet_pic TEXT
);


CREATE TABLE favOrgs (
 username VARCHAR(25) NOT NULL
    REFERENCES users ON DELETE CASCADE,
  org_id INTEGER PRIMARY KEY,
  org_name TEXT NOT NULL,
  org_url TEXT NOT NULL,
  org_contact TEXT NOT NULL
);


