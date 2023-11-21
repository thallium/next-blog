import Posts from "@/app/components/Posts";
import { getTags } from "@/lib/posts";
import { generateStaticParamsWithLang, getTotalPages } from "@/lib/util";
import Pagination from "@/app/components/Pagination";
import { notFound, redirect } from "next/navigation";
import { genPageMetadata } from "@/lib/seo";

export default function page({ params }) {
    /** @type {{lang: string, tag: string, page: string}} */
    const { lang, tag, page } = params;
    if (isNaN(parseInt(page))) {
        notFound()
    }
    const pageNum = parseInt(page)
    if (pageNum === 1) {
        redirect(`/${lang}/tags/${tag}`)
    }
    const decodedTag = decodeURIComponent(tag)
    const totalPages = getTotalPages(lang, decodedTag)
    if (pageNum <= 0 || pageNum > totalPages) {
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
        return tags.map(tag => {
            tag = tag[0]
            const totalPages = getTotalPages(lang, tag)
            const params = Array.from({ length: totalPages }, (_, i) => {
                return {
                    params: {
                        lang,
                        tag,
                        page: (i + 1).toString()
                    }
                }
            })
            return params
        }).reduce((acc, val) => acc.concat(val), [])
    })
}

export async function generateMetadata({ params }) {
    const { lang, tag } = params;
    const decodedTag = decodeURIComponent(tag)
    return genPageMetadata({
        lang,
        title: decodedTag,
        description: `Posts tagged with ${decodedTag}`,
    })
}
