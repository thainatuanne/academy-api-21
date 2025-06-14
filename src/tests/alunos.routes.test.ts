import request from 'supertest';
import app from '../app';
import { prismaClient } from '../database/prisma.client';

jest.mock('../database/prisma.client', () => ({
    prismaClient: {
        aluno: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    },
}));

describe('Testes da rota /alunos', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // POST - Criar aluno
    it('Deve criar um aluno com sucesso', async () => {
        (prismaClient.aluno.create as jest.Mock).mockResolvedValue({
            id: '123',
            nome: 'Maria Silva',
            email: 'maria@gmail.com',
        });

        const response = await request(app)
            .post('/alunos')
            .send({
                nome: 'Maria Silva',
                email: 'maria@gmail.com',
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.nome).toBe('Maria Silva');
    });

    it('Deve retornar erro se não informar o nome', async () => {
        const response = await request(app)
            .post('/alunos')
            .send({
                email: 'maria@gmail.com',
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Nome é obrigatório');
    });

    // GET - Listar alunos
    it('Deve listar todos os alunos', async () => {
        (prismaClient.aluno.findMany as jest.Mock).mockResolvedValue([
            { id: '1', nome: 'Maria Silva', email: 'maria@gmail.com' },
            { id: '2', nome: 'João Souza', email: 'joao@gmail.com' },
        ]);

        const response = await request(app).get('/alunos');

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
        expect(response.body[0].nome).toBe('Maria Silva');
    });

    // GET - Buscar aluno por ID
    it('Deve buscar um aluno por ID', async () => {
        (prismaClient.aluno.findUnique as jest.Mock).mockResolvedValue({
            id: '123',
            nome: 'Maria Silva',
            email: 'maria@gmail.com',
        });

        const response = await request(app).get('/alunos/123');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', '123');
        expect(response.body.nome).toBe('Maria Silva');
    });

    it('Deve retornar erro se aluno não for encontrado por ID', async () => {
        (prismaClient.aluno.findUnique as jest.Mock).mockResolvedValue(null);

        const response = await request(app).get('/alunos/999');

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Aluno não encontrado');
    });

    // PUT - Atualizar aluno
    it('Deve atualizar um aluno com sucesso', async () => {
        (prismaClient.aluno.update as jest.Mock).mockResolvedValue({
            id: '123',
            nome: 'Maria Atualizada',
            email: 'maria_atualizada@gmail.com',
        });

        const response = await request(app)
            .put('/alunos/123')
            .send({
                nome: 'Maria Atualizada',
                email: 'maria_atualizada@gmail.com',
            });

        expect(response.status).toBe(200);
        expect(response.body.nome).toBe('Maria Atualizada');
    });

    it('Deve retornar erro se tentar atualizar aluno inexistente', async () => {
        (prismaClient.aluno.update as jest.Mock).mockRejectedValue(
            new Error('Aluno não encontrado')
        );

        const response = await request(app)
            .put('/alunos/999')
            .send({
                nome: 'Inexistente',
                email: 'inexistente@gmail.com',
            });

        expect(response.status).toBe(404);
    });

    // DELETE - Deletar aluno
    it('Deve deletar um aluno com sucesso', async () => {
        (prismaClient.aluno.delete as jest.Mock).mockResolvedValue({
            id: '123',
            nome: 'Maria Silva',
            email: 'maria@gmail.com',
        });

        const response = await request(app).delete('/alunos/123');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Aluno deletado com sucesso');
    });

    it('Deve retornar erro se tentar deletar aluno inexistente', async () => {
        (prismaClient.aluno.delete as jest.Mock).mockRejectedValue(
            new Error('Aluno não encontrado')
        );

        const response = await request(app).delete('/alunos/999');

        expect(response.status).toBe(404);
    });
});
