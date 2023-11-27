import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, Relation } from "typeorm";
import { Vendor } from "./Vendor.js";

export enum GearboxType {
    MANUAL = "MANUAL",
    AUTOMATIC = "AUTOMATIC"
}

export enum FuelType {
    GASOLINE = "GASOLINE",
    DIESEL = "DIESEL",
    ELECTRIC = "ELECTRIC"
}

export enum EngineConfig {
    INLINE = "INLINE",
    V = "V",
    BOXER = "BOXER"
}

export enum DriveWheel {
    FRONT = "FRONT",
    NEAR = "NEAR",
    ALL = "ALL"
}

export enum AssistBrake {
    ABS = "ABS"
}

export enum BrakeType {
    VENTILATED = "VENTILATED",
    DISC = "DISC"
}

export enum SteerConfig {
    LEFT = "LEFT",
    RIGHT = "RIGHT"
}

@Entity()
export class Car {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Vendor, (vendor) => vendor.cars)
    vendor: Relation<Vendor>
}