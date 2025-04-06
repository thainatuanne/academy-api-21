import { Projeto } from "@prisma/client";
import { prismaClient } from "../database/prisma.client";
import {
    AtualizarProjetoDto,
    BuscarPorIdDto,
    CadastrarProjetoDto,
} from "../dtos/projetos.dto";
import { HTTPError } from "../utils/https.error";

type ProjetoSemAlunoId = Omit<Projeto, "alunoId">;

export class ProjetosService {
    public async listarTodos(alunoId: string): Promise<ProjetoSemAlunoId[]> {
        const projetos = await prismaClient.projeto.findMany({
            where: { alunoId },
            omit: { alunoId: true },
        });

        return projetos;
    }

    public async buscarPorID({
        alunoId,
        projetoId,
    }: BuscarPorIdDto): Promise<ProjetoSemAlunoId> {
        const projetoEncontrado = await prismaClient.projeto.findUnique({
            where: { id: projetoId, alunoId },
        });

        if (!projetoEncontrado) {
            throw new HTTPError(
                404,
                "Projeto do aluno não encontrado pelo ID informado"
            );
        }

        return projetoEncontrado;
    }

    public async cadastrar({
        alunoId,
        ferramenta,
        status,
        titulo,
        descricao,
    }: CadastrarProjetoDto): Promise<ProjetoSemAlunoId> {
        const novoProjeto = await prismaClient.projeto.create({
            data: {
                ferramenta,
                status,
                titulo,
                alunoId,
                descricao,
            },
        });

        return novoProjeto;
    }

    public async atualizar({
        alunoId,
        projetoId,
        descricao,
        ferramenta,
        status,
        titulo,
    }: AtualizarProjetoDto): Promise<ProjetoSemAlunoId> {
        await this.buscarPorID({ alunoId, projetoId });

        const projetoAtualizado = await prismaClient.projeto.update({
            where: { id: projetoId, alunoId },
            data: { descricao, ferramenta, status, titulo },
        });

        return projetoAtualizado;
    }

    public async deletar({
        alunoId,
        projetoId,
    }: BuscarPorIdDto): Promise<ProjetoSemAlunoId> {
        await this.buscarPorID({ alunoId, projetoId });

        const projetoExcluido = await prismaClient.projeto.delete({
            where: { id: projetoId, alunoId },
        });

        return projetoExcluido;
    }
}