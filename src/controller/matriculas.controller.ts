import { Request, Response } from "express";
import { onError } from "../utils/on-error";
import { MatriculasService } from "../services/matriculas.service";

export class MatriculasController {
    public async matricular(req: Request, res: Response) {
        try {
            const { turmaId } = req.body;

            const service = new MatriculasService();
            const resultado = await service.matricularAluno({
                alunoId: req.alunoLogado.id,
                turmaId,
            });

            res.status(201).json({
                sucesso: true,
                mensagem: "Aluno matriculado com sucesso",
                dados: resultado,
            });
        } catch (error) {
            onError(error, res);
        }
    }

    public async listarAlunos(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const service = new MatriculasService();
            const resultado = await service.listarAlunosMatriculados(id);

            res.status(200).json({
                sucesso: true,
                mensagem: "Alunos matriculados listados com sucesso",
                dados: resultado,
            });
        } catch (error) {
            onError(error, res);
        }
    }

    public async listarTurmas(req: Request, res: Response) {
        try {
            const service = new MatriculasService();
            const resultado = await service.listarTurmasDeUmAluno(req.alunoLogado.id);

            res.status(200).json({
                sucesso: true,
                mensagem: "Turmas em que o aluno está matriculado listadas com sucesso",
                dados: resultado,
            });
        } catch (error) {
            onError(error, res);
        }
    }
}