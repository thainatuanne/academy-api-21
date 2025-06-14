import request from 'supertest';
import app from '../app';
import { prismaClient } from '../database/prisma.client';

jest.mock('../database/prisma.client', () => ({
    prismaClient: {
        avaliacao: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    },
}));

describe('Testes da rota /avaliacoes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Deve criar uma avaliação', async () => {
        (prismaClient.avaliacao.create as jest.Mock).mockResolvedValue({
            id: '1',
            nome: 'Avaliação 1',
        });

        const response = await request(app).post('/avaliacoes').send({
            nome: 'Avaliação 1',
        });

        expect(response.status).toBe(201);
        expect(response.body.nome).toBe('Avaliação 1');
    });

    it('Deve listar todas as avaliações', async () => {
        (prismaClient.avaliacao.findMany as jest.Mock).mockResolvedValue([
            { id: '1', nome: 'Avaliação 1' },
            { id: '2', nome: 'Avaliação 2' },
        ]);

        const response = await request(app).get('/avaliacoes');

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });

    it('Deve buscar uma avaliação por ID', async () => {
        (prismaClient.avaliacao.findUnique as jest.Mock).mockResolvedValue({
            id: '1',
            nome: 'Avaliação 1',
        });

        const response = await request(app).get('/avaliacoes/1');

        expect(response.status).toBe(200);
        expect(response.body.nome).toBe('Avaliação 1');
    });

    it('Deve atualizar uma avaliação', async () => {
        (prismaClient.avaliacao.update as jest.Mock).mockResolvedValue({
            id: '1',
            nome: 'Avaliação Atualizada',
        });

        const response = await request(app).put('/avaliacoes/1').send({
            nome: 'Avaliação Atualizada',
        });

        expect(response.status).toBe(200);
        expect(response.body.nome).toBe('Avaliação Atualizada');
    });

    it('Deve deletar uma avaliação', async () => {
        (prismaClient.avaliacao.delete as jest.Mock).mockResolvedValue({
            id: '1',
            nome: 'Avaliação 1',
        });

        const response = await request(app).delete('/avaliacoes/1');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Avaliação deletada com sucesso');
    });
});
