-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pendente', 'Aprovado', 'Cancelado');

-- AlterTable
ALTER TABLE "agendamento" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Pendente';
