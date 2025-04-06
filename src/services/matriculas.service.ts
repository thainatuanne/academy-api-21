import { Aluno, Matricula, Turma } from "@prisma/client";
import { CadastrarMatriculaDto } from "../dtos/matricula.dto";
import { validate as isValidUid } from "uuid";
import { HTTPError } from "../utils/https.error";
import { prismaClient } from "../database/prisma.client";

type AlunoParcial = Omit<Aluno, "senha" | "authToken">;

type MatriculaModelada = Omit<Matricula, "alunoId" | "turmaId"> & {
    aluno: AlunoParcial;
    turma: Turma;
};

export class MatriculasService {
    public async matricularAluno({
        alunoId,
        turmaId,
    }: CadastrarMatriculaDto): Promise<MatriculaModelada> {
        // 1 - Validar ID's enviados
        if (!isValidUid(turmaId)) {
            throw new HTTPError(400, "Identificador da turma inválido");
        }

        // 2 - Validar de aluno existe
        const alunoEncontrado = await prismaClient.aluno.count({
            where: { id: alunoId },
        });

        if (!alunoEncontrado) {
            throw new HTTPError(404, "Aluno não encontrado");
        }

        // 3 - Validar se a turma existe
        const turmaEncontrada = await prismaClient.turma.findUnique({
            where: {
                id: turmaId,
            },
            include: {
                matriculas: true,
            },
        });

        if (!turmaEncontrada) {
            throw new HTTPError(404, "Turma não encontrado");
        }

        // 4 - Validar se o aluno já está matriculado nesta turma
        const matriculaEncontrada = await prismaClient.matricula.findUnique({
            where: {
                alunoId_turmaId: {
                    alunoId,
                    turmaId,
                },
            },
        });

        if (matriculaEncontrada) {
            throw new HTTPError(409, "Aluno já matriculado nesta turma");
        }

        // 5 - Verificar qual o numero de alunos maximo e quantos já tem matriculados
        const maxAlunos = turmaEncontrada.maxAlunos;

        // considera apenas as matriculas ativas
        const numAlunosMatriculados = turmaEncontrada.matriculas.filter(
            (matricula) => matricula.ativo
        ).length;

        // max = 20
        // alunos matriculados = 20
        if (numAlunosMatriculados + 1 > maxAlunos) {
            throw new HTTPError(
                409,
                "Turma atingiu a capacidade máxima de matriculas permitidas"
            );
        }

        // 6 - Efetivar a matricula
        const novaMatricula = await prismaClient.matricula.create({
            data: {
                alunoId,
                turmaId,
            },
            include: {
                aluno: {
                    omit: {
                        senha: true,
                        authToken: true,
                    },
                },
                turma: true,
            },
            omit: {
                alunoId: true,
                turmaId: true,
            },
        });

        return novaMatricula;
    }

    public async listarAlunosMatriculados(
        turmaId: string
    ): Promise<AlunoParcial[]> {
        const turma = await prismaClient.turma.findUnique({
            where: { id: turmaId },
        });

        if (!turma) {
            throw new HTTPError(404, "Turma não encontrada");
        }

        const matriculas = await prismaClient.matricula.findMany({
            where: { turmaId: turmaId, ativo: true },
            include: {
                aluno: {
                    omit: {
                        senha: true,
                        authToken: true,
                    },
                },
            },
            omit: {
                turmaId: true,
                alunoId: true,
            },
        });

        const alunosMatriculados = matriculas.map((matricula) => matricula.aluno);

        return alunosMatriculados;
    }

    public async listarTurmasDeUmAluno(alunoId: string): Promise<Turma[]> {
        const aluno = await prismaClient.aluno.findUnique({
            where: { id: alunoId },
        });

        if (!aluno) {
            throw new HTTPError(404, "Aluno não encontrado");
        }

        const matriculas = await prismaClient.matricula.findMany({
            where: { alunoId, ativo: true },
            include: {
                turma: true,
            },
            omit: {
                turmaId: true,
                alunoId: true,
            },
        });

        const turmas = matriculas.map((matricula) => matricula.turma);

        return turmas;
    }
}