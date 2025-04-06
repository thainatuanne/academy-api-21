import { prismaClient } from "../database/prisma.client";
import { ToggleFaDto } from "../dtos/fas.dto";
import { HTTPError } from "../utils/https.error";
import { validate as isValidUid } from "uuid";

export class FasService {
    public async toggleFa({
        alunoFaId,
        alunoOriginalId,
    }: ToggleFaDto): Promise<string> {
        if (!isValidUid(alunoOriginalId)) {
            throw new HTTPError(400, "Identificar do aluno inválido");
        }

        if (alunoFaId === alunoOriginalId) {
            throw new HTTPError(409, "Um aluno não pode ser fã dele mesmo.");
        }

        const alunoOriginal = await prismaClient.aluno.findUnique({
            where: { id: alunoOriginalId },
        });

        if (!alunoOriginal) {
            throw new HTTPError(404, "Aluno não encontrado");
        }

        const registroExiste = await prismaClient.fa.findUnique({
            where: {
                alunoOriginalId_alunoFaId: {
                    alunoFaId,
                    alunoOriginalId,
                },
            },
        });

        if (registroExiste) {
            // se já existir, exclui
            const registroFa = await prismaClient.fa.delete({
                where: {
                    alunoOriginalId_alunoFaId: {
                        alunoFaId,
                        alunoOriginalId,
                    },
                },
                include: {
                    alunoFa: true,
                    alunoOriginal: true,
                },
            });

            return `O aluno ${registroFa.alunoFa.nome} deixou de ser fã do aluno ${registroFa.alunoOriginal.nome}`;
        }

        // se não existir, cadastrada
        const registroFa = await prismaClient.fa.create({
            data: {
                alunoFaId,
                alunoOriginalId,
            },
            include: {
                alunoFa: true,
                alunoOriginal: true,
            },
        });

        return `O aluno ${registroFa.alunoFa.nome} agora é fã do aluno ${registroFa.alunoOriginal.nome}`;
    }
}