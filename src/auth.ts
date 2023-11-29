import { Request, Response } from "express";
import { UserRole } from "./entity/User.js";

export function checkAuth(req: Request) {
    return req.session?.user;
}

export function checkRole(req: Request, role: UserRole) {
    if (!checkAuth(req)) {
        return false;
    }
}