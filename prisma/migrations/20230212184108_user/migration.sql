-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Editor', 'Admin');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'Editor',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
