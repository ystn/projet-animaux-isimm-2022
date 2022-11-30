/*
  Warnings:

  - You are about to drop the column `taggableId` on the `Tag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Tag` DROP FOREIGN KEY `Tag_taggableId_fkey`;

-- AlterTable
ALTER TABLE `Tag` DROP COLUMN `taggableId`;

-- CreateTable
CREATE TABLE `TagTaggable` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taggableId` INTEGER NOT NULL,
    `tagId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TagTaggable` ADD CONSTRAINT `TagTaggable_taggableId_fkey` FOREIGN KEY (`taggableId`) REFERENCES `Taggable`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TagTaggable` ADD CONSTRAINT `TagTaggable_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
