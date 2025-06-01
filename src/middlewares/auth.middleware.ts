import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HTTPError } from "../utils/https.error";
import { onError } from "../utils/on-error";

const secret = process.env.JWT_SECRET!;

export async function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new HTTPError(401, "Token de autenticação ausente");
        }

        const [, token] = authHeader.split(" ");

        const decoded = jwt.verify(token, secret) as {
            id: string;
            email: string;
            nome: string;
            tipo: "M" | "T" | "F";
        };

        req.alunoLogado = {
            id: decoded.id,
            nome: decoded.nome,
            email: decoded.email,
            tipo: decoded.tipo,
        };

        next();
    } catch (error: any) {
        if (error.name === "JsonWebTokenError") {
            onError(new HTTPError(401, "Token inválido"), res);
        } else if (error.name === "TokenExpiredError") {
            onError(new HTTPError(401, "Token expirado"), res);
        } else {
            onError(error, res);
        }
    }
}
