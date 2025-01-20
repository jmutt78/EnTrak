/*
  Warnings:

  - You are about to drop the `UserBookGenre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserMovieGenre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserTVShowGenre` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `genres` to the `UserBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genres` to the `UserMovie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genres` to the `UserTVShow` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `UserBookGenre` DROP FOREIGN KEY `UserBookGenre_userBookId_fkey`;

-- DropForeignKey
ALTER TABLE `UserMovieGenre` DROP FOREIGN KEY `UserMovieGenre_userMovieId_fkey`;

-- DropForeignKey
ALTER TABLE `UserTVShowGenre` DROP FOREIGN KEY `UserTVShowGenre_userTVShowId_fkey`;

-- AlterTable
ALTER TABLE `UserBook` ADD COLUMN `genres` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `UserMovie` ADD COLUMN `genres` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `UserTVShow` ADD COLUMN `genres` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `UserBookGenre`;

-- DropTable
DROP TABLE `UserMovieGenre`;

-- DropTable
DROP TABLE `UserTVShowGenre`;
