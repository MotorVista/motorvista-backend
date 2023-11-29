import { Request, Response } from "express";
import { UserSession } from "./user-session.js";
import { User, UserRole } from "./entity/User.js";

export function createSession(req: Request, user: User) {
    req.session.user = new UserSession(user.id, user.role);
}

export function checkAuth(req: Request): boolean {
    return !!req.session?.user;
}

export function checkRole(req: Request, role: UserRole) {
    if (!checkAuth(req)) {
        return false;
    }
}