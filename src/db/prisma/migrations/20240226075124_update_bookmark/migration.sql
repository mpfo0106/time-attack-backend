/*
  Warnings:

  - The primary key for the `BookMark` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bookMarkUserId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `_BookMarkToPost` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,postId]` on the table `BookMark` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `postId` to the `BookMark` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BookMarkToPost" DROP CONSTRAINT "_BookMarkToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookMarkToPost" DROP CONSTRAINT "_BookMarkToPost_B_fkey";

-- AlterTable
ALTER TABLE "BookMark" DROP CONSTRAINT "BookMark_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "postId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "bookMarkUserId";

-- DropTable
DROP TABLE "_BookMarkToPost";

-- CreateIndex
CREATE UNIQUE INDEX "BookMark_userId_postId_key" ON "BookMark"("userId", "postId");

-- AddForeignKey
ALTER TABLE "BookMark" ADD CONSTRAINT "BookMark_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
