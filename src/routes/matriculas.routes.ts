import { Router } from "express";
import { MatriculasController } from "../controller/matriculas.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validateUidFormatMiddleware } from "../middlewares/validate-uid-format.middleware";

export class MatriculasRoutes {
    public static bind(): Router {
        const router = Router();
        const controller = new MatriculasController();

        /**
         * @swagger
         * tags:
         *   name: Matrículas
         *   description: Endpoints para gerenciamento de matrículas
         */

        /**
         * @swagger
         * /matriculas:
         *   post:
         *     summary: Matricular aluno em uma turma
         *     tags: [Matrículas]
         *     security:
         *       - bearerAuth: []
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required: [alunoId, turmaId]
         *             properties:
         *               alunoId:
         *                 type: string
         *                 format: uuid
         *               turmaId:
         *                 type: string
         *                 format: uuid
         *     responses:
         *       201:
         *         description: Matrícula realizada com sucesso
         *       400:
         *         description: Dados inválidos
         *       401:
         *         description: Token ausente ou inválido
         */
        router.post("/matriculas", [authMiddleware], controller.matricular);

        /**
         * @swagger
         * /matriculas/{id}:
         *   get:
         *     summary: Listar alunos matriculados em uma turma
         *     tags: [Matrículas]
         *     security:
         *       - bearerAuth: []
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *           format: uuid
         *         description: ID da turma
         *     responses:
         *       200:
         *         description: Lista de alunos retornada com sucesso
         *       400:
         *         description: Identificador inválido
         *       401:
         *         description: Token ausente ou inválido
         */
        router.get(
            "/matriculas/:id",
            [authMiddleware, validateUidFormatMiddleware],
            controller.listarAlunos
        );

        /**
         * @swagger
         * /matriculas:
         *   get:
         *     summary: Listar turmas do aluno logado
         *     tags: [Matrículas]
         *     security:
         *       - bearerAuth: []
         *     responses:
         *       200:
         *         description: Lista de turmas retornada com sucesso
         *       401:
         *         description: Token ausente ou inválido
         */
        router.get("/matriculas", [authMiddleware], controller.listarTurmas);

        return router;
    }
}
