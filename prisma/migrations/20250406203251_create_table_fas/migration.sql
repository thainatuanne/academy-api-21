-- CreateTable
CREATE TABLE "fas" (
    "aluno_original_id" UUID NOT NULL,
    "aluno_fa_id" UUID NOT NULL,

    CONSTRAINT "fas_pkey" PRIMARY KEY ("aluno_original_id","aluno_fa_id")
);
