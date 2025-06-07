import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { ProjetosController } from "../controller/projetos.controller";
import { validateUidFormatMiddleware } from "../middlewares/validate-uid-format.middleware";

export class ProjetosRoutes {
    public static bind(): Router {
        const router = Router();

        const controller = new ProjetosController();

        /**
         * @swagger
         * tags:
         *   name: Projetos
         *   description: Endpoints para gerenciamento de projetos
         */

        /**
         * @swagger
         * /projetos:
         *   get:
         *     summary: Listar todos os projetos
         *     tags: [Projetos]
         *     security:
         *       - bearerAuth: []
         *     responses:
         *       200:
         *         description: "Lista de projetos retornada com sucesso"
         *       401:
         *         description: "Token ausente ou inválido"
         */
        router.get("/projetos", [authMiddleware], controller.listar);

        /**
         * @swagger
         * /projetos/{id}:
         *   get:
         *     summary: Buscar projeto por ID
         *     tags: [Projetos]
         *     security:
         *       - bearerAuth: []
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *           format: uuid
         *         description: ID do projeto
         *     responses:
         *       200:
         *         description: "Projeto encontrado"
         *       400:
         *         description: "ID inválido"
         *       401:
         *         description: "Token ausente ou inválido"
         *       404:
         *         description: "Projeto não encontrado"
         */
        router.get(
            "/projetos/:id",
            [authMiddleware, validateUidFormatMiddleware],
            controller.buscarPorID
        );

        /**
         * @swagger
         * /projetos:
         *   post:
         *     summary: Cadastrar um novo projeto
         *     tags: [Projetos]
         *     security:
         *       - bearerAuth: []
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required: [titulo, descricao, turmaId]
         *             properties:
         *               titulo:
         *                 type: string
         *               descricao:
         *                 type: string
         *               turmaId:
         *                 type: string
         *                 format: uuid
         *     responses:
         *       201:
         *         description: "Projeto cadastrado com sucesso"
         *       400:
         *         description: "Dados inválidos"
         *       401:
         *         description: "Token ausente ou inválido"
         */
        router.post("/projetos", [authMiddleware], controller.cadastrar);

        /**
         * @swagger
         * /projetos/{id}:
         *   put:
         *     summary: Atualizar projeto por ID
         *     tags: [Projetos]
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
         *               titulo:
         *                 type: string
         *               descricao:
         *                 type: string
         *     responses:
         *       200:
         *         description: "Projeto atualizado com sucesso"
         *       400:
         *         description: "ID inválido"
         *       401:
         *         description: "Token ausente ou inválido"
         */
        router.put(
            "/projetos/:id",
            [authMiddleware, validateUidFormatMiddleware],
            controller.atualizar
        );

        /**
         * @swagger
         * /projetos/{id}:
         *   delete:
         *     summary: Excluir projeto por ID
         *     tags: [Projetos]
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
         *         description: "Projeto excluído com sucesso"
         *       400:
         *         description: "ID inválido"
         *       401:
         *         description: "Token ausente ou inválido"
         */
        router.delete(
            "/projetos/:id",
            [authMiddleware, validateUidFormatMiddleware],
            controller.excluir
        );

        return router;
    }
}
