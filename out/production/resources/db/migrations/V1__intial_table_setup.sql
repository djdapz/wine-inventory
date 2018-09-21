CREATE TABLE wines (
  id       SERIAL PRIMARY KEY,
  type     VARCHAR,
  producer VARCHAR,
  year     INT,
  quantity INT
)