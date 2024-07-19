/*
  Warnings:

  - Made the column `deletedAt` on table `Like` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deletedAt` on table `Review` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Like" ALTER COLUMN "deletedAt" SET NOT NULL,
ALTER COLUMN "deletedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "deletedAt" SET NOT NULL,
ALTER COLUMN "deletedAt" SET DEFAULT CURRENT_TIMESTAMP;
