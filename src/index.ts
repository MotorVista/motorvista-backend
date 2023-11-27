import dotenv from "dotenv";
import express, {Express, NextFunction, Request, Response} from "express";
import "express-async-errors";
import APIErrorHandler from './middleware/api-error-handler.js';
import { AppDataSource } from "./data-source.js";
import { AppRoutes } from "./routes.js";

AppDataSource.initialize().then(() => {
    app.listen(3000);
}).catch((e) => {
    console.log(e);
})

const app: Express = express();
AppRoutes.forEach((route) => {
    app[route.method](route.path, (request: Request, response: Response, next: NextFunction) => {
        route.action(request, response)
            .then(() => next())
            .catch(err => next(err));
    });
});

app.get("/", async (req: Request, res: Response) => {
    res.send("Hello World from TS Node Express!");
});

app.get("/test", async (req: Request, res: Response) => {
    res.send("A test route!");
});

import { errors } from "./error.js";
app.get("/error", async (req: Request, res: Response) => {
    throw errors.INVALID_PARAMETER;
});

app.use(APIErrorHandler);
