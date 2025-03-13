// banckend programação orientada a objetos
import { Router } from "express";
import { AlunosController } from "../controller/alunos.controller";

export class AlunosRoutes {
    public static bind(): Router {
        const router = Router();

        const controller = new AlunosController();

        router.get("/alunos", controller.listar); // listando todos os alunos

        router.get("/alunos/:id", controller.buscarPorID) // buscar um aluno por ID

        router.post("/alunos"); // cadastrando um aluno

        router.put("/alunos/:id"); // atualizar um aluno

        router.delete("/alunos/:id"); // deletar um aluno

        return router;
    }
};