/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ColorProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ColorProduct_name_key" ON "ColorProduct"("name");
