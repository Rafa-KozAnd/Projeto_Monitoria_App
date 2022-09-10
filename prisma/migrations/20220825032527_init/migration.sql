/*
  Warnings:

  - A unique constraint covering the columns `[matricula_aluno,id_vaga]` on the table `Vagaaluno_monitoria` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Vagaaluno_monitoria_id_vaga_key";

-- DropIndex
DROP INDEX "Vagaaluno_monitoria_matricula_aluno_key";

-- CreateIndex
CREATE UNIQUE INDEX "Vagaaluno_monitoria_matricula_aluno_id_vaga_key" ON "Vagaaluno_monitoria"("matricula_aluno", "id_vaga");
