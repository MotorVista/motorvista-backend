import { Request, Response, NextFunction } from 'express';
import { APIError, errors } from "../error.js";

export default function(err, req: Request, res: Response, next: NextFunction): void {
    if (err instanceof APIError) {
        res.json(err.toJson());
    } else {
        console.log(err.toString());
        res.json(errors.UNKNOWN_ERROR);
    }

    next(err);
}