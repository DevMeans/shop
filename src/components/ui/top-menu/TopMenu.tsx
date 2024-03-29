'use client'
import { titlefont } from '@/config/fonts'
import { UseUiStore, useCartStore } from '@/store'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5'


export const TopMenu = () => {
    const oPenSideMenu = UseUiStore(state => state.openSideMenu);
    const getotalitemIncart = useCartStore(state => state.getTotalItem())
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        setLoaded(true)


    }, [])

    return (
        <nav className='flex px-5 justify-between items-center w-full' >
            <div>
                <Link href={`/`}>
                    <span className={`${titlefont.className} antialiased font-bold w-full`}>
                        Teslo
                    </span>
                    <span>
                        | shop
                    </span>
                </Link>
            </div>
            <div className='hidden sm:block'>
                <Link href={`/gender/men`} className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>Hombres
                </Link>
                <Link href={`/gender/women`} className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>Mujeres
                </Link>
                <Link href={`/gender/kid`} className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>Niños
                </Link>
            </div>
            <div className='flex items-center'>
                <Link href={`/search`}>
                    <IoSearchOutline className='w-5 h-5 mx-2' />
                </Link>
                <Link href={
                    (getotalitemIncart === 0 && loaded) ? "/empty" : "/cart"
                } className='mx-2'>
                    <div className='relative'>

                        {
                            (getotalitemIncart > 0 && loaded) && (<span className='absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white'>{getotalitemIncart}</span>)
                        }



                        <IoCartOutline className='w-5 h-5' />
                    </div>

                </Link>
                <button onClick={() => oPenSideMenu()} className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>
                    Menu
                </button>
            </div>

        </nav>
    )
}
