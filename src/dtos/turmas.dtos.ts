// DTO -> Data Transfer Object -> objeto de transferencia de dados estruturados

export interface CadastrarTurmaDto {
    programa: string;
    edicao: number;
    maxAlunos: number;
}

export interface ListarTurmaDto {
    programa?: string;
    edicao?: number;
}

export type AtualizarTurmaDto = Partial<CadastrarTurmaDto> & { id: string };