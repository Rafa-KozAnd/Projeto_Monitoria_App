/*
  Warnings:

  - You are about to drop the column `em_aberto` on the `VagaMonitoria` table. All the data in the column will be lost.
  - Added the required column `codigo_disciplina` to the `VagaMonitoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `VagaMonitoria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VagaMonitoria" DROP COLUMN "em_aberto",
ADD COLUMN     "codigo_disciplina" TEXT NOT NULL,
ADD COLUMN     "status" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "VagaMonitoria" ADD CONSTRAINT "VagaMonitoria_codigo_disciplina_fkey" FOREIGN KEY ("codigo_disciplina") REFERENCES "Disciplina"("codigo_disciplina") ON DELETE RESTRICT ON UPDATE CASCADE;
