import dotenv from "dotenv";
import express, {Express, NextFunction, Request, Response} from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import sessions from "express-session";
import "express-async-errors";
import APIErrorHandler from './middleware/api-error-handler.js';
import { UserSession } from "./user-session.js";
import { AppDataSource } from "./data-source.js";
import { AppRoutes } from "./routes.js";

declare module 'express-session' {
    interface SessionData {
        user: UserSession
    }
}

AppDataSource.initialize().then(() => {
    dotenv.config();
    const app: Express = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(sessions({
        secret: process.env.SESSION_SECRET,
        cookie: { maxAge: 24 * 60 * 60 * 1000 },
        saveUninitialized: true,
        resave: false
    }));

    AppRoutes.forEach((route) => {
        app[route.method](route.path, (req: Request, res: Response, next: NextFunction) => {
            // check auth

            route.action(req, res)
                .then(() => next())
                .catch(err => next(err));
        });
    });

    app.use(APIErrorHandler);

    app.listen(3000);
}).catch((e) => {
    console.log(e);
})
