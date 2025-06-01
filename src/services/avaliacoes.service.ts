import { prismaClient } from "../database/prisma.client";
import { HTTPError } from "../utils/https.error";
import {
    AtualizarAvaliacaoDTO,
    CriarAvaliacaoDTO,
    DeletarAvaliacaoDTO,
    ListarAvaliacaoPorAlunoDTO,
} from "../dtos/avaliacao.dto";

export class AvaliacoesService {
    public async criar({ nota, comentario, alunoId, autor }: CriarAvaliacaoDTO) {
        if (nota < 0 || nota > 100) {
            throw new HTTPError(400, "A nota deve estar entre 0 e 100");
        }

        if (autor.tipo === "M" && autor.id !== alunoId) {
            throw new HTTPError(403, "Alunos do tipo M só podem avaliar a si mesmos");
        }

        const alunoExiste = await prismaClient.aluno.findUnique({
            where: { id: alunoId },
        });

        if (!alunoExiste) {
            throw new HTTPError(404, "Aluno não encontrado");
        }

        return await prismaClient.avaliacao.create({
            data: {
                nota,
                comentario,
                alunoId,
            },
        });
    }

    public async listarTodas(autor: { id: string; tipo: "M" | "T" | "F" }) {
        if (autor.tipo !== "T") {
            throw new HTTPError(403, "Apenas alunos T podem listar todas as avaliações");
        }

        return await prismaClient.avaliacao.findMany({
            include: {
                aluno: {
                    select: { nome: true, email: true, tipo: true },
                },
            },
        });
    }

    public async listarPorAluno({
        alunoId,
        autor,
    }: ListarAvaliacaoPorAlunoDTO) {
        if ((autor.tipo === "M" || autor.tipo === "F") && autor.id !== alunoId) {
            throw new HTTPError(403, "Você só pode ver suas próprias avaliações");
        }

        return await prismaClient.avaliacao.findMany({
            where: { alunoId },
        });
    }

    public async atualizar({
        id,
        nota,
        comentario,
        autor,
    }: AtualizarAvaliacaoDTO) {
        const avaliacao = await prismaClient.avaliacao.findUnique({
            where: { id },
        });

        if (!avaliacao) {
            throw new HTTPError(404, "Avaliação não encontrada");
        }

        if (autor.tipo !== "T") {
            throw new HTTPError(403, "Apenas alunos T podem atualizar avaliações");
        }

        return await prismaClient.avaliacao.update({
            where: { id },
            data: {
                nota,
                comentario,
            },
        });
    }

    public async deletar({ id, autor }: DeletarAvaliacaoDTO) {
        const avaliacao = await prismaClient.avaliacao.findUnique({
            where: { id },
        });

        if (!avaliacao) {
            throw new HTTPError(404, "Avaliação não encontrada");
        }

        if (autor.tipo !== "T") {
            throw new HTTPError(403, "Apenas alunos T podem deletar avaliações");
        }

        return await prismaClient.avaliacao.delete({
            where: { id },
        });
    }
}
