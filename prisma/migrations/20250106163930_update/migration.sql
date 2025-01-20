/*
  Warnings:

  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Genre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Movie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BookGenres` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MovieGenres` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_BookGenres` DROP FOREIGN KEY `_BookGenres_A_fkey`;

-- DropForeignKey
ALTER TABLE `_BookGenres` DROP FOREIGN KEY `_BookGenres_B_fkey`;

-- DropForeignKey
ALTER TABLE `_MovieGenres` DROP FOREIGN KEY `_MovieGenres_A_fkey`;

-- DropForeignKey
ALTER TABLE `_MovieGenres` DROP FOREIGN KEY `_MovieGenres_B_fkey`;

-- DropTable
DROP TABLE `Book`;

-- DropTable
DROP TABLE `Genre`;

-- DropTable
DROP TABLE `Movie`;

-- DropTable
DROP TABLE `_BookGenres`;

-- DropTable
DROP TABLE `_MovieGenres`;

-- CreateTable
CREATE TABLE `UserMovie` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `movieId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `rating` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserMovieGenre` (
    `id` VARCHAR(191) NOT NULL,
    `userMovieId` VARCHAR(191) NOT NULL,
    `genre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserTVShow` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `showId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `rating` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserTVShowGenre` (
    `id` VARCHAR(191) NOT NULL,
    `userTVShowId` VARCHAR(191) NOT NULL,
    `genre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserBook` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `bookId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `rating` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserBookGenre` (
    `id` VARCHAR(191) NOT NULL,
    `userBookId` VARCHAR(191) NOT NULL,
    `genre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserMovieGenre` ADD CONSTRAINT `UserMovieGenre_userMovieId_fkey` FOREIGN KEY (`userMovieId`) REFERENCES `UserMovie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTVShowGenre` ADD CONSTRAINT `UserTVShowGenre_userTVShowId_fkey` FOREIGN KEY (`userTVShowId`) REFERENCES `UserTVShow`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserBookGenre` ADD CONSTRAINT `UserBookGenre_userBookId_fkey` FOREIGN KEY (`userBookId`) REFERENCES `UserBook`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
