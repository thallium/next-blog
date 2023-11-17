import Posts from "@/app/components/Posts";
import { getSortedPostsData, getTags } from "@/lib/posts";
import { generateStaticParamsWithLang, getTotalPages } from "@/lib/util";
import Pagination from "@/app/components/Pagination";
import { notFound, redirect } from "next/navigation";

export default function page({ params }) {
    /** @type {{lang: string, slug: string[]}} */
    const { lang, tag, slug } = params;
    if (slug && (slug.length !== 2 || slug[0] !== "page")) {
        notFound()
    }
    if (slug && slug[1] === "1") {
        redirect(`/${lang}/tags/${tag}`)
    }
    const page = slug ? parseInt(slug[1]) : 1
    const decodedTag = decodeURIComponent(tag)
    const totalPages = getTotalPages(lang, { tag: decodedTag })
    if (page <= 0 || page > totalPages) {
        notFound()
    }
    return (
        <>
            <Posts lang={lang} page={page} tag={decodedTag} />
            <Pagination totalPages={totalPages} />
        </>
    )
}

export async function generateStaticParams() {
    return generateStaticParamsWithLang(lang => {
        const tags = getTags(lang)
        tags.map(tag => {
            tag = tag[0]
            const posts = getSortedPostsData(lang, { tag: tag })
            const totalPages = getTotalPages(lang, { tag: tag })
            const params = Array.from({ length: totalPages }, (_, i) => {
                if (i === 0) {
                    return {
                        params: {
                            lang,
                            tag
                        }
                    }
                }
                return {
                    params: {
                        lang,
                        tag,
                        slug: ['page', (i + 1).toString()]
                    }
                }
            })
            return params
        }).reduce((acc, val) => acc.concat(val), [])
    })
}
