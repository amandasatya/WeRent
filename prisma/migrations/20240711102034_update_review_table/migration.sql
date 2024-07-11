/*
  Warnings:

  - The primary key for the `Review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[review_id]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,product_id]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Review" DROP CONSTRAINT "Review_pkey",
ADD CONSTRAINT "Review_pkey" PRIMARY KEY ("review_id");

-- CreateIndex
CREATE UNIQUE INDEX "Review_review_id_key" ON "Review"("review_id");

-- CreateIndex
CREATE UNIQUE INDEX "Review_user_id_product_id_key" ON "Review"("user_id", "product_id");
