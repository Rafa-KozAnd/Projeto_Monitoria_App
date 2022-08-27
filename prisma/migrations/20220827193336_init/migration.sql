-- AlterTable
CREATE SEQUENCE "solicitacaomonitoria_id_seq";
ALTER TABLE "SolicitacaoMonitoria" ALTER COLUMN "id" SET DEFAULT nextval('solicitacaomonitoria_id_seq');
ALTER SEQUENCE "solicitacaomonitoria_id_seq" OWNED BY "SolicitacaoMonitoria"."id";

-- AlterTable
ALTER TABLE "VagaAlunoMonitoria" ADD COLUMN     "motivo" TEXT;

-- AlterTable
CREATE SEQUENCE "vagamonitoria_id_seq";
ALTER TABLE "VagaMonitoria" ALTER COLUMN "id" SET DEFAULT nextval('vagamonitoria_id_seq');
ALTER SEQUENCE "vagamonitoria_id_seq" OWNED BY "VagaMonitoria"."id";
