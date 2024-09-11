-- CreateTable
CREATE TABLE "Show" (
    "show_id" BIGINT NOT NULL,
    "name" TEXT DEFAULT '',
    "season" BIGINT NOT NULL DEFAULT 1,
    "episodes" BIGINT DEFAULT 1,

    CONSTRAINT "Show_pkey" PRIMARY KEY ("show_id","season")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Watches" (
    "user_id" TEXT NOT NULL,
    "show_id" BIGINT NOT NULL,
    "current_episode" BIGINT NOT NULL DEFAULT 0,
    "date_updated" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "current_season" BIGINT NOT NULL DEFAULT 1,

    CONSTRAINT "Watches_pkey" PRIMARY KEY ("user_id","show_id","current_season")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_id_key" ON "User"("user_id");

-- AddForeignKey
ALTER TABLE "Watches" ADD CONSTRAINT "Watches_show_id_current_season_fkey" FOREIGN KEY ("show_id", "current_season") REFERENCES "Show"("show_id", "season") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Watches" ADD CONSTRAINT "Watches_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
