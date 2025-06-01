import { Request, Response, NextFunction } from "express";
import { HTTPError } from "../utils/https.error";
import { onError } from "../utils/on-error";

export function autorizarPorTipo(tiposPermitidos: ("M" | "T" | "F")[]) {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            const tipo = req.alunoLogado?.tipo;

            if (!tiposPermitidos.includes(tipo)) {
                throw new HTTPError(403, "Acesso negado: tipo de aluno não autorizado");
            }

            next();
        } catch (error) {
            onError(error, res);
        }
    };
}