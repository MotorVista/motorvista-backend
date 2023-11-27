import { vendorGetAllAction } from "./controller/VendorGetAllAction.js";
import { vendorGetByIdAction } from "./controller/VendorGetByIdAction.js";
import { carGetAllAction } from "./controller/CarGetAllAction.js";
import { carGetByIdAction } from "./controller/CarGetByIdAction.js";

export const AppRoutes = [
    {
        path: "/vendor",
        method: "get",
        action: vendorGetAllAction
    },
    {
        path: "/vendor/:id",
        method: "get",
        action: vendorGetByIdAction
    },
    {
        path: "/car",
        method: "get",
        action: carGetAllAction
    },
    {
        path: "/car/:id",
        method: "get",
        action: carGetByIdAction
    }
];