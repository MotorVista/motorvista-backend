import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";

dotenv.config();

const app: Express = express();
app.get("/", async (req: Request, res: Response) => {
    res.send("Hello World from TS Node Express!");
});

app.get("/test", async (req: Request, res: Response) => {
    res.send("A test route!");
});

app.listen(3000);
