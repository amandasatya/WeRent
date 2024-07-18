/*
  Warnings:

  - Added the required column `rent_duration` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "rent_duration" INTEGER NOT NULL;
