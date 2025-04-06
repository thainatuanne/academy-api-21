import { NextFunction, Request, Response } from "express";
import { onError } from "../utils/on-error";
import { validate as isValidUid } from "uuid";
import { HTTPError } from "../utils/https.error";

export function validateUidFormatMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    try {
        const { id } = req.params;

        if (!isValidUid(id)) {
            throw new HTTPError(400, "Identificador inválido");
        }

        next();
    } catch (error) {
        onError(error, res);
    }
}