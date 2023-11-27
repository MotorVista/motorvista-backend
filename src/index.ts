import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
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
