/*
  Warnings:

  - A unique constraint covering the columns `[refreshToken]` on the table `Session` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Query` MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'open';

-- CreateIndex
CREATE UNIQUE INDEX `Session_refreshToken_key` ON `Session`(`refreshToken`);
