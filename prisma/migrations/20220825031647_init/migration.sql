/*
  Warnings:

  - You are about to drop the column `status` on the `VagaMonitoria` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_vaga]` on the table `VagaAlunoMonitoria` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "VagaAlunoMonitoria" ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "VagaMonitoria" DROP COLUMN "status";

-- CreateIndex
CREATE UNIQUE INDEX "VagaAlunoMonitoria_id_vaga_key" ON "VagaAlunoMonitoria"("id_vaga");
