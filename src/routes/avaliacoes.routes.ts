import { Router } from "express";
import { AvaliacoesController } from "../controller/avaliacoes.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { autorizarPorTipo } from "../middlewares/autorizar-por-tipo.middleware";
import { validateUidFormatMiddleware } from "../middlewares/validate-uid-format.middleware";

export class AvaliacoesRoutes {
    public static bind(): Router {
        const router = Router();
        const controller = new AvaliacoesController();

        router.get(
            "/avaliacoes",
            [authMiddleware, autorizarPorTipo(["T"])],
            controller.listarTodas
        );

        router.get(
            "/avaliacoes/:alunoId",
            [authMiddleware, validateUidFormatMiddleware],
            controller.listarPorAluno
        );

        router.post(
            "/avaliacoes",
            [authMiddleware, autorizarPorTipo(["M", "T"])],
            controller.criar
        );

        router.put(
            "/avaliacoes/:id",
            [authMiddleware, autorizarPorTipo(["T"]), validateUidFormatMiddleware],
            controller.atualizar
        );

        router.delete(
            "/avaliacoes/:id",
            [authMiddleware, autorizarPorTipo(["T"]), validateUidFormatMiddleware],
            controller.deletar
        );

        return router;
    }
}
