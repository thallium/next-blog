'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MoreHorizontal } from 'lucide-react';
import { cn } from "@/lib/utils";


export default function Pagination({ totalPages }) {
    const pathname = usePathname().split('/')
    const basePath = pathname.at(-2) === "page" ? pathname.slice(0, -2).join('/') : pathname.slice(0).join('/')
    let currentPage = parseInt(pathname.at(-1))
    if (isNaN(currentPage)) {
        currentPage = 1
    }

    const PaginationItem = (i) => (
        <Link key={i} href={basePath + (i > 1 ? `/page/${i}` : "")} className={cn("h-8 w-8 flex items-center justify-center hover:border rounded border-foreground",
            { "bg-accent": i == currentPage })}>
            <p>
                {i}
            </p>
        </Link>
    )

    let pages = []
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        if (i >= 1 && i <= totalPages) {
            pages.push(PaginationItem(i))
        }
    }

    if (currentPage - 2 >= 5) {
        pages.unshift(PaginationItem(1), PaginationItem(2), <MoreHorizontal key="prev" size={18} className="flex items-center justify-center" />)
    } else if (currentPage - 2 === 4) {
        pages.unshift(PaginationItem(1), PaginationItem(2), PaginationItem(3))
    } else if (currentPage - 2 === 3) {
        pages.unshift(PaginationItem(1), PaginationItem(2))
    } else if (currentPage - 2 === 2) {
        pages.unshift(PaginationItem(1))
    }

    if (currentPage + 2 <= totalPages - 4) {
        pages.push(<MoreHorizontal key="next" size={18} className="flex items-center justify-center" />, PaginationItem(totalPages - 1), PaginationItem(totalPages))
    } else if (currentPage + 2 === totalPages - 3) {
        pages.push(PaginationItem(totalPages - 2), PaginationItem(totalPages - 1), PaginationItem(totalPages))
    } else if (currentPage + 2 === totalPages - 2) {
        pages.push(PaginationItem(totalPages - 1), PaginationItem(totalPages))
    } else if (currentPage + 2 === totalPages - 1) {
        pages.push(PaginationItem(totalPages))
    }

    return (
        <nav className="flex flex-row items-center justify-center gap-2">
            {pages}
        </nav>
    )
}
