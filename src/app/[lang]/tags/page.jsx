import { getTags } from "@/lib/posts"
import { generateByLang } from "@/lib/util";
import Link from "next/link";
import { IconHash } from "@tabler/icons-react";
import { genPageMetadata } from "@/lib/seo";
import { translate } from "@/data/i18n";

export default function page({ params }) {
    const { lang } = params;
    const tags = getTags(lang)
    return (
        <>
            <h1 className="text-4xl font-bold my-6 text-base-content">{translate(lang, "tags")}</h1>
            <ul className="text-base-content">
                {
                    tags.map(tag => (
                        <li key={tag[0]} className="mb-4">
                            <Link href={`/${lang}/tags/${tag[0]}`} className="flex-row items-center">
                                <IconHash size={16} className="inline" />
                                {tag[0]}
                                <span className="badge badge-secondary ml-1">
                                    {tag[1]}
                                </span>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

export function generateStaticParams() {
    return generateByLang(lang => [{ lang }])
}

export async function generateMetadata({ params }) {
    const { lang } = params;
    return genPageMetadata({ lang, title: "Posts" })
}
