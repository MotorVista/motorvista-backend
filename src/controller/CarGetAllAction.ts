import { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Car } from "../entity/Car.js";

export async function carGetAllAction(req: Request, res: Response) {
    const carRepository = AppDataSource.getRepository(Car);
    const cars = await carRepository.find();
    res.json(cars);
}