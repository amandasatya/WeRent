/*
  Warnings:

  - You are about to drop the column `value` on the `Rating` table. All the data in the column will be lost.
  - Added the required column `ratingValue` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "value",
ADD COLUMN     "ratingValue" INTEGER NOT NULL;
