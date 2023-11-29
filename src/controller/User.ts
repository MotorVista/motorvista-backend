import { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { errors } from "../error.js";
import { checkAuth } from "../auth.js";
import { validateEmail } from "../validate.js";

export async function userRegister(req: Request, res: Response) {
    if (checkAuth(req)) {
        throw errors.ALREADY_AUTHORIZED;
    }

    const { email, password, firstName, lastName } = req.body;
    if (!email || !password || !firstName || !lastName) {
        throw errors.INVALID_PARAMETER;
    }

    if (!validateEmail(email)) {
        throw errors.INVALID_PARAMETER;
    }

    res.end();
}