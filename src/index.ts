import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import "express-async-errors";
import APIErrorHandler from './middleware/api-error-handler.js';
import { AppDataSource } from "./data-source.js";

AppDataSource.initialize().then(() => {
    app.listen(3000);
}).catch((e) => {
    console.log(e);
})

const app: Express = express();

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
