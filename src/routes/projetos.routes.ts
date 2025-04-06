import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { ProjetosController } from "../controller/projetos.controller";
import { validateUidFormatMiddleware } from "../middlewares/validate-uid-format.middleware";

export class ProjetosRoutes {
    public static bind(): Router {
        const router = Router();

        const controller = new ProjetosController();

        router.get("/projetos", [authMiddleware], controller.listar);
        router.get(
            "/projetos/:id",
            [authMiddleware, validateUidFormatMiddleware],
            controller.buscarPorID
        );
        router.post("/projetos", [authMiddleware], controller.cadastrar);
        router.put(
            "/projetos/:id",
            [authMiddleware, validateUidFormatMiddleware],
            controller.atualizar
        );
        router.delete(
            "/projetos/:id",
            [authMiddleware, validateUidFormatMiddleware],
            controller.excluir
        );

        return router;
    }
}