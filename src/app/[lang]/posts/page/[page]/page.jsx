import Posts from "@/app/components/Posts";
import { generateStaticParamsWithLang, getTotalPages } from "@/lib/util";
import Pagination from "@/app/components/Pagination";
import { notFound, redirect } from "next/navigation";
import { genPageMetadata } from "@/lib/seo";

export default function page({ params }) {
    /** @type {{lang: string, page: string}} */
    const { lang, page } = params;
    if (isNaN(parseInt(page))) {
        notFound()
    }
    const pageNum = parseInt(page)
    if (pageNum === 1) {
        redirect(`/${lang}/posts/`)
    }
    const totalPages = getTotalPages(lang)
    if (pageNum <= 0 || pageNum > totalPages) {
        notFound()
    }
    return (
        <>
            <Posts lang={lang} page={pageNum} />
            <Pagination totalPages={totalPages} />
        </>
    )
}

export async function generateStaticParams() {
    return generateStaticParamsWithLang(lang => {
        const totalPages = getTotalPages(lang)
        const params = Array.from({ length: totalPages }, (_, i) => {
            return {
                params: {
                    lang,
                    page: (i + 1).toString()
                }
            }
        })
        return params
    })
}

export async function generateMetadata({ params }) {
    const { lang } = params;
    return genPageMetadata({ lang, title: "Posts" })
}
