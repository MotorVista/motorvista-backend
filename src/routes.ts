import { Request, Response } from "express";
import { UserRole } from "./entity/User.js";
import { vendorGetAll, vendorGetById } from "./controller/Vendor.js";
import { carGetAll, carGetById } from "./controller/Car.js";
import { userRegister, userLogin, userGetLogin, userDeleteLogin } from "./controller/User.js";

type RouteAction = (req: Request, res: Response) => Promise<void>

export interface Route {
    path: string
    method: string
    action: RouteAction
    auth?: UserRole
}

export const AppRoutes: Route[] = [
    {
        path: "/vendor",
        method: "get",
        action: vendorGetAll
    },
    {
        path: "/vendor/:id",
        method: "get",
        action: vendorGetById
    },

    {
        path: "/car",
        method: "get",
        action: carGetAll
    },
    {
        path: "/car/:id",
        method: "get",
        action: carGetById
    },

    {
        path: "/register",
        method: "post",
        action: userRegister
    },
    {
        path: "/login",
        method: "post",
        action: userLogin
    },
    {
        path: "/login",
        method: "get",
        action: userGetLogin
    },
    {
        path: "/login",
        method: "delete",
        action: userDeleteLogin
    }
];