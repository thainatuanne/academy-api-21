import { Router } from "express";
import { AlunosController } from "../controller/alunos.controller";
import { EnderecosController } from "../controller/enderecos.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validateUidFormatMiddleware } from "../middlewares/validate-uid-format.middleware";

export class AlunosRoutes {
    public static bind(): Router {
        const router = Router();

        const controller = new AlunosController();
        const controllerEnderecos = new EnderecosController();

        /**
         * @swagger
         * tags:
         *   name: Alunos
         *   description: "Endpoints para gerenciamento de alunos e endereços"
         */

        /**
         * @swagger
         * /alunos:
         *   get:
         *     summary: "Listar todos os alunos"
         *     tags: [Alunos]
         *     responses:
         *       200:
         *         description: "Lista de alunos retornada com sucesso"
         */
        router.get("/alunos", controller.listar);

        /**
         * @swagger
         * /alunos/{id}:
         *   get:
         *     summary: "Buscar aluno por ID"
         *     tags: [Alunos]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *           format: uuid
         *         description: "ID do aluno (UUID)"
         *     responses:
         *       200:
         *         description: "Aluno encontrado"
         *       400:
         *         description: "Identificador inválido"
         *       404:
         *         description: "Aluno não encontrado"
         */
        router.get("/alunos/:id", [validateUidFormatMiddleware], controller.buscarPorID);

        /**
         * @swagger
         * /alunos:
         *   post:
         *     summary: "Cadastrar um novo aluno"
         *     tags: [Alunos]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required: [nome, email, senha, idade, tipo]
         *             properties:
         *               nome:
         *                 type: string
         *               email:
         *                 type: string
         *               senha:
         *                 type: string
         *               idade:
         *                 type: integer
         *               tipo:
         *                 type: string
         *                 enum: [M, T, F]
         *     responses:
         *       201:
         *         description: "Aluno cadastrado com sucesso"
         */
        router.post("/alunos", controller.cadastrar);

        /**
         * @swagger
         * /alunos:
         *   put:
         *     summary: "Atualizar dados do aluno (requer autenticação)"
         *     tags: [Alunos]
         *     security:
         *       - bearerAuth: []
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               id:
         *                 type: string
         *                 format: uuid
         *               nome:
         *                 type: string
         *               email:
         *                 type: string
         *               senha:
         *                 type: string
         *               idade:
         *                 type: integer
         *     responses:
         *       200:
         *         description: "Aluno atualizado com sucesso"
         *       401:
         *         description: "Token ausente ou inválido"
         */
        router.put("/alunos", [authMiddleware], controller.atualizar);

        /**
         * @swagger
         * /alunos:
         *   delete:
         *     summary: "Excluir um aluno (requer autenticação)"
         *     tags: [Alunos]
         *     security:
         *       - bearerAuth: []
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               id:
         *                 type: string
         *                 format: uuid
         *     responses:
         *       200:
         *         description: "Aluno excluído com sucesso"
         *       401:
         *         description: "Token ausente ou inválido"
         */
        router.delete("/alunos", [authMiddleware], controller.deletar);

        /**
         * @swagger
         * /alunos/enderecos:
         *   post:
         *     summary: "Cadastrar endereço do aluno (requer autenticação)"
         *     tags: [Alunos]
         *     security:
         *       - bearerAuth: []
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required: [alunoId, logradouro, cidade, estado]
         *             properties:
         *               alunoId:
         *                 type: string
         *                 format: uuid
         *               logradouro:
         *                 type: string
         *               cidade:
         *                 type: string
         *               estado:
         *                 type: string
         *     responses:
         *       201:
         *         description: "Endereço cadastrado com sucesso"
         *       401:
         *         description: "Token ausente ou inválido"
         */
        router.post("/alunos/enderecos", [authMiddleware], controllerEnderecos.cadastrar);

        /**
         * @swagger
         * /alunos/enderecos:
         *   put:
         *     summary: "Atualizar endereço do aluno (requer autenticação)"
         *     tags: [Alunos]
         *     security:
         *       - bearerAuth: []
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               alunoId:
         *                 type: string
         *                 format: uuid
         *               logradouro:
         *                 type: string
         *               cidade:
         *                 type: string
         *               estado:
         *                 type: string
         *     responses:
         *       200:
         *         description: "Endereço atualizado com sucesso"
         *       401:
         *         description: "Token ausente ou inválido"
         */
        router.put("/alunos/enderecos", [authMiddleware], controllerEnderecos.atualizar);

        return router;
    }
}
