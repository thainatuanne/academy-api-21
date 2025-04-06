import { Endereco } from "@prisma/client";
import { prismaClient } from "../database/prisma.client";
import { HTTPError } from "../utils/https.error";
import {
    AtualizarEnderecoDto,
    CadastrarEnderecoDto,
} from "../dtos/endereco.dto";

export class EnderecosService {
    public async cadastrar({
        alunoId,
        bairro,
        cep,
        cidade,
        logradouro,
        numero,
        pais,
        uf,
        complemento,
    }: CadastrarEnderecoDto): Promise<Endereco> {
        const enderecoJaCadastrado = await prismaClient.endereco.findUnique({
            where: { alunoId },
        });

        if (enderecoJaCadastrado) {
            throw new HTTPError(409, "Endereço do aluno já cadastrado");
        }

        const enderecoDoAluno = await prismaClient.endereco.create({
            data: {
                bairro,
                cep,
                cidade,
                logradouro,
                numero,
                pais,
                uf,
                alunoId,
                complemento,
            },
        });

        return enderecoDoAluno;
    }

    public async buscarPorIdAluno(alunoId: string): Promise<Endereco> {
        const endereco = await prismaClient.endereco.findUnique({
            where: { alunoId },
        });

        if (!endereco) {
            throw new HTTPError(404, "Endereço do aluno não encontrado");
        }

        return endereco;
    }

    public async atualizar({
        alunoId,
        bairro,
        cep,
        cidade,
        logradouro,
        numero,
        pais,
        uf,
        complemento,
    }: AtualizarEnderecoDto): Promise<Endereco> {
        await this.buscarPorIdAluno(alunoId);

        const enderecoAtualizado = await prismaClient.endereco.update({
            where: { alunoId },
            data: {
                bairro,
                cep,
                cidade,
                logradouro,
                numero,
                pais,
                uf,
                complemento,
            },
        });

        return enderecoAtualizado;
    }
}