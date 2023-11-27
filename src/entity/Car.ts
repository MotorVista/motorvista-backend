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
    REAR = "REAR",
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

    @Column()
    model: string

    @Column()
    variation: string

    @ManyToOne(() => Vendor, (vendor) => vendor.cars)
    vendor: Relation<Vendor>

    @Column("smallint")
    year: number


    @Column({ type: "float", nullable: true })
    acceleration: number

    @Column({ type: "float", nullable: true })
    maxWeight: number

    @Column({ type: "float", nullable: true })
    maxLoad: number

    @Column({ type: "float", nullable: true })
    maxSpeed: number

    @Column({ type: "float", nullable: true })
    fuelConsumption: number

    @Column({ type: "float", nullable: true })
    fuelCapacity: number

    @Column({ type: "enum", enum: GearboxType })
    gearboxType: GearboxType

    @Column({ type: "int", nullable: true })
    gearboxNumber: number


    @Column()
    engineModel: string

    @Column("float")
    power: number

    @Column({ type: "float", nullable: true })
    minPowerRpm: number

    @Column("float")
    maxPowerRpm: number

    @Column("float")
    powerPerLitre: number

    @Column({ type: "enum", enum: FuelType })
    fuelType: FuelType

    @Column("float")
    torque: number

    @Column("float")
    minTorqueRpm: number

    @Column("float")
    maxTorqueRpm: number

    @Column({ type: "enum", enum: EngineConfig })
    config: EngineConfig

    @Column("smallint")
    cylinders: number

    @Column("float")
    bore: number

    @Column("float")
    stroke: number

    @Column("float")
    compressionRate: number


    @Column({ type: "enum", enum: DriveWheel })
    driveWheel: DriveWheel

    @Column({ type: "float", nullable: true })
    tireWidth: number

    @Column({ type: "float", nullable: true })
    tireProfile: number

    @Column({ type: "float", nullable: true })
    tireRim: number

    @Column({ type: "float", nullable: true })
    wheelWidth: number

    @Column({ type: "float", nullable: true })
    wheelHeight: number


    @Column({ type: "enum", enum: BrakeType })
    frontBrakes: BrakeType

    @Column({ type: "enum", enum: BrakeType })
    rearBrakes

    @Column({ type: "enum", enum: AssistBrake })
    assistBrake: AssistBrake


    @Column({ type: "varchar", nullable: true })
    cabinMaterial: string

    @Column({ type: "enum", enum: SteerConfig })
    cabinSteer: SteerConfig

    @Column("smallint")
    cabinSeats: number


    @Column({ type: "float", nullable: true })
    trunkSpaceMin: number

    @Column({ type: "float", nullable: true })
    trunkSpaceMax: number
}