import { Request, Response, NextFunction } from 'express';
import { autorizarPorTipo } from '../middlewares/autorizar-por-tipo.middleware';

describe('Middleware de autorização por tipo', () => {
    const req = {} as Request;
    const res = {} as Response;
    const next = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        res.status = jest.fn().mockReturnThis();
        res.json = jest.fn().mockReturnThis();
    });

    it('Deve permitir acesso se o tipo estiver autorizado', () => {
        req.alunoLogado = {
            id: '1',
            nome: 'Thainá',
            email: 'thaina@email.com',
            tipo: 'M', // Permitido
        };

        const middleware = autorizarPorTipo(['M']);
        middleware(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it('Deve bloquear acesso se o tipo não estiver autorizado', () => {
        req.alunoLogado = {
            id: '1',
            nome: 'Thainá',
            email: 'thaina@email.com',
            tipo: 'F', // Não permitido
        };

        const middleware = autorizarPorTipo(['M']);
        middleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Acesso não autorizado',
        });
    });

    it('Deve retornar erro se não houver aluno logado', () => {
        req.alunoLogado = undefined as any;

        const middleware = autorizarPorTipo(['M']);
        middleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Usuário não autenticado',
        });
    });
});
