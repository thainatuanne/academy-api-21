// DTO -> Data Transfer Object -> objeto de transferencia de dados estruturados

export interface CadastrarEnderecoDto {
    alunoId: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    cep: string;
    bairro: string;
    cidade: string;
    uf: string;
    pais: string;
}

export type AtualizarEnderecoDto = Partial<CadastrarEnderecoDto> & {
    alunoId: string;
};