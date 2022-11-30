/*
  Warnings:

  - You are about to drop the column `userId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_userId_fkey`;

-- AlterTable
ALTER TABLE `Comment` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `Commentable` ADD COLUMN `userId` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `userId`;

-- AddForeignKey
ALTER TABLE `Commentable` ADD CONSTRAINT `Commentable_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
