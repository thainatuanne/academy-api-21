// DTO -> Data Transfer Object -> objeto de transferencia de dados estruturados

export interface CadastrarAlunoDto {
    nome: string;
    idade?: number;
    email: string;
    senha: string;
}

export interface ListarAlunosDto {
    nome?: string;
}

export type AtualizarAlunoDto = Partial<CadastrarAlunoDto> & { id: string };