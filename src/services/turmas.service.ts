import { Turma } from "@prisma/client";
import { prismaClient } from "../database/prisma.client";
import { validate as isValidUid } from "uuid";
import { HTTPError } from "../utils/https.error";
import {
    AtualizarTurmaDto,
    CadastrarTurmaDto,
    ListarTurmaDto,
} from "../dtos/turmas.dtos";

export class TurmasService {
    public async cadastrar({
        edicao,
        maxAlunos,
        programa,
    }: CadastrarTurmaDto): Promise<Turma> {
        const turmaJaCadastrada = await prismaClient.turma.findUnique({
            where: {
                programa_edicao: {
                    programa,
                    edicao,
                },
            },
        });

        if (turmaJaCadastrada) {
            throw new HTTPError(
                409,
                "Já existe uma turma cadastrada com esse programa de formação e esta edição"
            );
        }

        const novaTurma = await prismaClient.turma.create({
            data: {
                edicao,
                maxAlunos,
                programa,
            },
        });

        return novaTurma;
    }

    public async listar({ programa, edicao }: ListarTurmaDto): Promise<Turma[]> {
        const turmasDB = await prismaClient.turma.findMany({
            where: {
                programa: {
                    contains: programa,
                    mode: "insensitive",
                },
                edicao: edicao,
            },
            orderBy: {
                programa: "asc",
            },
        });

        return turmasDB;
    }

    public async buscarPorId(idTurma: string): Promise<Turma> {
        if (!isValidUid(idTurma)) {
            throw new HTTPError(400, "Identificador da turma inválido");
        }

        const turma = await prismaClient.turma.findUnique({
            where: { id: idTurma },
        });

        if (!turma) {
            throw new HTTPError(404, "Turma não encontrada");
        }

        return turma;
    }

    public async atualizar({
        id,
        edicao,
        maxAlunos,
        programa,
    }: AtualizarTurmaDto): Promise<Turma> {
        await this.buscarPorId(id);

        const turmaAtualizada = await prismaClient.turma.update({
            where: { id },
            data: {
                programa,
                maxAlunos,
                edicao,
            },
        });

        return turmaAtualizada;
    }

    public async excluir(idTurma: string): Promise<Turma> {
        await this.buscarPorId(idTurma);

        const turmaExcluida = await prismaClient.turma.delete({
            where: { id: idTurma },
        });

        return turmaExcluida;
    }
}