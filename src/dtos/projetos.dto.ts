import { StatusProjeto } from "@prisma/client";

export interface BuscarPorIdDto {
    alunoId: string;
    projetoId: string;
}

export interface CadastrarProjetoDto {
    titulo: string;
    descricao?: string;
    ferramenta: string;
    status: StatusProjeto;
    alunoId: string;
}

export type AtualizarProjetoDto = Partial<CadastrarProjetoDto> & {
    projetoId: string;
    alunoId: string;
};