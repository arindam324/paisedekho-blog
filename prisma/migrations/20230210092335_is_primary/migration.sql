/*
  Warnings:

  - A unique constraint covering the columns `[isPrmary]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "isPrmary" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Post_isPrmary_key" ON "Post"("isPrmary");
