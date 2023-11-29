import { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Vendor } from "../entity/Vendor.js";
import { errors } from "../error.js";

export async function vendorGetByIdAction(req: Request, res: Response) {
    const vendorRepository = AppDataSource.getRepository(Vendor);

    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        throw errors.INVALID_PARAMETER;
    }

    const vendor = await vendorRepository.findOneBy({ id });
    if (!vendor) {
        throw errors.NOT_FOUND;
    }

    res.json(vendor);
}