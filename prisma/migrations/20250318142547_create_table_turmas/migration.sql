-- CreateTable
CREATE TABLE "turmas" (
    "id" UUID NOT NULL,
    "programa" VARCHAR(100) NOT NULL,
    "edicao" SMALLINT NOT NULL,
    "max_alunos" SMALLINT NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "turmas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "turmas_programa_edicao_key" ON "turmas"("programa", "edicao");
