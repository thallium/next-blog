import { getSortedPostsData } from "@/lib/posts"
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostData } from "@/lib/posts";
import "@/app/tokyo-night-dark.css"
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import torchlight from 'remark-torchlight'
import Figure from "@/app/components/Figure";
import Collapsible from "@/app/components/Collapsible";
import { generateStaticParamsWithLang } from "@/lib/util";

/**
 * 
 * @param {{params: }} param0 
 * @returns 
 */
export default async function Page({ params }) {
    const { lang, postId } = params;
    const posts = getSortedPostsData(lang)

    if (!posts.find(post => post.id === postId)) {
        return notFound()
    }
    const { title, date, contentHtml } = await getPostData(lang, postId)

    return (
        <main className="max-w-3xl py-3 xl:py-6 prose dark:prose-invert prose-pre:bg-[#1a1b26]">
            <h1 className="text-3xl mt-4 mb-0 pb-2">{title}</h1>
            <p className="mt-0">
                {new Date(date).toISOString().split("T")[0]}
            </p>
            <article>
                <MDXRemote source={contentHtml} options={
                    {
                        mdxOptions: {
                            remarkPlugins: [remarkMath, torchlight],
                            rehypePlugins: [rehypeKatex],
                        },
                    }
                } components={{ Figure, Collapsible }}
                />
                < p >
                    <Link href="/">← Back to home</Link>
                </p>
            </article>
        </main >
    )
}

export async function generateStaticParams() {
    return generateStaticParamsWithLang(lang => {
        const posts = getSortedPostsData(lang)
        const params = posts.map(post => {
            return {
                params: {
                    lang,
                    postId: post.id
                }
            }
        })
        return params
    })
}
