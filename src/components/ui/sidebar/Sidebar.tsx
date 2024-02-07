'use client'
import { logout } from '@/actions';
import { UseUiStore } from "@/store"
import clsx from "clsx"
import { useSession } from 'next-auth/react';
import Link from "next/link"
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonAddOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5"

export const Sidebar = () => {

    const isSideMenuOpen = UseUiStore(state => state.isSideMenuOpen);
    const closeMenu = UseUiStore(state => state.closeSideMenu)
    const { data: session } = useSession();
    const isAuthentication = !!session?.user;
    return (
        <div>
            {
                isSideMenuOpen && (
                    <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30">

                    </div>
                )
            }
            {
                isSideMenuOpen && (
                    <div className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm" onClick={closeMenu}>

                    </div>
                )
            }

            <nav className={
                clsx(
                    "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
                    {
                        "translate-x-full": !isSideMenuOpen
                    }
                )
            }>
                <IoCloseOutline
                    size={50}
                    className="absolute top-5 right-5 cursor-pointer"
                    onClick={() => closeMenu()}
                />

                <div className="relative mt-14">
                    <IoSearchOutline size={20} className="absolute top-2 left-2" />
                    <input
                        type="text" placeholder="Buscar"
                        className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
                    />
                </div>
                {
                    isAuthentication && (
                        <>
                            <Link href={`/profile`} onClick={() => closeMenu()} className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition">
                                <IoPersonAddOutline size={30} />
                                <span className="ml-3 text-xl">Perfil</span>
                            </Link>
                            <Link href={`/`} className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition">
                                <IoTicketOutline size={30} />
                                <span className="ml-3 text-xl">Ordenes</span>
                            </Link>
                        </>
                    )
                }

                {
                    isAuthentication && (
                        <button
                            onClick={() => logout()}

                            className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition">
                            <IoLogOutOutline size={30} />
                            <span className="ml-3 text-xl">Salir</span>
                        </button>
                    )
                }
                {
                    !isAuthentication && (
                        <Link href={`/auth/login`} onClick={() => closeMenu()} className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition">
                            <IoLogInOutline size={30} />
                            <span className="ml-3 text-xl">Ingresar</span>
                        </Link>
                    )
                }
                <div className="w-full h-px bg-gray-200 my-10">


                </div>
                {
                    session?.user.role === 'admin' && (

                        <>
                            <Link href={`/`} className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition">
                                <IoShirtOutline size={30} />
                                <span className="ml-3 text-xl">Productos</span>
                            </Link>
                            <Link href={`/`} className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition">
                                <IoTicketOutline size={30} />
                                <span className="ml-3 text-xl">Ordenes</span>
                            </Link>
                            <Link href={`/`} className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition">
                                <IoPeopleOutline size={30} />
                                <span className="ml-3 text-xl">Usuarios</span>
                            </Link>
                        </>
                    )
                }
            </nav>
        </div>
    )
}
