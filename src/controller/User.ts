import {Request, Response} from "express";
import {AppDataSource} from "../data-source.js";
import {User, UserRole} from "../entity/User.js";
import {UserSession} from "../user-session.js";
import {errors} from "../error.js";
import {checkAuth} from "../auth.js";
import {obscureEmail, validateEmail} from "../validate.js";
import bcrypt from "bcrypt";

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

    const repo = AppDataSource.getRepository(User);

    const existing = await repo.findOneBy({ email });
    if (existing) {
        throw errors.USER_ALREADY_EXISTS;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = repo.create({
        email, password: passwordHash, firstName, lastName, role: UserRole.USER
    });
    await repo.save(user);



    user.email = obscureEmail(user.email);
    delete user.password;
    res.json(user);
}