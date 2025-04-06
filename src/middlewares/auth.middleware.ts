import { NextFunction, Request, Response } from "express";
import { onError } from "../utils/on-error";
import { HTTPError } from "../utils/https.error";
import { prismaClient } from "../database/prisma.client";
import { validate as isValidUid } from "uuid";

export async function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const bearerToken = req.headers.authorization;

        if (!bearerToken) {
            throw new HTTPError(401, "Token de autenticação ausente");
        }

        const [, token] = bearerToken.split(" ");

        // No nosso caso, o token deve ser no formato uuid
        if (!isValidUid(token)) {
            throw new HTTPError(400, "Token com formato inválido");
        }

        const alunoEncontrado = await prismaClient.aluno.findFirst({
            where: { authToken: token },
        });

        if (!alunoEncontrado) {
            throw new HTTPError(401, "Token inválido");
        }

        // adicionar novos dados na requisição
        req.alunoLogado = {
            id: alunoEncontrado.id,
            email: alunoEncontrado.email,
            nome: alunoEncontrado.nome,
        };

        next();
    } catch (error) {
        onError(error, res);
    }
}