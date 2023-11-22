import { MDXRemote } from "next-mdx-remote/rsc"
import { readContent } from "@/lib/posts"
import MDXComponents from "@/app/components/MDXComponents";
import Posts from "@/app/components/Posts"
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import rehypePrettyCode from 'rehype-pretty-code';
import { generateByLang } from "@/lib/util";
import { translate } from "@/data/i18n";

export default function page({ params }) {
    const { lang } = params;
    const content = readContent(lang, "index")
    return (
        <main className="max-w-3xl py-3 xl:py-6">
            <article className="prose prose-code:font-normal prose-a:font-normal prose-pre:bg-[#1a1b26]">
                <MDXRemote source={content} options={
                    {
                        mdxOptions: {
                            remarkPlugins: [remarkMath],
                            rehypePlugins: [[rehypeKatex, { strict: true, throwOnError: true }], [rehypePrettyCode, {
                                theme: 'nord'
                            }]],
                        },
                    }
                } components={MDXComponents}
                />
            </article>
            <h1 className=" text-3xl font-bold mt-8">{translate(lang, "recentPosts")}</h1>
            <Posts lang={lang} page={1} />
        </main >
    )
}

export async function generateStaticParams() {
    return generateByLang(lang => {
        return [{ lang }]
    })
}
