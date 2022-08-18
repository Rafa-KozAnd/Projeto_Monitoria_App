/*
  Warnings:

  - Added the required column `matricula_aluno` to the `SolicitacaoMonitoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monitorRecomendado` to the `SolicitacaoMonitoria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SolicitacaoMonitoria" ADD COLUMN     "matricula_aluno" TEXT NOT NULL,
ADD COLUMN     "monitorRecomendado" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SolicitacaoMonitoria" ADD CONSTRAINT "SolicitacaoMonitoria_matricula_aluno_fkey" FOREIGN KEY ("matricula_aluno") REFERENCES "Aluno"("matricula") ON DELETE RESTRICT ON UPDATE CASCADE;
