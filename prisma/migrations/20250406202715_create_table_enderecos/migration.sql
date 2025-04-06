-- CreateTable
CREATE TABLE "enderecos" (
    "id" UUID NOT NULL,
    "logradouro" VARCHAR(100) NOT NULL,
    "numero" VARCHAR(50) NOT NULL,
    "complemento" VARCHAR(50),
    "cep" VARCHAR(8) NOT NULL,
    "bairro" VARCHAR(100) NOT NULL,
    "cidade" VARCHAR(100) NOT NULL,
    "uf" VARCHAR(2) NOT NULL,
    "pais" VARCHAR(100) NOT NULL,
    "aluno_id" UUID NOT NULL,

    CONSTRAINT "enderecos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "enderecos_aluno_id_key" ON "enderecos"("aluno_id");
