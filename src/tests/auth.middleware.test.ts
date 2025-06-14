import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token não enviado' });
    }

    try {
        const secret = process.env.JWT_SECRET || 'seu_segredo';
        const decoded = jwt.verify(token, secret) as {
            id: string;
            nome: string;
            email: string;
            tipo: 'M' | 'T' | 'F';
        };

        req.alunoLogado = {
            id: decoded.id,
            nome: decoded.nome,
            email: decoded.email,
            tipo: decoded.tipo,
        };

        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
}
