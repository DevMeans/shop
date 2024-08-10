/*
  Warnings:

  - You are about to drop the column `subTotal` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `tax` on the `Order` table. All the data in the column will be lost.
  - Added the required column `colorId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "subTotal",
DROP COLUMN "tax";

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "colorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "ColorProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
