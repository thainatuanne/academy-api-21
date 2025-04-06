-- CreateEnum
CREATE TYPE "StatusProjeto" AS ENUM ('finalizado', 'em_andamento');

-- CreateTable
CREATE TABLE "projetos" (
    "id" UUID NOT NULL,
    "titulo" VARCHAR(50) NOT NULL,
    "descricao" TEXT,
    "ferramenta" VARCHAR(300) NOT NULL,
    "status" "StatusProjeto" NOT NULL,
    "aluno_id" UUID NOT NULL,

    CONSTRAINT "projetos_pkey" PRIMARY KEY ("id")
);
