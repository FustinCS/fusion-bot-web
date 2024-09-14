/*
  Warnings:

  - You are about to drop the `Show` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Watches` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Watches" DROP CONSTRAINT "Watches_show_id_current_season_fkey";

-- DropForeignKey
ALTER TABLE "Watches" DROP CONSTRAINT "Watches_user_id_fkey";

-- DropTable
DROP TABLE "Show";

-- DropTable
DROP TABLE "Watches";
