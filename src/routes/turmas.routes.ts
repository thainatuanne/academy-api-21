import { Router } from "express";
import { TurmasController } from "../controller/turmas.controller";

export class TurmasRoutes {
    public static bind(): Router {
        const router = Router();

        const controller = new TurmasController();

        router.get("/turmas", controller.listar);
        router.get("/turmas/:id", controller.buscarPorID);
        router.post("/turmas", controller.cadastrar);
        router.put("/turmas/:id", controller.atualizar);
        router.delete("/turmas/:id", controller.deletar);

        return router;
    }
}