/*
  Warnings:

  - The primary key for the `Mistake` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `letter` on the `Mistake` table. All the data in the column will be lost.
  - You are about to drop the column `timeTaken` on the `Mistake` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `correctLetter` to the `Mistake` table without a default value. This is not possible if the table is not empty.
  - Added the required column `incorrectLetter` to the `Mistake` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Mistake" DROP CONSTRAINT "Mistake_userId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Mistake" DROP CONSTRAINT "Mistake_pkey",
DROP COLUMN "letter",
DROP COLUMN "timeTaken",
ADD COLUMN     "correctLetter" TEXT NOT NULL,
ADD COLUMN     "incorrectLetter" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Mistake_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Mistake_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
