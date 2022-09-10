/*
  Warnings:

  - You are about to drop the column `status` on the `VagaMonitoria` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_vaga]` on the table `Vagaaluno_monitoria` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Vagaaluno_monitoria" ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "VagaMonitoria" DROP COLUMN "status";

-- CreateIndex
CREATE UNIQUE INDEX "Vagaaluno_monitoria_id_vaga_key" ON "Vagaaluno_monitoria"("id_vaga");
