CREATE
EXTENSION IF NOT EXISTS "uuid-ossp";

ALTER TABLE wines
DROP
COLUMN user_id;

ALTER TABLE users
DROP
COLUMN id;

ALTER TABLE users
    ADD COLUMN id TEXT NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4();

ALTER TABLE wines
    ADD COLUMN user_id VARCHAR(100) NULL;

UPDATE wines
set user_id = (SELECT id from users where name = 'DEEDEE');

ALTER TABLE wines
    ADD CONSTRAINT user_id_fk
        FOREIGN KEY (user_id)
            REFERENCES users (id);

ALTER TABLE wines ALTER COLUMN user_id SET NOT NULL;