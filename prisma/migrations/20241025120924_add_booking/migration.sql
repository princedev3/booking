/*
  Warnings:

  - Made the column `image` on table `Home` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Home" ALTER COLUMN "image" SET NOT NULL;

-- CreateTable
CREATE TABLE "Bookings" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "homeId" INTEGER NOT NULL,
    "check_in" TIMESTAMP(3) NOT NULL,
    "check_out" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "Home"("id") ON DELETE CASCADE ON UPDATE CASCADE;
