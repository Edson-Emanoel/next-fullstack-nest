/*
  Warnings:

  - You are about to alter the column `escola` on the `pessoa` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `pessoa` MODIFY `escola` VARCHAR(191) NOT NULL;
