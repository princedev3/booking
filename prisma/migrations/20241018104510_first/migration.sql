-- CreateTable
CREATE TABLE "Home" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "sqft" INTEGER,
    "capacity" INTEGER,
    "location" TEXT,
    "address" TEXT,
    "amenities" TEXT,
    "availability" TEXT,
    "price_per_hour" INTEGER,
    "image" TEXT,

    CONSTRAINT "Home_pkey" PRIMARY KEY ("id")
);
