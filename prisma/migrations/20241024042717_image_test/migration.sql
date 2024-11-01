/*
  Warnings:

  - The primary key for the `Home` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Home` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `user_id` on the `Home` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Home" DROP CONSTRAINT "Home_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "user_id",
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD CONSTRAINT "Home_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "image" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);
