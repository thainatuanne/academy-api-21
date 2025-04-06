import { prismaClient } from "../database/prisma.client";
import { LoginDto } from "../dtos/auth.dto";
import { HTTPError } from "../utils/https.error";
import { v4 as randomUUID } from "uuid";

export class AuthService {
    public async loginAluno({ email, senha }: LoginDto): Promise<string> {
        const alunoEncontrado = await prismaClient.aluno.findUnique({
            where: { email, senha },
        });

        if (!alunoEncontrado) {
            throw new HTTPError(401, "Credenciais inválidas");
        }

        const token = randomUUID();

        await prismaClient.aluno.update({
            where: { id: alunoEncontrado.id },
            data: { authToken: token },
        });

        return token;
    }

    public async logoutAluno(alunoId: string): Promise<void> {
        await prismaClient.aluno.update({
            where: { id: alunoId },
            data: { authToken: null },
        });
    }
}