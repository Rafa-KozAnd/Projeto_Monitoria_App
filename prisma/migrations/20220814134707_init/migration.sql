/*
  Warnings:

  - The primary key for the `Colaborador` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cadastro` on the `Colaborador` table. All the data in the column will be lost.
  - Added the required column `password` to the `Colaborador` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Disciplina" DROP CONSTRAINT "Disciplina_professor_disciplina_fkey";

-- DropForeignKey
ALTER TABLE "Monitoria" DROP CONSTRAINT "Monitoria_codigo_professor_fkey";

-- DropForeignKey
ALTER TABLE "VagaMonitoria" DROP CONSTRAINT "VagaMonitoria_professor_requisitante_fkey";

-- AlterTable
ALTER TABLE "Colaborador" DROP CONSTRAINT "Colaborador_pkey",
DROP COLUMN "cadastro",
ADD COLUMN     "password" TEXT NOT NULL,
ADD CONSTRAINT "Colaborador_pkey" PRIMARY KEY ("cpf");

-- AddForeignKey
ALTER TABLE "Monitoria" ADD CONSTRAINT "Monitoria_codigo_professor_fkey" FOREIGN KEY ("codigo_professor") REFERENCES "Colaborador"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disciplina" ADD CONSTRAINT "Disciplina_professor_disciplina_fkey" FOREIGN KEY ("professor_disciplina") REFERENCES "Colaborador"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VagaMonitoria" ADD CONSTRAINT "VagaMonitoria_professor_requisitante_fkey" FOREIGN KEY ("professor_requisitante") REFERENCES "Colaborador"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;
