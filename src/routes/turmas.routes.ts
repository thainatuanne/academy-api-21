import { Router } from "express";
import { TurmasController } from "../controller/turmas.controller";

export class TurmasRoutes {
    public static bind(): Router {
        const router = Router();

        const controller = new TurmasController();

        /**
         * @swagger
         * tags:
         *   name: Turmas
         *   description: Endpoints para gerenciamento de turmas
         */

        /**
         * @swagger
         * /turmas:
         *   get:
         *     summary: Listar todas as turmas
         *     tags: [Turmas]
         *     responses:
         *       200:
         *         description: "Lista de turmas retornada com sucesso"
         */
        router.get("/turmas", controller.listar);

        /**
         * @swagger
         * /turmas/{id}:
         *   get:
         *     summary: Buscar turma por ID
         *     tags: [Turmas]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: ID da turma
         *     responses:
         *       200:
         *         description: "Turma encontrada com sucesso"
         *       404:
         *         description: "Turma não encontrada"
         */
        router.get("/turmas/:id", controller.buscarPorID);

        /**
         * @swagger
         * /turmas:
         *   post:
         *     summary: Cadastrar nova turma
         *     tags: [Turmas]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required: [nome, periodo]
         *             properties:
         *               nome:
         *                 type: string
         *               periodo:
         *                 type: string
         *     responses:
         *       201:
         *         description: "Turma cadastrada com sucesso"
         *       400:
         *         description: "Dados inválidos"
         */
        router.post("/turmas", controller.cadastrar);

        /**
         * @swagger
         * /turmas/{id}:
         *   put:
         *     summary: Atualizar turma por ID
         *     tags: [Turmas]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               nome:
         *                 type: string
         *               periodo:
         *                 type: string
         *     responses:
         *       200:
         *         description: "Turma atualizada com sucesso"
         *       400:
         *         description: "ID inválido ou dados incorretos"
         *       404:
         *         description: "Turma não encontrada"
         */
        router.put("/turmas/:id", controller.atualizar);

        /**
         * @swagger
         * /turmas/{id}:
         *   delete:
         *     summary: Excluir turma por ID
         *     tags: [Turmas]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *     responses:
         *       200:
         *         description: "Turma excluída com sucesso"
         *       404:
         *         description: "Turma não encontrada"
         */
        router.delete("/turmas/:id", controller.deletar);

        return router;
    }
}
