CREATE TABLE wines (
  id       SERIAL PRIMARY KEY,
  type     VARCHAR NOT NULL,
  producer VARCHAR NOT NULL,
  year     INT NOT NULL,
  quantity INT NOT NULL,
  country  VARCHAR NOT NULL
)