import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 255, unique: true })
    email: string

    @Column({ type: "varchar", length: 64 })
    password: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
    role: UserRole
}