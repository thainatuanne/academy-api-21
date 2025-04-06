import { Router } from "express";
import { MatriculasController } from "../controller/matriculas.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validateUidFormatMiddleware } from "../middlewares/validate-uid-format.middleware";

export class MatriculasRoutes {
    public static bind(): Router {
        const router = Router();

        const controller = new MatriculasController();

        // matricular
        router.post("/matriculas", [authMiddleware], controller.matricular);

        // listar todos os alunos matriculados em uma turma
        router.get(
            "/matriculas/:id",
            [authMiddleware, validateUidFormatMiddleware],
            controller.listarAlunos
        );

        // listar todas as turmas em que o aluno logado esta matriculado
        router.get("/matriculas", [authMiddleware], controller.listarTurmas);

        return router;
    }
}