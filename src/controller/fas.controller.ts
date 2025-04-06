import { Request, Response } from "express";
import { onError } from "../utils/on-error";
import { FasService } from "../services/fas.service";

export class FasController {
    public async toggle(req: Request, res: Response): Promise<void> {
        try {
            const faId = req.alunoLogado.id;
            const { alunoId } = req.body;

            const service = new FasService();
            const resultado = await service.toggleFa({
                alunoFaId: faId,
                alunoOriginalId: alunoId,
            });

            res.status(200).json({
                sucesso: true,
                mensagem: resultado,
            });
        } catch (error) {
            onError(error, res);
        }
    }
}