/*
  Warnings:

  - You are about to drop the `LetterPopperMistake` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LetterPopperMistake" DROP CONSTRAINT "LetterPopperMistake_userId_fkey";

-- DropTable
DROP TABLE "LetterPopperMistake";

-- CreateTable
CREATE TABLE "Mistake" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "gameType" TEXT NOT NULL,
    "letter" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "timeTaken" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mistake_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Mistake" ADD CONSTRAINT "Mistake_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
