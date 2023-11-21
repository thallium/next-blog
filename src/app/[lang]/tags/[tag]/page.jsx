import Posts from "@/app/components/Posts";
import { getSortedPostsData, getTags } from "@/lib/posts";
import { generateStaticParamsWithLang, getTotalPages } from "@/lib/util";
import Pagination from "@/app/components/Pagination";
import { notFound, redirect } from "next/navigation";
import { genPageMetadata } from "@/lib/seo";

export default function page({ params }) {
    /** @type {{lang: string, slug: string[]}} */
    const { lang, tag } = params;
    const page = 1;
    const decodedTag = decodeURIComponent(tag)
    const totalPages = getTotalPages(lang, decodedTag)
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
        return tags.map(tag => {
            tag = tag[0]
            return {
                params: {
                    lang,
                    tag
                }
            }
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
