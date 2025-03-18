import { Aluno } from "@prisma/client";
import { prismaClient } from "../database/prisma.client";
import {
    AtualizarAlunoDto,
    CadastrarAlunoDto,
    ListarAlunosDto,
} from "../dtos/alunos.dtos";
import { validate as isValidUid } from "uuid";
import { HTTPError } from "../utils/https.error";

// Tipos Utilitários TS
type AlunoParcial = Omit<Aluno, "authToken" | "senha">;

export class AlunosService {
    public async cadastrar({
        email,
        nome,
        senha,
        idade,
    }: CadastrarAlunoDto): Promise<AlunoParcial> {
        const emailJaCadastrado = await prismaClient.aluno.findUnique({
            where: { email: email },
        });

        if (emailJaCadastrado) {
            throw new HTTPError(409, "E-mail já cadastrado por outro aluno");
        }

        const novoAluno = await prismaClient.aluno.create({
            data: {
                nome,
                email,
                senha,
                idade,
            },
            omit: {
                authToken: true,
                senha: true,
            },
        });

        return novoAluno;
    }

    public async listar({ nome }: ListarAlunosDto): Promise<AlunoParcial[]> {
        // ...

        const alunosDB = await prismaClient.aluno.findMany({
            where: {
                nome: {
                    contains: nome,
                    mode: "insensitive",
                },
            },
            orderBy: {
                nome: "asc",
            },
            omit: {
                authToken: true,
                senha: true,
            },
        });

        return alunosDB;
    }

    public async buscarPorId(idAluno: string): Promise<AlunoParcial> {
        if (!isValidUid(idAluno)) {
            throw new HTTPError(400, "Identificador do aluno inválido");
        }

        const aluno = await prismaClient.aluno.findUnique({
            where: { id: idAluno },
            omit: {
                authToken: true,
                senha: true,
            },
        });

        if (!aluno) {
            throw new HTTPError(404, "Aluno não encontrado");
        }

        return aluno;
    }

    public async atualizar({
        id,
        email,
        idade,
        nome,
        senha,
    }: AtualizarAlunoDto): Promise<AlunoParcial> {
        await this.buscarPorId(id);

        const alunoAtualizado = await prismaClient.aluno.update({
            where: { id },
            data: {
                email,
                idade,
                nome,
                senha,
            },
            omit: {
                authToken: true,
                senha: true,
            },
        });

        return alunoAtualizado;
    }

    public async excluir(idAluno: string): Promise<AlunoParcial> {
        await this.buscarPorId(idAluno);

        const alunoExcluido = await prismaClient.aluno.delete({
            where: { id: idAluno },
            omit: {
                authToken: true,
                senha: true,
            },
        });

        return alunoExcluido;
    }
}