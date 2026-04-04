/*
  Warnings:

  - A unique constraint covering the columns `[basketId,weaponId]` on the table `basket_weapons` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "basket_weapons" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "basket_weapons_basketId_weaponId_key" ON "basket_weapons"("basketId", "weaponId");
