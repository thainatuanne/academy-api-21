import { Request, Response } from "express";
import { onError } from "../utils/on-error";
import { AuthService } from "../services/auth.service";

export class AuthController {
    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, senha } = req.body;

            const service = new AuthService();
            const resultado = await service.loginAluno({ email, senha });

            res.status(200).json({
                sucesso: true,
                mensagem: "Login efetuado com sucesso",
                dados: {
                    token: resultado,
                },
            });
        } catch (error) {
            onError(error, res);
        }
    }
    public async logout(req: Request, res: Response): Promise<void> {
        try {
            const service = new AuthService();

            await service.logoutAluno(req.alunoLogado.id);

            res.status(200).json({
                sucesso: true,
                mensagem: "Logout efetuado com sucesso",
            });
        } catch (error) {
            onError(error, res);
        }
    }
}