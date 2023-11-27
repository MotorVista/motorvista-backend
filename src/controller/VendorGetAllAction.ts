import { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Vendor } from "../entity/Vendor.js";

export async function vendorGetAllAction(req: Request, res: Response) {
    const vendorRepository = AppDataSource.getRepository(Vendor);
    const vendors = await vendorRepository.find();
    res.json(vendors);
}