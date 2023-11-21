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

    return (
        <div className="flex items-center justify-center">
            <nav className="join text-base-content">
                <Link href={`${basePath}/page/${Math.max(currentPage - 1, 0)}`}
                    className={`pointer-events-${hasPrev ? "auto" : "none"}`}
                >
                    <button className="join-item btn btn-secondary" disabled={!hasPrev}> « </button>
                </Link>
                <span className="join-item btn btn-secondary pointer-events-none" >
                    Page {currentPage} of {totalPages}
                </span>
                <Link href={`${basePath}/page/${Math.min(currentPage + 1, totalPages)}`}
                    className={`pointer-events-${hasNext ? "auto" : "none"}`}
                >
                    <button className="join-item btn btn-secondary" disabled={!hasNext}> » </button>
                </Link>
            </nav>
        </div>
    )
}
