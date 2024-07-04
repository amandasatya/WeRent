-- CreateEnum
CREATE TYPE "Scale" AS ENUM ('Small', 'Fit', 'Large');

-- CreateTable
CREATE TABLE "Review" (
    "review_id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "fit_scale" "Scale" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("review_id")
);
