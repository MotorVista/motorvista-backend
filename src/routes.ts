import { vendorGetAllAction } from "./controller/VendorGetAllAction.js";

export const AppRoutes = [
    {
        path: "/vendor",
        method: "get",
        action: vendorGetAllAction
    }
];