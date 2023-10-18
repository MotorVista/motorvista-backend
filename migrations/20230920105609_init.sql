-- +goose Up
-- +goose StatementBegin
CREATE SCHEMA omnicars;

CREATE TYPE omnicars.role AS ENUM('USER', 'ADMIN');

CREATE TABLE omnicars.user (
    id SERIAL PRIMARY KEY UNIQUE,
    email VARCHAR NOT NULL UNIQUE,
    fisrt_name VARCHAR NOT NULL,
    last_name VARCHAR,
    role omnicars.role NOT NULL DEFAULT('USER')
);

CREATE TABLE omnicars.vendor (
    id SERIAL PRIMARY KEY UNIQUE,
    title VARCHAR NOT NULL UNIQUE
);

CREATE TYPE omnicars.gearbox_type AS ENUM('MANUAL', 'AUTOMATIC');
CREATE TYPE omnicars.fuel_type AS ENUM('GASOLINE', 'DIESEL', 'ELECTRIC');
CREATE TYPE omnicars.engine_config AS ENUM('INLINE', 'V', 'BOXER');

CREATE TABLE omnicars.engine (
    id SERIAL PRIMARY KEY UNIQUE,
    model VARCHAR NOT NULL UNIQUE,
    vendor INT NOT NULL,

    power FLOAT NOT NULL, -- потужність
    power_per_litre FLOAT,
    fuel omnicars.fuel_type NOT NULL, -- тип палива
    max_rev INT NOT NULL, -- макс. оберти
    torque FLOAT, -- крутний момент
    config omnicars.engine_config, -- конфігурація
    cylinders SMALLINT, -- кількість циліндрів
    bore FLOAT, -- діаметр (поршня)
    stroke FLOAT, -- хід (поршня)
    compression_ratio FLOAT, -- ступінь стиснення

    CONSTRAINT engine_vendor
        FOREIGN KEY(vendor) REFERENCES omnicars.vendor(id)
);

CREATE TABLE omnicars.car (
    id SERIAL PRIMARY KEY UNIQUE,
    model VARCHAR NOT NULL,
    variation VARCHAR,
    vendor INT NOT NULL,
    year SMALLINT NOT NULL,

    engine INT NOT NULL,

    max_weight FLOAT NOT NULL,
    max_load FLOAT NOT NULL,
    max_speed FLOAT NOT NULL,
    fuel_capacity FLOAT NOT NULL,
    gearbox_type omnicars.gearbox_type NOT NULL,
    gearbox_number INT,

    CONSTRAINT car_vendor
        FOREIGN KEY(vendor) REFERENCES omnicars.vendor(id),
    
    CONSTRAINT car_engine
        FOREIGN KEY(engine) REFERENCES omnicars.engine(id)
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE omnicars.user;
DROP TABLE omnicars.car;
DROP TYPE omnicars.role;
DROP TYPE omnicars.engine_config;
DROP TYPE omnicars.gearbox_type;
DROP TYPE omnicars.fuel_type;
DROP TABLE omnicars.engine;
DROP TABLE omnicars.vendor;

DROP SCHEMA omnicars;
-- +goose StatementEnd
