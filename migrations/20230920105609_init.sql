-- +goose Up
-- +goose StatementBegin
CREATE SCHEMA motorvista;

CREATE TYPE motorvista.role AS ENUM('USER', 'ADMIN');

CREATE TABLE motorvista.user (
    id SERIAL PRIMARY KEY UNIQUE,
    email VARCHAR NOT NULL UNIQUE,
    fisrt_name VARCHAR NOT NULL,
    last_name VARCHAR,
    role motorvista.role NOT NULL DEFAULT('USER')
);

CREATE TABLE motorvista.vendor (
    id SERIAL PRIMARY KEY UNIQUE,
    title VARCHAR NOT NULL UNIQUE
);

CREATE TYPE motorvista.transmission_type AS ENUM('MANUAL', 'AUTOMATIC', 'CVT');
CREATE TYPE motorvista.fuel_type AS ENUM('GASOLINE', 'DIESEL', 'HYBRID', 'ELECTRIC');

CREATE TABLE motorvista.engine (
    id SERIAL PRIMAERY KEY UNIQUE,
    model VARCHAR NOT NULL UNIQUE,
    vendor INT NOT NULL,
    power INT NOT NULL UNSIGNED,
    fuel motorvista.fuel_type NOT NULL,
    max_rev INT NOT NULL UNSIGNED,
    torque SMALLINT NOT NULL UNSIGNED,
    cylinders SMALLINT NOT NULL UNSIGNED,
    bore FLOAT NOT NULL,
    stroke FLOAT NOT NULL,
    compression_rate FLOAT NOT NULL,

    CONSTRAINT engine_vendor
        FOREIGN KEY(vendor) REFERENCES motorvista.vendor(id)
);

CREATE TABLE motorvista.car (
    id SERIAL PRIMARY KEY UNIQUE,
    model VARCHAR NOT NULL UNIQUE,
    vendor INT NOT NULL,
    year SMALLINT NOT NULL UNSIGNED,
    engine INT NOT NULL,
    transmission motorvista.transmission_type NOT NULL,

    CONSTRAINT car_vendor
        FOREIGN KEY(vendor) REFERENCES motorvista.vendor(id),
    
    CONSTRAINT car_engine
        FOREIGN KEY(engine) REFERENCES motorvista.engine(id)
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE motorvista.user;
DROP TABLE motorvista.car;
DROP TYPE motorvista.role;
DROP TYPE motorvista.transmission_type;
DROP TYPE motorvista.fuel_type;
DROP TABLE motorvista.engine;
DROP TABLE motorvista.vendor;

DROP SCHEMA motorvista;
-- +goose StatementEnd
