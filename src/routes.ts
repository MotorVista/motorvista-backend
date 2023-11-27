import { vendorGetAllAction } from "./controller/VendorGetAllAction.js";
import { vendorGetByIdAction } from "./controller/VendorGetByIdAction.js";

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
    }
];