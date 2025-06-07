import { Router } from "express";
import { AuthController } from "../controller/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export class AuthRoutes {
    public static bind(): Router {
        const router = Router();

        const controller = new AuthController();

        /**
         * @swagger
         * tags:
         *   name: Autenticação
         *   description: Endpoints para login e logout
         */

        /**
         * @swagger
         * /login:
         *   post:
         *     summary: Realizar login
         *     tags: [Autenticação]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - email
         *               - senha
         *             properties:
         *               email:
         *                 type: string
         *                 format: email
         *               senha:
         *                 type: string
         *     responses:
         *       200:
         *         description: "Login realizado com sucesso"
         *       400:
         *         description: "Credenciais inválidas"
         */
        router.post("/login", controller.login);

        /**
         * @swagger
         * /logout:
         *   post:
         *     summary: Realizar logout
         *     tags: [Autenticação]
         *     security:
         *       - bearerAuth: []
         *     responses:
         *       200:
         *         description: "Logout realizado com sucesso"
         *       401:
         *         description: "Token ausente ou inválido"
         */
        router.post("/logout", [authMiddleware], controller.logout);

        return router;
    }
}
