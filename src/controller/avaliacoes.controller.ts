import { Request, Response } from "express";
import { AvaliacoesService } from "../services/avaliacoes.service";
import { onError } from "../utils/on-error";
import {
    AtualizarAvaliacaoDTO,
    CriarAvaliacaoDTO,
    DeletarAvaliacaoDTO,
    ListarAvaliacaoPorAlunoDTO,
} from "../dtos/avaliacao.dto";

export class AvaliacoesController {
    public async listarTodas(req: Request, res: Response): Promise<void> {
        try {
            const service = new AvaliacoesService();
            const resultado = await service.listarTodas(req.alunoLogado); // ← Passa autor logado

            res.status(200).json({
                sucesso: true,
                mensagem: "Avaliações listadas com sucesso",
                dados: resultado,
            });
        } catch (error) {
            onError(error, res);
        }
    }

    public async listarPorAluno(req: Request, res: Response): Promise<void> {
        try {
            const { alunoId } = req.params;
            const service = new AvaliacoesService();

            const resultado = await service.listarPorAluno({
                alunoId,
                autor: req.alunoLogado,
            } as ListarAvaliacaoPorAlunoDTO);

            res.status(200).json({
                sucesso: true,
                mensagem: "Avaliações do aluno encontradas",
                dados: resultado,
            });
        } catch (error) {
            onError(error, res);
        }
    }

    public async criar(req: Request, res: Response): Promise<void> {
        try {
            const { nota, comentario, alunoId } = req.body;
            const service = new AvaliacoesService();

            const resultado = await service.criar({
                nota,
                comentario,
                alunoId,
                autor: req.alunoLogado,
            } as CriarAvaliacaoDTO);

            res.status(201).json({
                sucesso: true,
                mensagem: "Avaliação criada com sucesso",
                dados: resultado,
            });
        } catch (error) {
            onError(error, res);
        }
    }

    public async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { nota, comentario } = req.body;
            const service = new AvaliacoesService();

            const resultado = await service.atualizar({
                id,
                nota,
                comentario,
                autor: req.alunoLogado,
            } as AtualizarAvaliacaoDTO);

            res.status(200).json({
                sucesso: true,
                mensagem: "Avaliação atualizada com sucesso",
                dados: resultado,
            });
        } catch (error) {
            onError(error, res);
        }
    }

    public async deletar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const service = new AvaliacoesService();

            const resultado = await service.deletar({
                id,
                autor: req.alunoLogado,
            } as DeletarAvaliacaoDTO);

            res.status(200).json({
                sucesso: true,
                mensagem: "Avaliação deletada com sucesso",
                dados: resultado,
            });
        } catch (error) {
            onError(error, res);
        }
    }
}
