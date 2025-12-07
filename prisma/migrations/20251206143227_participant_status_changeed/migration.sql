/*
  Warnings:

  - You are about to drop the column `eventId` on the `partner` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "partner" DROP CONSTRAINT "partner_eventId_fkey";

-- AlterTable
ALTER TABLE "partner" DROP COLUMN "eventId";
