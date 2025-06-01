import { prismaClient } from "../database/prisma.client";
import { LoginDto } from "../dtos/auth.dto";
import { HTTPError } from "../utils/https.error";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET!;

export class AuthService {
    public async loginAluno({ email, senha }: LoginDto): Promise<string> {
        const alunoEncontrado = await prismaClient.aluno.findUnique({
            where: { email },
        });

        if (!alunoEncontrado) {
            throw new HTTPError(401, "Email ou senha inválidos");
        }

        const senhaCorreta = await bcrypt.compare(senha, alunoEncontrado.senha);

        if (!senhaCorreta) {
            throw new HTTPError(401, "Email ou senha inválidos");
        }

        const token = jwt.sign(
            {
                id: alunoEncontrado.id,
                nome: alunoEncontrado.nome,
                email: alunoEncontrado.email,
                tipo: alunoEncontrado.tipo,
            },
            secret,
            { expiresIn: "4h" }
        );

        return token;
    }

    public async logoutAluno(_alunoId: string): Promise<void> {
        // JWT não precisa de logout, a não ser que você use blacklist (opcional).
        return;
    }
}
