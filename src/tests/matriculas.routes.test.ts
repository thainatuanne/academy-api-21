import request from 'supertest';
import app from '../app';
import { prismaClient } from '../database/prisma.client';

jest.mock('../database/prisma.client', () => ({
    prismaClient: {
        matricula: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    },
}));

describe('Testes da rota /matriculas', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Deve criar uma matrícula', async () => {
        (prismaClient.matricula.create as jest.Mock).mockResolvedValue({
            id: '1',
            nome: 'Matrícula 1',
        });

        const response = await request(app).post('/matriculas').send({
            nome: 'Matrícula 1',
        });

        expect(response.status).toBe(201);
        expect(response.body.nome).toBe('Matrícula 1');
    });

    it('Deve listar todas as matrículas', async () => {
        (prismaClient.matricula.findMany as jest.Mock).mockResolvedValue([
            { id: '1', nome: 'Matrícula 1' },
            { id: '2', nome: 'Matrícula 2' },
        ]);

        const response = await request(app).get('/matriculas');

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });

    it('Deve buscar uma matrícula por ID', async () => {
        (prismaClient.matricula.findUnique as jest.Mock).mockResolvedValue({
            id: '1',
            nome: 'Matrícula 1',
        });

        const response = await request(app).get('/matriculas/1');

        expect(response.status).toBe(200);
        expect(response.body.nome).toBe('Matrícula 1');
    });

    it('Deve atualizar uma matrícula', async () => {
        (prismaClient.matricula.update as jest.Mock).mockResolvedValue({
            id: '1',
            nome: 'Matrícula Atualizada',
        });

        const response = await request(app).put('/matriculas/1').send({
            nome: 'Matrícula Atualizada',
        });

        expect(response.status).toBe(200);
        expect(response.body.nome).toBe('Matrícula Atualizada');
    });

    it('Deve deletar uma matrícula', async () => {
        (prismaClient.matricula.delete as jest.Mock).mockResolvedValue({
            id: '1',
            nome: 'Matrícula 1',
        });

        const response = await request(app).delete('/matriculas/1');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Matrícula deletada com sucesso');
    });
});
