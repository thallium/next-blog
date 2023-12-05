import Posts from "@/components/Posts";
import { generateByLang, getTotalPages } from "@/lib/util";
import Pagination from "@/components/Pagination";
import { notFound } from "next/navigation";
import { genPageMetadata } from "@/lib/seo";

export default function page({ params }) {
    /** @type {{lang: string, slug: string[]}} */
    const { lang } = params;
    const page = 1;
    const totalPages = getTotalPages(lang)
    if (page <= 0 || page > totalPages) {
        notFound()
    }
    return (
        <>
            <Posts lang={lang} page={1} />
            <Pagination totalPages={totalPages} />
        </>
    )
}

export async function generateStaticParams() {
    return generateByLang(lang => {
        return [{ lang }]
    })
}

export async function generateMetadata({ params }) {
    const { lang } = params;
    return genPageMetadata({ lang, title: "Posts" })
}
