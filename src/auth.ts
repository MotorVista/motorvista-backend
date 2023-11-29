import { Request, Response } from "express";
import { UserSession } from "./user-session.js";
import { User, UserRole } from "./entity/User.js";
import {AppDataSource} from "./data-source.js";

export function createSession(req: Request, user: User) {
    req.session.user = new UserSession(user.id, user.role);
}

export function checkAuth(req: Request): boolean {
    return !!req.session?.user;
}

export async function getCurrentUser(req: Request) {
    if (!checkAuth(req)) {
        return null;
    }

    const repo = AppDataSource.getRepository(User);
    return await repo.findOneBy({ id: req.session.user.id });
}

export function checkRole(req: Request, role: UserRole) {
    if (!checkAuth(req)) {
        return false;
    }
}