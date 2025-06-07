import { Router } from "express";
import { AvaliacoesController } from "../controller/avaliacoes.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { autorizarPorTipo } from "../middlewares/autorizar-por-tipo.middleware";
import { validateUidFormatMiddleware } from "../middlewares/validate-uid-format.middleware";

export class AvaliacoesRoutes {
    public static bind(): Router {
        const router = Router();
        const controller = new AvaliacoesController();

        /**
         * @swagger
         * tags:
         *   name: Avaliações
         *   description: Endpoints para gerenciamento de avaliações dos alunos
         */

        /**
         * @swagger
         * /avaliacoes:
         *   get:
         *     summary: Listar todas as avaliações (somente tipo T)
         *     tags: [Avaliações]
         *     security:
         *       - bearerAuth: []
         *     responses:
         *       200:
         *         description: "Lista de avaliações retornada com sucesso"
         *       401:
         *         description: "Token ausente ou inválido"
         *       403:
         *         description: "Acesso negado: tipo não autorizado"
         */
        router.get(
            "/avaliacoes",
            [authMiddleware, autorizarPorTipo(["T"])],
            controller.listarTodas
        );

        /**
         * @swagger
         * /avaliacoes/{alunoId}:
         *   get:
         *     summary: Listar avaliações de um aluno
         *     tags: [Avaliações]
         *     security:
         *       - bearerAuth: []
         *     parameters:
         *       - in: path
         *         name: alunoId
         *         required: true
         *         schema:
         *           type: string
         *           format: uuid
         *         description: ID do aluno
         *     responses:
         *       200:
         *         description: "Avaliações do aluno retornadas com sucesso"
         *       400:
         *         description: "Identificador inválido"
         *       401:
         *         description: "Token ausente ou inválido"
         */
        router.get(
            "/avaliacoes/:alunoId",
            [authMiddleware, validateUidFormatMiddleware],
            controller.listarPorAluno
        );

        /**
         * @swagger
         * /avaliacoes:
         *   post:
         *     summary: Criar uma nova avaliação (tipo M ou T)
         *     tags: [Avaliações]
         *     security:
         *       - bearerAuth: []
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required: [alunoId, nota, disciplina]
         *             properties:
         *               alunoId:
         *                 type: string
         *                 format: uuid
         *               nota:
         *                 type: number
         *               disciplina:
         *                 type: string
         *     responses:
         *       201:
         *         description: "Avaliação criada com sucesso"
         *       403:
         *         description: "Acesso negado: tipo não autorizado"
         *       401:
         *         description: "Token ausente ou inválido"
         */
        router.post(
            "/avaliacoes",
            [authMiddleware, autorizarPorTipo(["M", "T"])],
            controller.criar
        );

        /**
         * @swagger
         * /avaliacoes/{id}:
         *   put:
         *     summary: Atualizar uma avaliação (somente tipo T)
         *     tags: [Avaliações]
         *     security:
         *       - bearerAuth: []
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *           format: uuid
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               nota:
         *                 type: number
         *               disciplina:
         *                 type: string
         *     responses:
         *       200:
         *         description: "Avaliação atualizada com sucesso"
         *       401:
         *         description: "Token ausente ou inválido"
         *       403:
         *         description: "Acesso negado: tipo não autorizado"
         *       400:
         *         description: "ID inválido"
         */
        router.put(
            "/avaliacoes/:id",
            [authMiddleware, autorizarPorTipo(["T"]), validateUidFormatMiddleware],
            controller.atualizar
        );

        /**
         * @swagger
         * /avaliacoes/{id}:
         *   delete:
         *     summary: Excluir uma avaliação (somente tipo T)
         *     tags: [Avaliações]
         *     security:
         *       - bearerAuth: []
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *           format: uuid
         *     responses:
         *       200:
         *         description: "Avaliação excluída com sucesso"
         *       401:
         *         description: "Token ausente ou inválido"
         *       403:
         *         description: "Acesso negado: tipo não autorizado"
         *       400:
         *         description: "ID inválido"
         */
        router.delete(
            "/avaliacoes/:id",
            [authMiddleware, autorizarPorTipo(["T"]), validateUidFormatMiddleware],
            controller.deletar
        );

        return router;
    }
}
