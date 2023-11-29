import { Request, Response } from "express";
import { UserSession } from "./user-session.js";
import { UserRole } from "./entity/User.js";

export function createSession(req: Request, id: number, role: UserRole) {
    req.session.user = new UserSession(id, role);
}

export function checkAuth(req: Request): boolean {
    return !!req.session?.user;
}

export function checkRole(req: Request, role: UserRole) {
    if (!checkAuth(req)) {
        return false;
    }
}