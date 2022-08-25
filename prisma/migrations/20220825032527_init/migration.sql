/*
  Warnings:

  - A unique constraint covering the columns `[matricula_aluno,id_vaga]` on the table `VagaAlunoMonitoria` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "VagaAlunoMonitoria_id_vaga_key";

-- DropIndex
DROP INDEX "VagaAlunoMonitoria_matricula_aluno_key";

-- CreateIndex
CREATE UNIQUE INDEX "VagaAlunoMonitoria_matricula_aluno_id_vaga_key" ON "VagaAlunoMonitoria"("matricula_aluno", "id_vaga");
