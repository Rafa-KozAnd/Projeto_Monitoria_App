/*
  Warnings:

  - Changed the type of `role` on the `Colaborador` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Professor', 'Coordenador', 'ProfessorCoordenador');

-- AlterTable
ALTER TABLE "Colaborador" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL;

-- CreateTable
CREATE TABLE "SolicitacaoMonitoria" (
    "id" INTEGER NOT NULL,
    "codigo_disciplina" TEXT NOT NULL,
    "motivo" TEXT NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "SolicitacaoMonitoria_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SolicitacaoMonitoria" ADD CONSTRAINT "SolicitacaoMonitoria_codigo_disciplina_fkey" FOREIGN KEY ("codigo_disciplina") REFERENCES "Disciplina"("codigo_disciplina") ON DELETE RESTRICT ON UPDATE CASCADE;
