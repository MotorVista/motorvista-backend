import express, { Express, Request, Response } from "express";

const app: Express = express();
app.get("/", (req: Request, res: Response) => {
    res.send("Hello World from TS Node Express!");
});

app.listen(3000);
