import { Request, Response } from "express";
import { onError } from "../utils/on-error";
import { ProjetosService } from "../services/projetos.service";

export class ProjetosController {
    public async listar(req: Request, res: Response): Promise<void> {
        try {
            // 1 - inputs
            const alunoId = req.alunoLogado.id;

            // 2 - processamento
            const service = new ProjetosService();
            const resultado = await service.listarTodos(alunoId);

            // 3 - output
            res.status(200).json({
                sucesso: true,
                mensagem: "Projetos do aluno listados com sucesso",
                dados: resultado,
            });
        } catch (error) {
            onError(error, res);
        }
    }

    public async buscarPorID(req: Request, res: Response): Promise<void> {
        try {
            // 1 - inputs
            const alunoId = req.alunoLogado.id;
            const { id } = req.params;

            // 2 - processamento
            const service = new ProjetosService();
            const resultado = await service.buscarPorID({
                alunoId,
                projetoId: id,
            });

            // 3 - output
            res.status(200).json({
                sucesso: true,
                mensagem: "Projeto do aluno encontrado com sucesso",
                dados: resultado,
            });
        } catch (error) {
            onError(error, res);
        }
    }

    public async cadastrar(req: Request, res: Response): Promise<void> {
        try {
            const { ferramenta, status, titulo, descricao } = req.body;
            const alunoId = req.alunoLogado.id;

            const service = new ProjetosService();
            const resultado = await service.cadastrar({
                alunoId,
                ferramenta,
                status,
                titulo,
                descricao,
            });

            res.status(201).json({
                sucesso: true,
                mensagem: "Projeto cadastrado para o aluno",
                dados: resultado,
            });
        } catch (error) {
            onError(error, res);
        }
    }

    public async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const { ferramenta, status, titulo, descricao } = req.body;
            const alunoId = req.alunoLogado.id;
            const { id } = req.params;

            const service = new ProjetosService();
            const resultado = await service.atualizar({
                alunoId,
                projetoId: id,
                descricao,
                ferramenta,
                status,
                titulo,
            });

            res.status(200).json({
                sucesso: true,
                mensagem: "Projeto do aluno atualizado",
                dados: resultado,
            });
        } catch (error) {
            onError(error, res);
        }
    }

    public async excluir(req: Request, res: Response): Promise<void> {
        try {
            const alunoId = req.alunoLogado.id;
            const { id } = req.params;

            const service = new ProjetosService();
            const resultado = await service.deletar({
                alunoId,
                projetoId: id,
            });

            res.status(200).json({
                sucesso: true,
                mensagem: "Projeto do aluno excluido",
                dados: resultado,
            });
        } catch (error) {
            onError(error, res);
        }
    }
}