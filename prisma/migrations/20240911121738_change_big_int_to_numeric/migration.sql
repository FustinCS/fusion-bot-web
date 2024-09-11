/*
  Warnings:

  - The primary key for the `Show` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `show_id` on the `Show` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `season` on the `Show` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `episodes` on the `Show` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `Watches` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `show_id` on the `Watches` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `current_episode` on the `Watches` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `current_season` on the `Watches` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- DropForeignKey
ALTER TABLE "Watches" DROP CONSTRAINT "Watches_show_id_current_season_fkey";

-- AlterTable
ALTER TABLE "Show" DROP CONSTRAINT "Show_pkey",
ALTER COLUMN "show_id" SET DATA TYPE INTEGER,
ALTER COLUMN "season" SET DATA TYPE INTEGER,
ALTER COLUMN "episodes" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Show_pkey" PRIMARY KEY ("show_id", "season");

-- AlterTable
ALTER TABLE "Watches" DROP CONSTRAINT "Watches_pkey",
ALTER COLUMN "show_id" SET DATA TYPE INTEGER,
ALTER COLUMN "current_episode" SET DATA TYPE INTEGER,
ALTER COLUMN "current_season" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Watches_pkey" PRIMARY KEY ("user_id", "show_id", "current_season");

-- AddForeignKey
ALTER TABLE "Watches" ADD CONSTRAINT "Watches_show_id_current_season_fkey" FOREIGN KEY ("show_id", "current_season") REFERENCES "Show"("show_id", "season") ON DELETE NO ACTION ON UPDATE NO ACTION;
