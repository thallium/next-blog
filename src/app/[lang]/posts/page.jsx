import Posts from "@/app/components/Posts";
import Pagination from "@/app/components/Pagination";
import { generateStaticParamsWithLang, getTotalPages } from "@/lib/util";

export default function page({ params }) {
    const lang = params.lang;
    return (
        <>
            <Posts lang={lang} page={1} />
            <Pagination totalPages={getTotalPages(lang)} />
        </>
    )
}

export function generateStaticParams() {
    return generateStaticParamsWithLang(lang => [{ lang }])
}
