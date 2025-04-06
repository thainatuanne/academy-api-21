-- AddForeignKey
ALTER TABLE "enderecos" ADD CONSTRAINT "enderecos_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "alunos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projetos" ADD CONSTRAINT "projetos_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "alunos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matriculas" ADD CONSTRAINT "matriculas_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "alunos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matriculas" ADD CONSTRAINT "matriculas_turma_id_fkey" FOREIGN KEY ("turma_id") REFERENCES "turmas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fas" ADD CONSTRAINT "fas_aluno_original_id_fkey" FOREIGN KEY ("aluno_original_id") REFERENCES "alunos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fas" ADD CONSTRAINT "fas_aluno_fa_id_fkey" FOREIGN KEY ("aluno_fa_id") REFERENCES "alunos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
