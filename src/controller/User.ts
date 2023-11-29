import {Request, Response} from "express";
import {AppDataSource} from "../data-source.js";
import {User, UserRole} from "../entity/User.js";
import {errors} from "../error.js";
import {checkAuth, createSession} from "../auth.js";
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
    let user = repo.create({
        email, password: passwordHash, firstName, lastName, role: UserRole.USER
    });
    await repo.save(user);

    // figure out newly created user's id
    user = await repo.findOneBy({ email });
    if (!user) {
        throw errors.FAILED;
    }

    // create http session
    createSession(req, user);

    user.email = obscureEmail(user.email);
    delete user.password;
    res.json(user);
}

export async function userLogin(req: Request, res: Response) {
    if (checkAuth(req)) {
        throw errors.ALREADY_AUTHORIZED;
    }

    const { email, password } = req.body;
    if (!email || !password) {
        throw errors.INVALID_PARAMETER;
    }

    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOneBy({ email });
    if (!user) {
        throw errors.USER_NOT_FOUND;
    }

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
        throw errors.INVALID_PASSWORD;
    }

    createSession(req, user);

    user.email = obscureEmail(user.email);
    delete user.password;
    res.json(user);
}