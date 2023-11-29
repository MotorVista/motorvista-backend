import {Request} from "express";
import {UserSession} from "./user-session.js";
import {User, UserRole} from "./entity/User.js";
import {Route} from "./routes.js";
import {AppDataSource} from "./data-source.js";
import {errors} from "./error.js";

export function createSession(req: Request, user: User) {
    req.session.user = new UserSession(user.id, user.role);
}

export function destroySession(req: Request) {
    req.session.user = null;
    req.session.destroy(() => {});
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

// export function checkRole(req: Request, role: UserRole) {
//     if (!checkAuth(req)) {
//         return false;
//     }
// }
//
// export function checkRole(first: UserRole, second: UserRole) {
//     return first == UserRole.ADMIN || first == second;
// }

// export function checkRouteAuth(route: Route, req: Request) {
//     if (route.auth) {
//         const user = getCurrentUser(req);
//         if (!user) {
//             throw errors.UNAUTHORIZED;
//         }
//
//         if (!checkRole(user))
//     }
// }