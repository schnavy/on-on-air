/*
  Warnings:

  - You are about to drop the column `radioId` on the `Genre` table. All the data in the column will be lost.
  - You are about to drop the column `radioId` on the `Tag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Genre" DROP CONSTRAINT "Genre_radioId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_radioId_fkey";

-- AlterTable
ALTER TABLE "Genre" DROP COLUMN "radioId";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "radioId";

-- CreateTable
CREATE TABLE "_RadioTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RadioGenres" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RadioTags_AB_unique" ON "_RadioTags"("A", "B");

-- CreateIndex
CREATE INDEX "_RadioTags_B_index" ON "_RadioTags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RadioGenres_AB_unique" ON "_RadioGenres"("A", "B");

-- CreateIndex
CREATE INDEX "_RadioGenres_B_index" ON "_RadioGenres"("B");

-- AddForeignKey
ALTER TABLE "_RadioTags" ADD CONSTRAINT "_RadioTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Radio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RadioTags" ADD CONSTRAINT "_RadioTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RadioGenres" ADD CONSTRAINT "_RadioGenres_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RadioGenres" ADD CONSTRAINT "_RadioGenres_B_fkey" FOREIGN KEY ("B") REFERENCES "Radio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
