-- CreateTable
CREATE TABLE "Like" (
    "like_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "review_id" INTEGER NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("like_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Like_user_id_review_id_key" ON "Like"("user_id", "review_id");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "Review"("review_id") ON DELETE RESTRICT ON UPDATE CASCADE;
