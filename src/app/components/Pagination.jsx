'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Pagination({ totalPages }) {
    const pathname = usePathname().split('/')
    const basePath = pathname.at(-2) === "page" ? pathname.slice(0, -2).join('/') : pathname.slice(0).join('/')
    let currentPage = parseInt(pathname.at(-1))
    if (isNaN(currentPage)) {
        currentPage = 1
    }
    const hasPrev = currentPage > 1
    const hasNext = currentPage < totalPages

    console.log(pathname)

    return (
        <nav className="flex justify-around">
            <Link href={`${basePath}/page/${currentPage - 1}`} style={{
                pointerEvents: (!hasPrev) ? "none" : "auto",
            }}>
                <button className="btn" disabled={!hasPrev}>
                    Previous
                </button>
            </Link>
            <span>
                {currentPage} of {totalPages}
            </span>
            <Link href={`${basePath}/page/${currentPage + 1}`} style={{
                pointerEvents: (!hasNext) ? "none" : "auto",
            }}>
                <button className="btn" disabled={!hasNext}>
                    Next
                </button>
            </Link>
        </nav>
    )
}
