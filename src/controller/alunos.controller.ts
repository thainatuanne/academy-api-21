import { Request, Response } from "express";
// controllers o que deve acontecer em uma requisição

export class AlunosController {
    public async listar(req: Request, res: Response): Promise<void> { }
    // qual logica deve acontecer nessa função
    public async buscarPorID(req: Request, res: Response): Promise<void> { }

    public async cadastrar(req: Request, res: Response): Promise<void> { }

    public async atualizar(req: Request, res: Response): Promise<void> { }

    public async deletar(req: Request, res: Response): Promise<void> { }
}