import { Request, Response } from "express";
import { onError } from "../utils/on-error";
import { EnderecosService } from "../services/enderecos.service";

export class EnderecosController {
    public async cadastrar(req: Request, res: Response): Promise<void> {
        try {
            const { logradouro, numero, complemento, cep, bairro, cidade, uf, pais } =
                req.body;

            const service = new EnderecosService();
            const resultado = await service.cadastrar({
                alunoId: req.alunoLogado.id,
                logradouro,
                numero,
                complemento,
                cep,
                bairro,
                cidade,
                uf,
                pais,
            });

            res.status(201).json({
                sucesso: true,
                mensagem: "Endereço do aluno cadastrado",
                dados: resultado,
            });
        } catch (error) {
            onError(error, res);
        }
    }

    public async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const { logradouro, numero, complemento, cep, bairro, cidade, uf, pais } =
                req.body;

            const service = new EnderecosService();
            const resultado = await service.atualizar({
                alunoId: req.alunoLogado.id,
                logradouro,
                numero,
                complemento,
                cep,
                bairro,
                cidade,
                uf,
                pais,
            });

            res.status(200).json({
                sucesso: true,
                mensagem: "Endereço do aluno atualizado",
                dados: resultado,
            });
        } catch (error) {
            onError(error, res);
        }
    }
}