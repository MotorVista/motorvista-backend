import { vendorGetAll, vendorGetById } from "./controller/Vendor.js";
import { carGetAll, carGetById } from "./controller/Car.js";

export const AppRoutes = [
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
    }
];