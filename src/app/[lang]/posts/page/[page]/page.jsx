import Posts from "@/app/components/Posts";
import { getSortedPostsData } from "@/lib/posts";
import { generateStaticParamsWithLang, getTotalPages } from "@/lib/util";
import Pagination from "@/app/components/Pagination";
import { redirect } from "next/navigation";

export default function page({ params }) {
    const { lang, page } = params;
    if (page === "1") {
        redirect(`/${params.lang}/posts/`)
    }
    return (
        <>
            <Posts lang={lang} page={page} />
            <Pagination totalPages={getTotalPages(lang)} />
        </>
    )
}

export async function generateStaticParams() {
    return generateStaticParamsWithLang(lang => {
        const posts = getSortedPostsData(lang)
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
