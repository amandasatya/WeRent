/*
  Warnings:

  - The primary key for the `Review` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Review" DROP CONSTRAINT "Review_pkey",
ADD CONSTRAINT "Review_pkey" PRIMARY KEY ("user_id", "product_id");
