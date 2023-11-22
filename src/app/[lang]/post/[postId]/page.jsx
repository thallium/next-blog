import Link from "next/link";
import { notFound } from "next/navigation";

import { MDXRemote } from "next-mdx-remote/rsc";
import { IconHash } from "@tabler/icons-react";
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

import { getSortedPostsData, getPostData } from "@/lib/posts"
import { generateByLang } from "@/lib/util";

import MDXComponents from "../../../components/MDXComponents";

import "@/app/tokyo-night-dark.css"
import { genPageMetadata } from "@/lib/seo";

/**
 * 
 * @param {{params: {lang: string, postId: string} }} param0 
 * @returns 
 */
export default async function Page({ params }) {
    const { lang, postId } = params;
    const post = getSortedPostsData(lang).find(post => post.id === postId)

    if (!post) {
        notFound()
    }
    const { title, date, tags, content } = post;

    return (
        <main className="max-w-3xl py-3 xl:py-6 prose prose-code:font-normal prose-a:font-normal">
            <h1>{title}</h1>
            <div className="text-base flex flex-row gap-x-1 mb-2 mt-1 items-center">

                {
                    date &&
                    <time>{new Date(date).toISOString().split("T")[0]}</time>
                }
                {
                    (tags && tags.length > 0) &&
                    tags.map(tag => (
                        <Link key={tag} href={`/${lang}/tags/${tag}`} className='flex flex-row items-center no-underline text-neutral-content'>
                            <IconHash size={18} />
                            {tag}
                        </Link>
                    ))
                }
            </div>
            <article className="prose-pre:bg-[#2E3440]">
                <MDXRemote source={content} options={
                    {
                        mdxOptions: {
                            remarkPlugins: [remarkMath, remarkGfm],
                            rehypePlugins: [[rehypeKatex, { strict: true, throwOnError: true }], rehypeHighlight],
                        },
                    }
                } components={MDXComponents}
                />
            </article>
        </main >
    )
}

export async function generateStaticParams() {
    return generateByLang(lang => {
        const posts = getSortedPostsData(lang)
        const params = posts.map(post => {
            return {
                lang,
                postId: post.id
            }
        })
        return params
    })
}

export async function generateMetadata({ params }) {
    const { lang, postId } = params;
    const { title, tags, summary } = getPostData(lang, postId) || { title: "Not Found" }
    return genPageMetadata({
        lang,
        title,
        keywords: tags,
        description: summary
    })
}
