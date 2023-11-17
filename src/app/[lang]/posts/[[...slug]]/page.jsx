import Posts from "@/app/components/Posts";
import { getSortedPostsData } from "@/lib/posts";
import { generateStaticParamsWithLang, getTotalPages } from "@/lib/util";
import Pagination from "@/app/components/Pagination";
import { notFound, redirect } from "next/navigation";

export default function page({ params }) {
    /** @type {{lang: string, slug: string[]}} */
    const { lang, slug } = params;
    if (slug && (slug.length !== 2 || slug[0] !== "page")) {
        notFound()
    }
    if (slug && slug[1] === "1") {
        redirect(`/${lang}/posts/`)
    }
    const page = slug ? parseInt(slug[1]) : 1
    const totalPages = getTotalPages(lang)
    if (page <= 0 || page > totalPages) {
        notFound()
    }
    return (
        <>
            <Posts lang={lang} page={page} />
            <Pagination totalPages={totalPages} />
        </>
    )
}

export async function generateStaticParams() {
    return generateStaticParamsWithLang(lang => {
        const posts = getSortedPostsData(lang)
        const totalPages = getTotalPages(lang)
        const params = Array.from({ length: totalPages }, (_, i) => {
            if (i === 0) {
                return {
                    params: {
                        lang
                    }
                }
            }
            return {
                params: {
                    lang,
                    slug: ['page', (i + 1).toString()]
                }
            }
        })
        return params
    })
}
