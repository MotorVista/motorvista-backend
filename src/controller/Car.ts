import { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Car } from "../entity/Car.js";
import { errors } from "../error.js";

export async function carGetAll(req: Request, res: Response) {
    const carRepository = AppDataSource.getRepository(Car);
    const cars = await carRepository.find();
    res.json(cars);
}

export async function carGetById(req: Request, res: Response) {
    const carRepository = AppDataSource.getRepository(Car);

    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        throw errors.INVALID_PARAMETER;
    }

    const car = await carRepository.findOneBy({ id });
    if (!car) {
        throw errors.NOT_FOUND;
    }

    res.json(car);
}