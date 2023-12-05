import Posts from "@/components/Posts";
import { getTags } from "@/lib/posts";
import { generateByLang, getTotalPages } from "@/lib/util";
import Pagination from "@/components/Pagination";
import { notFound, redirect } from "next/navigation";
import { genPageMetadata } from "@/lib/seo";

export default function page({ params }) {
    /** @type {{lang: string, tag: string, page: string}} */
    const { lang, tag: tagStr, page: pageStr } = params;
    if (isNaN(parseInt(pageStr))) {
        notFound()
    }
    const page = parseInt(pageStr)
    if (page === 1) {
        redirect(`/${lang}/tags/${tagStr}`)
    }
    const tag = decodeURIComponent(tagStr)
    const totalPages = getTotalPages(lang, tag)
    if (page <= 0 || page > totalPages) {
        notFound()
    }
    return (
        <>
            <h1 className="text-4xl font-bold my-6 text-base-content">{tag}</h1>
            <Posts lang={lang} page={page} tag={tag} />
            <Pagination totalPages={totalPages} />
        </>
    )
}

export async function generateStaticParams() {
    return generateByLang(lang => {
        const tags = getTags(lang)
        return tags.map(tag => {
            tag = tag[0]
            const totalPages = getTotalPages(lang, tag)
            const params = Array.from({ length: totalPages - 1 }, (_, i) => {
                return {
                    lang,
                    tag,
                    page: (i + 2).toString()
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
