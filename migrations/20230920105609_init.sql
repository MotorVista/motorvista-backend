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
CREATE TYPE omnicars.drive_wheel AS ENUM('FRONT', 'REAR', 'ALL');
CREATE TYPE omnicars.assist_brake AS ENUM('ABS');
CREATE TYPE omnicars.brake_type AS ENUM('VENTILATED', 'DISC');
CREATE TYPE omnicars.steer_config AS ENUM('LEFT', 'RIGHT');

CREATE TABLE omnicars.car (
    id SERIAL PRIMARY KEY UNIQUE,
    model VARCHAR NOT NULL,
    variation VARCHAR,
    vendor INT NOT NULL,
    year SMALLINT NOT NULL,

    -- загальна інформація
    acceleration FLOAT NOT NULL, -- seconds for 100km/h
    max_weight FLOAT NOT NULL, -- макс вага
    max_load FLOAT NOT NULL, -- макс навантаження
    max_speed FLOAT NOT NULL, -- макс швидкість
    fuel_consumption FLOAT NOT NULL, -- розхід палива
    fuel_capacity FLOAT NOT NULL, -- об'єм баку
    gearbox_type omnicars.gearbox_type NOT NULL, -- тип коробкі передач
    gearbox_number INT, -- число коробкі передач (gears)

    -- двигун
    engine_model VARCHAR, -- модель двигуна
    power FLOAT NOT NULL, -- потужність
    min_power_rpm FLOAT, -- мін. оберти для вказаної потужності
    max_power_rpm FLOAT NOT NULL, -- макс. оберти для вказаної потужності
    power_per_litre FLOAT, -- потужність на літр палива
    fuel omnicars.fuel_type NOT NULL, -- тип палива
    torque FLOAT, -- крутний момент
    min_torque_rpm FLOAT, -- мін. крутний момент
    max_torque_rpm FLOAT, -- макс. крутний момент
    config omnicars.engine_config, -- конфігурація
    cylinders SMALLINT, -- кількість циліндрів
    bore FLOAT, -- діаметр (поршня)
    stroke FLOAT, -- хід (поршня)
    compression_ratio FLOAT, -- ступінь стиснення

    -- колеса
    drive_wheel omnicars.drive_wheel NOT NULL, -- передній чи задний привод
    tire_width FLOAT, -- ширина колес
    tire_profile FLOAT, -- довжина покришки до диску
    tire_rim FLOAT, -- діаметр диску (в дюймах)
    wheel_width FLOAT, -- ширина колеса
    wheel_height FLOAT, -- довжина (висота) колеса
    -- тормоза
    front_brakes omnicars.brake_type NOT NULL, -- передні тормоза (тип)
    rear_brakes omnicars.brake_type NOT NULL, -- задні тормоза (тип)
    assist_brake omnicars.assist_brake, -- вспоміжна тормозна система (ручник)

    -- салон
    cabin_material VARCHAR, -- матеріал салону
    cabin_steer omnicars.steer_config NOT NULL, -- де руль
    cabin_seats SMALLINT NOT NULL, -- кількість місць в салоні
    cabin_sex_buff FLOAT,

    trunk_space_min FLOAT, -- мін. розмір багажнику
    trunk_space_max FLOAT NOT NULL, -- макс. розмір багажнику

    CONSTRAINT car_vendor
        FOREIGN KEY(vendor) REFERENCES omnicars.vendor(id)
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
DROP TABLE omnicars.vendor;

DROP SCHEMA omnicars;
-- +goose StatementEnd
