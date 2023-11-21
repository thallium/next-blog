import { MDXRemote } from "next-mdx-remote/rsc"
import { readContent } from "../../lib/posts"
import MDXComponents from "../components/MDXComponents";
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import rehypeHighlight from "rehype-highlight";
import { generateStaticParamsWithLang } from "@/lib/util";

export default function page({ params }) {
    const { lang } = params;
    const content = readContent(lang, "index")
    return (
        <main className="max-w-3xl py-3 xl:py-6 prose prose-code:font-normal prose-a:font-normal">
            <article className="prose-pre:bg-[#1a1b26]">
                <MDXRemote source={content} options={
                    {
                        mdxOptions: {
                            remarkPlugins: [remarkMath],
                            rehypePlugins: [rehypeKatex, rehypeHighlight],
                        },
                    }
                } components={MDXComponents}
                />
            </article>
        </main >
    )
}

export async function generateStaticParams() {
    return generateStaticParamsWithLang(lang => {
        return [{ lang }]
    })
}
