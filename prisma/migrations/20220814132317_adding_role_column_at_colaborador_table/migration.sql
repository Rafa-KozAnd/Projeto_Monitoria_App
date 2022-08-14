/*
  Warnings:

  - Added the required column `role` to the `Colaborador` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Colaborador" ADD COLUMN     "role" TEXT NOT NULL;
