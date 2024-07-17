/*
  Warnings:

  - You are about to drop the column `productId` on the `Rating` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,product_id]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_id` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_productId_fkey";

-- DropIndex
DROP INDEX "Rating_userId_productId_key";

-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "productId",
ADD COLUMN     "product_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Rating_userId_product_id_key" ON "Rating"("userId", "product_id");

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
