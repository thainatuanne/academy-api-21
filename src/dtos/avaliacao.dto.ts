export interface CriarAvaliacaoDTO {
    nota: number;
    comentario?: string;
    alunoId: string;
    autor: {
        id: string;
        tipo: "M" | "T" | "F";
    };
}

export interface AtualizarAvaliacaoDTO {
    id: string;
    nota?: number;
    comentario?: string;
    autor: {
        id: string;
        tipo: "M" | "T" | "F";
    };
}

export interface DeletarAvaliacaoDTO {
    id: string;
    autor: {
        id: string;
        tipo: "M" | "T" | "F";
    };
}

export interface ListarAvaliacaoPorAlunoDTO {
    alunoId: string;
    autor: {
        id: string;
        tipo: "M" | "T" | "F";
    };
}
