'use client'
import { getStockBySlug } from '@/actions/products/get-stock-by-slug'
import { titlefont } from '@/config/fonts'
import { useEffect, useState } from 'react'

interface Props {
  slug: string
}

export const StockLabel = ({ slug }: Props) => {

  const [stock, setStock] = useState(0)
  const [isloading, setIsloading] = useState(true)
  useEffect(() => {
    getStock()
  })
  const getStock = async () => {
    const InStock = await getStockBySlug(slug)
    setStock(InStock)
    setIsloading(false)
  }
  return (
    <>

      {
        isloading ? (
          <h2 className={` ${titlefont.className} antialiased font-bold text-lg bg-gray-200 animate-pulse`}>
            &nbsp;
          </h2>
        ) : (

          <h2 className={` ${titlefont.className} antialiased font-bold text-lg`}>
            stock:{stock}
          </h2>
        )
      }


    </>
  )
}
