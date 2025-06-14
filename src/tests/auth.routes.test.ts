import request from 'supertest';
import app from '../app';
import { prismaClient } from '../database/prisma.client';
import jwt from 'jsonwebtoken';

jest.mock('../database/prisma.client');
jest.mock('jsonwebtoken');

describe('Testes das rotas de autenticação', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // 🔸 Teste de login com sucesso
    it('Deve realizar login e retornar token', async () => {
        (prismaClient.aluno.findUnique as jest.Mock).mockResolvedValue({
            id: '1',
            nome: 'Thainá',
            email: 'thaina@email.com',
            senha: '123456', // Senha simulada
            tipo: 'M',
        });

        (jwt.sign as jest.Mock).mockReturnValue('token_simulado');

        const response = await request(app).post('/auth/login').send({
            email: 'thaina@email.com',
            senha: '123456',
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('sucesso', true);
        expect(response.body.dados).toHaveProperty('token');
        expect(response.body.dados.token).toBe('token_simulado');
    });

    // 🔸 Teste de erro no login (email não encontrado)
    it('Deve retornar erro se email não encontrado no login', async () => {
        (prismaClient.aluno.findUnique as jest.Mock).mockResolvedValue(null);

        const response = await request(app).post('/auth/login').send({
            email: 'naoexiste@email.com',
            senha: '123456',
        });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Usuário não encontrado');
    });

    // 🔸 Teste de erro no login (senha inválida)
    it('Deve retornar erro se senha estiver incorreta', async () => {
        (prismaClient.aluno.findUnique as jest.Mock).mockResolvedValue({
            id: '1',
            nome: 'Thainá',
            email: 'thaina@email.com',
            senha: 'senha_correta',
            tipo: 'M',
        });

        const response = await request(app).post('/auth/login').send({
            email: 'thaina@email.com',
            senha: 'senha_errada',
        });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Senha inválida');
    });

    // 🔸 Teste de logout
    it('Deve realizar logout com sucesso', async () => {
        (prismaClient.aluno.update as jest.Mock).mockResolvedValue({
            id: '1',
            nome: 'Thainá',
            email: 'thaina@email.com',
            tipo: 'M',
        });

        const response = await request(app)
            .post('/auth/logout')
            .set('Authorization', 'Bearer token_valido');

        expect(response.status).toBe(200);
        expect(response.body.sucesso).toBe(true);
        expect(response.body.mensagem).toBe('Logout efetuado com sucesso');
    });
});
