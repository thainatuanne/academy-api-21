import request from 'supertest';
import app from '../app';
import { prismaClient } from '../database/prisma.client';

jest.mock('../database/prisma.client', () => ({
    prismaClient: {
        projeto: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    },
}));

describe('Testes da rota /projetos', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Deve criar um projeto', async () => {
        (prismaClient.projeto.create as jest.Mock).mockResolvedValue({
            id: '1',
            nome: 'Projeto 1',
        });

        const response = await request(app).post('/projetos').send({
            nome: 'Projeto 1',
        });

        expect(response.status).toBe(201);
        expect(response.body.nome).toBe('Projeto 1');
    });

    it('Deve listar todos os projetos', async () => {
        (prismaClient.projeto.findMany as jest.Mock).mockResolvedValue([
            { id: '1', nome: 'Projeto 1' },
            { id: '2', nome: 'Projeto 2' },
        ]);

        const response = await request(app).get('/projetos');

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });

    it('Deve buscar um projeto por ID', async () => {
        (prismaClient.projeto.findUnique as jest.Mock).mockResolvedValue({
            id: '1',
            nome: 'Projeto 1',
        });

        const response = await request(app).get('/projetos/1');

        expect(response.status).toBe(200);
        expect(response.body.nome).toBe('Projeto 1');
    });

    it('Deve atualizar um projeto', async () => {
        (prismaClient.projeto.update as jest.Mock).mockResolvedValue({
            id: '1',
            nome: 'Projeto Atualizado',
        });

        const response = await request(app).put('/projetos/1').send({
            nome: 'Projeto Atualizado',
        });

        expect(response.status).toBe(200);
        expect(response.body.nome).toBe('Projeto Atualizado');
    });

    it('Deve deletar um projeto', async () => {
        (prismaClient.projeto.delete as jest.Mock).mockResolvedValue({
            id: '1',
            nome: 'Projeto 1',
        });

        const response = await request(app).delete('/projetos/1');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Projeto deletado com sucesso');
    });
});
