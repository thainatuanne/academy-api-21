import request from 'supertest';
import app from '../app';
import { prismaClient } from '../database/prisma.client';

jest.mock('../database/prisma.client', () => ({
    prismaClient: {
        turma: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    },
}));

describe('Testes da rota /turmas', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Deve criar uma turma', async () => {
        (prismaClient.turma.create as jest.Mock).mockResolvedValue({
            id: '1',
            nome: 'Turma A',
        });

        const response = await request(app).post('/turmas').send({
            nome: 'Turma A',
        });

        expect(response.status).toBe(201);
        expect(response.body.nome).toBe('Turma A');
    });

    it('Deve listar todas as turmas', async () => {
        (prismaClient.turma.findMany as jest.Mock).mockResolvedValue([
            { id: '1', nome: 'Turma A' },
            { id: '2', nome: 'Turma B' },
        ]);

        const response = await request(app).get('/turmas');

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });

    it('Deve buscar uma turma por ID', async () => {
        (prismaClient.turma.findUnique as jest.Mock).mockResolvedValue({
            id: '1',
            nome: 'Turma A',
        });

        const response = await request(app).get('/turmas/1');

        expect(response.status).toBe(200);
        expect(response.body.nome).toBe('Turma A');
    });

    it('Deve atualizar uma turma', async () => {
        (prismaClient.turma.update as jest.Mock).mockResolvedValue({
            id: '1',
            nome: 'Turma Atualizada',
        });

        const response = await request(app).put('/turmas/1').send({
            nome: 'Turma Atualizada',
        });

        expect(response.status).toBe(200);
        expect(response.body.nome).toBe('Turma Atualizada');
    });

    it('Deve deletar uma turma', async () => {
        (prismaClient.turma.delete as jest.Mock).mockResolvedValue({
            id: '1',
            nome: 'Turma A',
        });

        const response = await request(app).delete('/turmas/1');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Turma deletada com sucesso');
    });
});
