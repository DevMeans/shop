-- CreateTable
CREATE TABLE "ColorForProduct" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "colorId" TEXT NOT NULL,

    CONSTRAINT "ColorForProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ColorForProduct_productId_key" ON "ColorForProduct"("productId");

-- AddForeignKey
ALTER TABLE "ColorForProduct" ADD CONSTRAINT "ColorForProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ColorForProduct" ADD CONSTRAINT "ColorForProduct_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "ColorProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
