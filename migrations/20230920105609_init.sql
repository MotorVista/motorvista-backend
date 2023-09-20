-- +goose Up
-- +goose StatementBegin
CREATE SCHEMA motorvista;

CREATE TYPE motorvista.role AS ENUM('USER', 'ADMIN');

CREATE TABLE motorvista.user (
    id  SERIAL PRIMARY KEY UNIQUE,
    email VARCHAR NOT NULL UNIQUE,
    fisrt_name VARCHAR NOT NULL,
    last_name VARCHAR,
    role motorvista.role NOT NULL DEFAULT('USER')
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE motorvista.user;
DROP TYPE motorvista.role;

DROP SCHEMA motorvista;
-- +goose StatementEnd
