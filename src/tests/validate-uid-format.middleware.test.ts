import { Request, Response, NextFunction } from 'express';
import { validateUidFormatMiddleware } from '../middlewares/validate-uid-format.middleware';

describe('Middleware de validação de UID', () => {
    const req = {} as Request;
    const res = {} as Response;
    const next = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        res.status = jest.fn().mockReturnThis();
        res.json = jest.fn().mockReturnThis();
    });

    it('Deve permitir se o UID estiver no formato correto', () => {
        req.params = { id: '123e4567-e89b-12d3-a456-426614174000' };

        validateUidFormatMiddleware(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it('Deve retornar erro se o UID estiver inválido', () => {
        req.params = { id: 'id-invalido' };

        validateUidFormatMiddleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({ message: 'ID inválido' });
    });
});
