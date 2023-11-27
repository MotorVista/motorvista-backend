import { Column, Entity, PrimaryGeneratedColumn, OneToMany, Relation } from "typeorm";
import { Car } from "./Car.js";

@Entity()
export class Vendor {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @OneToMany(() => Car, (car) => car.vendor)
    cars: Relation<Car[]>
}