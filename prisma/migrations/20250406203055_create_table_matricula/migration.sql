-- CreateTable
CREATE TABLE "matriculas" (
    "aluno_id" UUID NOT NULL,
    "turma_id" UUID NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "data_matricula" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "matriculas_pkey" PRIMARY KEY ("aluno_id","turma_id")
);
