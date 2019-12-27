CREATE TABLE users
(
    id   INT UNIQUE PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

INSERT INTO users(id, name)
values (1, 'DEEDEE');

ALTER TABLE wines
    ADD COLUMN user_id INT REFERENCES users ("id") DEFAULT '1';