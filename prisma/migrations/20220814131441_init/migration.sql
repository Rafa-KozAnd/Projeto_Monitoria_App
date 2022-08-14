-- CreateTable
CREATE TABLE "Aluno" (
    "matricula" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "e_monitor" BOOLEAN NOT NULL,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("matricula")
);

-- CreateTable
CREATE TABLE "SolicitacaoAgendamento" (
    "matriculaAluno" TEXT NOT NULL,
    "dataSolicitacao" TIMESTAMP(3) NOT NULL,
    "agendamento" TEXT NOT NULL,
    "id_monitoria" TEXT NOT NULL,

    CONSTRAINT "SolicitacaoAgendamento_pkey" PRIMARY KEY ("matriculaAluno")
);

-- CreateTable
CREATE TABLE "AlunoMonitoria" (
    "id" INTEGER NOT NULL,
    "matriccula_aluno" TEXT NOT NULL,
    "id_monitoria" INTEGER NOT NULL,

    CONSTRAINT "AlunoMonitoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meeting" (
    "id" INTEGER NOT NULL,
    "agendamento" TEXT NOT NULL,
    "matriculaAluno" TEXT NOT NULL,
    "idMonitoria" TEXT NOT NULL,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Colaborador" (
    "cadastro" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Colaborador_pkey" PRIMARY KEY ("cadastro")
);

-- CreateTable
CREATE TABLE "colaboradorFuncao" (
    "id" TEXT NOT NULL,
    "id_colaborador" TEXT NOT NULL,
    "idFuncao" TEXT NOT NULL,

    CONSTRAINT "colaboradorFuncao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "funcao" (
    "id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "funcao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Monitoria" (
    "id" INTEGER NOT NULL,
    "codigo_disciplina" TEXT NOT NULL,
    "nome_disciplina" TEXT NOT NULL,
    "codigo_professor" TEXT NOT NULL,

    CONSTRAINT "Monitoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disciplina" (
    "codigo_disciplina" TEXT NOT NULL,
    "professor_disciplina" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Disciplina_pkey" PRIMARY KEY ("codigo_disciplina")
);

-- CreateTable
CREATE TABLE "VagaMonitoria" (
    "id" INTEGER NOT NULL,
    "professor_requisitante" TEXT NOT NULL,
    "monitoria" INTEGER NOT NULL,
    "em_aberto" BOOLEAN NOT NULL,
    "aprovado" BOOLEAN NOT NULL,

    CONSTRAINT "VagaMonitoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VagaAlunoMonitoria" (
    "matricula_aluno" TEXT NOT NULL,
    "id_vaga" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "funcao_nome_key" ON "funcao"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "VagaAlunoMonitoria_matricula_aluno_key" ON "VagaAlunoMonitoria"("matricula_aluno");

-- AddForeignKey
ALTER TABLE "AlunoMonitoria" ADD CONSTRAINT "AlunoMonitoria_matriccula_aluno_fkey" FOREIGN KEY ("matriccula_aluno") REFERENCES "Aluno"("matricula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlunoMonitoria" ADD CONSTRAINT "AlunoMonitoria_id_monitoria_fkey" FOREIGN KEY ("id_monitoria") REFERENCES "Monitoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Monitoria" ADD CONSTRAINT "Monitoria_codigo_professor_fkey" FOREIGN KEY ("codigo_professor") REFERENCES "Colaborador"("cadastro") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disciplina" ADD CONSTRAINT "Disciplina_professor_disciplina_fkey" FOREIGN KEY ("professor_disciplina") REFERENCES "Colaborador"("cadastro") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VagaMonitoria" ADD CONSTRAINT "VagaMonitoria_professor_requisitante_fkey" FOREIGN KEY ("professor_requisitante") REFERENCES "Colaborador"("cadastro") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VagaAlunoMonitoria" ADD CONSTRAINT "VagaAlunoMonitoria_matricula_aluno_fkey" FOREIGN KEY ("matricula_aluno") REFERENCES "Aluno"("matricula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VagaAlunoMonitoria" ADD CONSTRAINT "VagaAlunoMonitoria_id_vaga_fkey" FOREIGN KEY ("id_vaga") REFERENCES "VagaMonitoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
