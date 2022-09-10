/*
  Warnings:

  - You are about to drop the `Agendamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Aluno` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Colaborador` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Disciplina` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Monitoria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SolicitacaoAgendamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SolicitacaoMonitoria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VagaMonitoria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vagaaluno_monitoria` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Agendamento" DROP CONSTRAINT "Agendamento_id_monitoria_fkey";

-- DropForeignKey
ALTER TABLE "Agendamento" DROP CONSTRAINT "Agendamento_matricula_aluno_fkey";

-- DropForeignKey
ALTER TABLE "Disciplina" DROP CONSTRAINT "Disciplina_professor_disciplina_fkey";

-- DropForeignKey
ALTER TABLE "Monitoria" DROP CONSTRAINT "Monitoria_codigo_disciplina_fkey";

-- DropForeignKey
ALTER TABLE "Monitoria" DROP CONSTRAINT "Monitoria_codigo_professor_fkey";

-- DropForeignKey
ALTER TABLE "SolicitacaoMonitoria" DROP CONSTRAINT "SolicitacaoMonitoria_codigo_disciplina_fkey";

-- DropForeignKey
ALTER TABLE "SolicitacaoMonitoria" DROP CONSTRAINT "SolicitacaoMonitoria_matricula_aluno_fkey";

-- DropForeignKey
ALTER TABLE "VagaMonitoria" DROP CONSTRAINT "VagaMonitoria_codigo_disciplina_fkey";

-- DropForeignKey
ALTER TABLE "VagaMonitoria" DROP CONSTRAINT "VagaMonitoria_id_monitoria_fkey";

-- DropForeignKey
ALTER TABLE "VagaMonitoria" DROP CONSTRAINT "VagaMonitoria_professor_requisitante_fkey";

-- DropForeignKey
ALTER TABLE "Vagaaluno_monitoria" DROP CONSTRAINT "Vagaaluno_monitoria_id_vaga_fkey";

-- DropForeignKey
ALTER TABLE "Vagaaluno_monitoria" DROP CONSTRAINT "Vagaaluno_monitoria_matricula_aluno_fkey";

-- DropForeignKey
ALTER TABLE "aluno_monitoria" DROP CONSTRAINT "aluno_monitoria_id_monitoria_fkey";

-- DropForeignKey
ALTER TABLE "aluno_monitoria" DROP CONSTRAINT "aluno_monitoria_matricula_aluno_fkey";

-- AlterTable
CREATE SEQUENCE "aluno_monitoria_id_seq";
ALTER TABLE "aluno_monitoria" ALTER COLUMN "id" SET DEFAULT nextval('aluno_monitoria_id_seq');
ALTER SEQUENCE "aluno_monitoria_id_seq" OWNED BY "aluno_monitoria"."id";

-- DropTable
DROP TABLE "Agendamento";

-- DropTable
DROP TABLE "Aluno";

-- DropTable
DROP TABLE "Colaborador";

-- DropTable
DROP TABLE "Disciplina";

-- DropTable
DROP TABLE "Monitoria";

-- DropTable
DROP TABLE "SolicitacaoAgendamento";

-- DropTable
DROP TABLE "SolicitacaoMonitoria";

-- DropTable
DROP TABLE "VagaMonitoria";

-- DropTable
DROP TABLE "Vagaaluno_monitoria";

-- CreateTable
CREATE TABLE "aluno" (
    "matricula" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "e_monitor" BOOLEAN NOT NULL,

    CONSTRAINT "aluno_pkey" PRIMARY KEY ("matricula")
);

-- CreateTable
CREATE TABLE "solicitacao_agendamento" (
    "matriculaAluno" TEXT NOT NULL,
    "dataSolicitacao" TIMESTAMP(3) NOT NULL,
    "agendamento" TEXT NOT NULL,
    "id_monitoria" TEXT NOT NULL,

    CONSTRAINT "solicitacao_agendamento_pkey" PRIMARY KEY ("matriculaAluno")
);

-- CreateTable
CREATE TABLE "agendamento" (
    "id" SERIAL NOT NULL,
    "agendamento" TEXT NOT NULL,
    "matricula_aluno" TEXT NOT NULL,
    "id_monitoria" INTEGER NOT NULL,
    "horario" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agendamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "colaborador" (
    "cpf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "colaborador_pkey" PRIMARY KEY ("cpf")
);

-- CreateTable
CREATE TABLE "monitoria" (
    "id" SERIAL NOT NULL,
    "codigo_disciplina" TEXT NOT NULL,
    "codigo_professor" TEXT NOT NULL,
    "horario" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "monitoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disciplina" (
    "codigo_disciplina" TEXT NOT NULL,
    "professor_disciplina" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "disciplina_pkey" PRIMARY KEY ("codigo_disciplina")
);

-- CreateTable
CREATE TABLE "vaga_monitoria" (
    "id" SERIAL NOT NULL,
    "professor_requisitante" TEXT NOT NULL,
    "id_monitoria" INTEGER NOT NULL,
    "codigo_disciplina" TEXT NOT NULL,
    "aprovado" BOOLEAN NOT NULL,
    "pre_requisito" TEXT,

    CONSTRAINT "vaga_monitoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vaga_aluno_monitoria" (
    "matricula_aluno" TEXT NOT NULL,
    "id_vaga" INTEGER NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "motivo" TEXT
);

-- CreateTable
CREATE TABLE "solicitacao_monitoria" (
    "id" SERIAL NOT NULL,
    "codigo_disciplina" TEXT NOT NULL,
    "motivo" TEXT,
    "status" INTEGER NOT NULL,
    "monitorRecomendado" TEXT,
    "matricula_aluno" TEXT NOT NULL,

    CONSTRAINT "solicitacao_monitoria_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vaga_aluno_monitoria_matricula_aluno_id_vaga_key" ON "vaga_aluno_monitoria"("matricula_aluno", "id_vaga");

-- AddForeignKey
ALTER TABLE "agendamento" ADD CONSTRAINT "agendamento_matricula_aluno_fkey" FOREIGN KEY ("matricula_aluno") REFERENCES "aluno"("matricula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agendamento" ADD CONSTRAINT "agendamento_id_monitoria_fkey" FOREIGN KEY ("id_monitoria") REFERENCES "monitoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aluno_monitoria" ADD CONSTRAINT "aluno_monitoria_matricula_aluno_fkey" FOREIGN KEY ("matricula_aluno") REFERENCES "aluno"("matricula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aluno_monitoria" ADD CONSTRAINT "aluno_monitoria_id_monitoria_fkey" FOREIGN KEY ("id_monitoria") REFERENCES "monitoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monitoria" ADD CONSTRAINT "monitoria_codigo_disciplina_fkey" FOREIGN KEY ("codigo_disciplina") REFERENCES "disciplina"("codigo_disciplina") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monitoria" ADD CONSTRAINT "monitoria_codigo_professor_fkey" FOREIGN KEY ("codigo_professor") REFERENCES "colaborador"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplina" ADD CONSTRAINT "disciplina_professor_disciplina_fkey" FOREIGN KEY ("professor_disciplina") REFERENCES "colaborador"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vaga_monitoria" ADD CONSTRAINT "vaga_monitoria_professor_requisitante_fkey" FOREIGN KEY ("professor_requisitante") REFERENCES "colaborador"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vaga_monitoria" ADD CONSTRAINT "vaga_monitoria_id_monitoria_fkey" FOREIGN KEY ("id_monitoria") REFERENCES "monitoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vaga_monitoria" ADD CONSTRAINT "vaga_monitoria_codigo_disciplina_fkey" FOREIGN KEY ("codigo_disciplina") REFERENCES "disciplina"("codigo_disciplina") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vaga_aluno_monitoria" ADD CONSTRAINT "vaga_aluno_monitoria_matricula_aluno_fkey" FOREIGN KEY ("matricula_aluno") REFERENCES "aluno"("matricula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vaga_aluno_monitoria" ADD CONSTRAINT "vaga_aluno_monitoria_id_vaga_fkey" FOREIGN KEY ("id_vaga") REFERENCES "vaga_monitoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitacao_monitoria" ADD CONSTRAINT "solicitacao_monitoria_codigo_disciplina_fkey" FOREIGN KEY ("codigo_disciplina") REFERENCES "disciplina"("codigo_disciplina") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitacao_monitoria" ADD CONSTRAINT "solicitacao_monitoria_matricula_aluno_fkey" FOREIGN KEY ("matricula_aluno") REFERENCES "aluno"("matricula") ON DELETE RESTRICT ON UPDATE CASCADE;
