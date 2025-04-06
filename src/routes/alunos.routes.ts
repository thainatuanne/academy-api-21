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

        // Rotas públicas - não é necessário estar logado
        router.get("/alunos", controller.listar); // listando todos os alunos
        router.get(
            "/alunos/:id",
            [validateUidFormatMiddleware],
            controller.buscarPorID
        ); // buscar um aluno por ID
        router.post("/alunos", controller.cadastrar); // cadastrando um aluno

        // Rotas privadas - é preciso estar logado
        router.put("/alunos", [authMiddleware], controller.atualizar); // atualizar um aluno
        router.delete("/alunos", [authMiddleware], controller.deletar); // excluir um aluno

        router.post(
            "/alunos/enderecos",
            [authMiddleware],
            controllerEnderecos.cadastrar
        );
        router.put(
            "/alunos/enderecos",
            [authMiddleware],
            controllerEnderecos.atualizar
        );

        return router;
    }
}