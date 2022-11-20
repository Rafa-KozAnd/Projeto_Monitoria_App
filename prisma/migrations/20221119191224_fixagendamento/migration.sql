/*
  Warnings:

  - Made the column `horario` on table `monitoria` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Dia" AS ENUM ('Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta');

-- AlterTable
ALTER TABLE "monitoria" ADD COLUMN     "dia" "Dia" NOT NULL DEFAULT 'Segunda',
ALTER COLUMN "horario" SET NOT NULL,
ALTER COLUMN "horario" SET DATA TYPE TIME(3);
