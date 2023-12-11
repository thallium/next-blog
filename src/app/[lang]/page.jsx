import { MDXRemote } from "next-mdx-remote/rsc"
import { readContent } from "@/lib/posts"
import { MDXComponents, mdxOptions } from "@/data/siteConfig";
import Posts from "@/components/Posts"
import { generateByLang } from "@/lib/util";
import { translate } from "@/data/i18n";

export default function page({ params }) {
    const { lang } = params;
    const content = readContent(lang, "index")
    return (
        <main className="max-w-3xl py-3 xl:py-6">
            <article className="prose prose-code:font-normal">
                <MDXRemote source={content} options={{ mdxOptions }} components={MDXComponents} />
            </article>
            <h1 id={translate(lang, "recentPosts")} className="group text-3xl font-bold mt-8">{translate(lang, "recentPosts")}
                <a aria-hidden="true" tabIndex="-1" className="opacity-0 no-underline text-muted-foreground group-hover:opacity-100" href={`#${translate(lang, "recentPosts")}`}> #</a>
            </h1>
            <Posts lang={lang} page={1} />
        </main >
    )
}

export async function generateStaticParams() {
    return generateByLang(lang => {
        return [{ lang }]
    })
}
