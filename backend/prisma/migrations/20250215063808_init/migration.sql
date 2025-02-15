-- CreateTable
CREATE TABLE "Metric" (
    "id" SERIAL NOT NULL,
    "targetWord" TEXT NOT NULL,
    "totalTime" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Metric_pkey" PRIMARY KEY ("id")
);
