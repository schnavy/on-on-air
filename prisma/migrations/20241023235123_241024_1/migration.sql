/*
  Warnings:

  - You are about to drop the column `actives` on the `Radio` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Radio` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Radio" DROP COLUMN "actives",
DROP COLUMN "content",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "status" SET DEFAULT 'submission';
