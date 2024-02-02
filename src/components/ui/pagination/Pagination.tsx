'use client'
import { generatePaginationNumbers } from "@/util"
import clsx from "clsx"
import Link from "next/link"
import { redirect, usePathname, useSearchParams } from "next/navigation"
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5"

interface Props {
    totalPages: number
}

export const Pagination = ({ totalPages }: Props) => {
    const pathName = usePathname()
    const searchParams = useSearchParams()
    const pageString = searchParams.get('page') ?? 1

    let currentPage = isNaN(+pageString) ? 1 : +pageString
    if (currentPage < 1 || isNaN(+pageString)) {
        redirect(pathName)
    }

    const allPages = generatePaginationNumbers(currentPage, totalPages)

    const crearpageurl = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams)
        console.log(pageNumber)
        console.log(currentPage)
        if (pageNumber === '...') {
            return `${pathName}?${params.toString()}`
        }
        if (+pageNumber <= 0) {
            return `${pathName}` //href="/"
        }
        if (+pageNumber > totalPages) {
            return `${pathName}?${params.toString()}`
        }
        params.set('page', pageNumber.toString())
        return `${pathName}?${params.toString()}`
    }

    return (
        <div className="flex justify-center text-center mt-10 mb-32">
            <nav aria-label="Page navigation example">
                <ul className="flex list-style-none">
                    <li className="page-item"><Link
                        className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                        href={crearpageurl(currentPage - 1)}><IoChevronBackOutline size={30} /></Link></li>

                    {
                        allPages.map((page, index) => (

                            <li key={page} className="page-item"><Link
                                className={
                                    clsx("page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                                        {'bg-blue-600 shadow-sm text-white hover:text-white hover:bg-blue-700': page === currentPage}
                                        
                                    )
                                }
                                href={crearpageurl(page)}>{page}</Link></li>
                        ))
                    }
                    <li className="page-item"><Link
                        className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                        href={crearpageurl(currentPage + 1)}><IoChevronForwardOutline size={30} /></Link></li>
                </ul>
            </nav>
        </div>
    )
}
