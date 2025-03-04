-- both test users have the password "password"

INSERT INTO users (username, password, first_name, last_name, email, zip_code, is_admin)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'joel@joelburton.com',
        98466,
        FALSE),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        'joel@joelburton.com',
        98466,
        TRUE);

INSERT INTO favPets (username, pet_id, pet_name, pet_pic)
VALUES ('testuser',
        '1',
        'Charlie',
        'https://dog.tinyeye.com'),
       ('testadmin',
        '2',
        'Bubbles',
        'https://dog.tinyeye.com');

INSERT INTO favOrgs (username, org_id, org_name, org_url, org_contact)
VALUES ('testuser',
        '1',
        'Tacoma Humane Society',
        'www.rescue.com',
        'contact@email.com'),
       ('testadmin',
        '2',
        'Seattle Rescue',
        'www.rescue.com',
        '123-456-7890');
