/*
  Warnings:

  - The primary key for the `BookMark` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `BookMark` table. All the data in the column will be lost.
  - You are about to drop the column `bookMarkId` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_bookMarkId_fkey";

-- AlterTable
ALTER TABLE "BookMark" DROP CONSTRAINT "BookMark_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "BookMark_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "bookMarkId",
ADD COLUMN     "bookMarkUserId" TEXT;

-- CreateTable
CREATE TABLE "_BookMarkToPost" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookMarkToPost_AB_unique" ON "_BookMarkToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_BookMarkToPost_B_index" ON "_BookMarkToPost"("B");

-- AddForeignKey
ALTER TABLE "_BookMarkToPost" ADD CONSTRAINT "_BookMarkToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "BookMark"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookMarkToPost" ADD CONSTRAINT "_BookMarkToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
