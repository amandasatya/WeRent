/*
  Warnings:

  - A unique constraint covering the columns `[user_id,product_id]` on the table `UserProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserProduct_user_id_product_id_key" ON "UserProduct"("user_id", "product_id");
