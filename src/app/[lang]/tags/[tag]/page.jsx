import Posts from "@/app/components/Posts";
import { getSortedPostsData, getTags } from "@/lib/posts";
import { generateByLang, getTotalPages } from "@/lib/util";
import Pagination from "@/app/components/Pagination";
import { notFound, redirect } from "next/navigation";
import { genPageMetadata } from "@/lib/seo";

export default function page({ params }) {
    /** @type {{lang: string, tag: string}} */
    const { lang, tag: tagStr } = params;
    const page = 1;
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
            return {
                lang,
                tag
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
