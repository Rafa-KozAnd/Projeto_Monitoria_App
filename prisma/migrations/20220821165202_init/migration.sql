/*
  Warnings:

  - You are about to drop the column `matriccula_aluno` on the `AlunoMonitoria` table. All the data in the column will be lost.
  - You are about to drop the `Meeting` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `matricula_aluno` to the `AlunoMonitoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horario` to the `Monitoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_monitoria` to the `VagaMonitoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pre_requisito` to the `VagaMonitoria` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AlunoMonitoria" DROP CONSTRAINT "AlunoMonitoria_matriccula_aluno_fkey";

-- AlterTable
ALTER TABLE "AlunoMonitoria" DROP COLUMN "matriccula_aluno",
ADD COLUMN     "matricula_aluno" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Monitoria" ADD COLUMN     "horario" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "VagaMonitoria" ADD COLUMN     "id_monitoria" INTEGER NOT NULL,
ADD COLUMN     "pre_requisito" TEXT NOT NULL;

-- DropTable
DROP TABLE "Meeting";

-- CreateTable
CREATE TABLE "Agendamento" (
    "id" INTEGER NOT NULL,
    "agendamento" TEXT NOT NULL,
    "matricula_aluno" TEXT NOT NULL,
    "id_monitoria" INTEGER NOT NULL,
    "horario" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Agendamento_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_matricula_aluno_fkey" FOREIGN KEY ("matricula_aluno") REFERENCES "Aluno"("matricula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_id_monitoria_fkey" FOREIGN KEY ("id_monitoria") REFERENCES "Monitoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlunoMonitoria" ADD CONSTRAINT "AlunoMonitoria_matricula_aluno_fkey" FOREIGN KEY ("matricula_aluno") REFERENCES "Aluno"("matricula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Monitoria" ADD CONSTRAINT "Monitoria_codigo_disciplina_fkey" FOREIGN KEY ("codigo_disciplina") REFERENCES "Disciplina"("codigo_disciplina") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VagaMonitoria" ADD CONSTRAINT "VagaMonitoria_id_monitoria_fkey" FOREIGN KEY ("id_monitoria") REFERENCES "Monitoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
