import { getTags } from "@/lib/posts"
import { generateStaticParamsWithLang } from "@/lib/util";
import Link from "next/link";

export default function page({ params }) {
    const { lang } = params;
    const tags = getTags(lang)
    return (
        <>
            <h1 className="text-5xl font-bold my-6">Tags</h1>
            <ul>
                {
                    tags.map(tag => (
                        <Link key={tag[0]} href={`/${lang}/tags/${tag[0]}`}>
                            <li className="mb-4">
                                {`# ${tag[0]} `}
                                <span className="badge badge-neutral">
                                    {tag[1]}
                                </span>
                            </li>
                        </Link>
                    ))
                }
            </ul>
        </>
    )
}

generateStaticParamsWithLang(lang => { lang })
