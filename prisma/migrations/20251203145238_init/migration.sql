/*
  Warnings:

  - You are about to drop the column `address` on the `hosts` table. All the data in the column will be lost.
  - You are about to drop the column `appointmentFee` on the `hosts` table. All the data in the column will be lost.
  - You are about to drop the column `contactNumber` on the `hosts` table. All the data in the column will be lost.
  - You are about to drop the column `currentWorkingPlace` on the `hosts` table. All the data in the column will be lost.
  - You are about to drop the column `designation` on the `hosts` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `hosts` table. All the data in the column will be lost.
  - You are about to drop the column `experience` on the `hosts` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `hosts` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `hosts` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `hosts` table. All the data in the column will be lost.
  - You are about to drop the column `profilePhoto` on the `hosts` table. All the data in the column will be lost.
  - You are about to drop the column `qualification` on the `hosts` table. All the data in the column will be lost.
  - You are about to drop the column `registrationNumber` on the `hosts` table. All the data in the column will be lost.
  - You are about to drop the column `needPasswordChange` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `admins` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `hosts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `hosts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PAID', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('CONFIRMED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('PENDING', 'APPROVED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "admins" DROP CONSTRAINT "admins_email_fkey";

-- DropForeignKey
ALTER TABLE "hosts" DROP CONSTRAINT "hosts_email_fkey";

-- DropIndex
DROP INDEX "hosts_email_key";

-- AlterTable
ALTER TABLE "hosts" DROP COLUMN "address",
DROP COLUMN "appointmentFee",
DROP COLUMN "contactNumber",
DROP COLUMN "currentWorkingPlace",
DROP COLUMN "designation",
DROP COLUMN "email",
DROP COLUMN "experience",
DROP COLUMN "gender",
DROP COLUMN "isDeleted",
DROP COLUMN "name",
DROP COLUMN "profilePhoto",
DROP COLUMN "qualification",
DROP COLUMN "registrationNumber",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "company" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "website" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "needPasswordChange",
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "profilePhoto" TEXT;

-- DropTable
DROP TABLE "admins";

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "bannerImage" TEXT,
    "location" TEXT,
    "eventDate" TIMESTAMP(3),
    "startTime" TEXT,
    "endTime" TEXT,
    "ticketPrice" DOUBLE PRECISION DEFAULT 0,
    "totalSeats" INTEGER,
    "availableSeats" INTEGER,
    "status" "EventStatus" NOT NULL DEFAULT 'PENDING',
    "hostId" TEXT NOT NULL,
    "category" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventJoin" (
    "id" TEXT NOT NULL,
    "bookingDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "TicketStatus" NOT NULL DEFAULT 'CONFIRMED',
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventJoin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PAID',
    "transactionId" TEXT,
    "eventJoinId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partner" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "partner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_eventJoinId_key" ON "Payment"("eventJoinId");

-- CreateIndex
CREATE UNIQUE INDEX "partner_userId_key" ON "partner"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "hosts_userId_key" ON "hosts"("userId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "hosts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventJoin" ADD CONSTRAINT "EventJoin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "partner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventJoin" ADD CONSTRAINT "EventJoin_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_eventJoinId_fkey" FOREIGN KEY ("eventJoinId") REFERENCES "EventJoin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "partner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hosts" ADD CONSTRAINT "hosts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partner" ADD CONSTRAINT "partner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partner" ADD CONSTRAINT "partner_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
