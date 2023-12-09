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
        <Link key={i} href={`${basePath}/page/${i}`} className={cn("h-8 w-8 flex items-center justify-center hover:border rounded border-foreground",
            { "bg-secondary": i == currentPage })}>
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
        // <ToggleGroup type="single" size="sm" value={page} onValueChange={(p) => {
        //     setPage(p)
        //     if (p !== currentPage) {
        //         router.push(`${basePath}/page/${p}`)
        //     }
        // }}>
        //     {
        //         Array(totalPages).fill(0).map((_, i) => (
        //             <ToggleGroupItem key={i} value={`${i + 1}`} className="h-8 w-8">
        //                 {i + 1}
        //                 {/* <Link href={`${basePath}/page/${i + 1}`}>
        //                     <button className="btn btn-secondary">
        //                         {i + 1}
        //                     </button>
        //                 </Link> */}
        //             </ToggleGroupItem>
        //         ))
        //     }
        // </ToggleGroup>
        // <div className="flex items-center justify-center">
        //     <nav className="join">
        //         <Link href={basePath + (currentPage == 2 ? "" : `/page/${Math.max(currentPage - 1, 0)}`)}
        //             className={`pointer-events-${hasPrev ? "auto" : "none"}`}
        //         >
        //             <button className="join-item btn btn-secondary" disabled={!hasPrev}> « </button>
        //         </Link>
        //         <span className="join-item btn btn-secondary pointer-events-none" >
        //             Page {currentPage} of {totalPages}
        //         </span>
        //         <Link href={`${basePath}/page/${Math.min(currentPage + 1, totalPages)}`}
        //             className={`pointer-events-${hasNext ? "auto" : "none"}`}
        //         >
        //             <button className="join-item btn btn-secondary" disabled={!hasNext}> » </button>
        //         </Link>
        //     </nav>
        // </div>
    )
}
