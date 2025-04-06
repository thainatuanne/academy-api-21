import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { FasController } from "../controller/fas.controller";

export class FasRoutes {
    public static bind(): Router {
        const router = Router();

        const controller = new FasController();

        // 1 - POST - Criar um rota de cadastro - seguir
        // router.post("/fas"); Adiciona um registro de fã

        // 2 - DELETE - Excluir o registro de fã
        // router.delete("/fas"); Remove o registro de fã

        // 3 - PATCH - toggle
        // PUT => atualização total, posso atualizar todas as propriedades
        // PATCH => atualização parcial, só consigo atualizar 1 única prop
        router.patch("/fas", [authMiddleware], controller.toggle);

        return router;
    }
}