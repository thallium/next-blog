import Link from "next/link";
import { notFound } from "next/navigation";

import { MDXRemote } from "next-mdx-remote/rsc";
import { IconHash } from "@tabler/icons-react";

import { getSortedPostsData, getPostData } from "@/lib/posts"
import { generateByLang } from "@/lib/util";
import { MDXComponents, mdxOptions } from "@/data/siteConfig";
import { genPageMetadata } from "@/lib/seo";

import "@/app/tokyo-night-dark.css"

/**
 * 
 * @param {{params: {lang: string, postId: string} }} param0 
 * @returns 
 */
export default function Page({ params }) {
    const { lang, postId } = params;
    const post = getPostData(lang, postId)

    if (!post) {
        notFound()
    }
    const { title, date, _tags: tags, body } = post;

    return (
        <main className="max-w-3xl py-3 xl:py-6 prose prose-code:font-normal">
            <h1>{title}</h1>
            <div className="text-base flex flex-row flex-wrap gap-x-1 mb-2 mt-1 items-center">
                {
                    date &&
                    <time className="whitespace-nowrap text-base-content">{new Date(date).toISOString().split("T")[0]}</time>
                }
                {
                    (tags && tags.length > 0) &&
                    tags.map(tag => (
                        <Link key={tag} href={`/${lang}/tags/${tag}`} className='flex flex-row whitespace-nowrap items-center no-underline text-neutral-content'>
                            <IconHash size={20} />
                            {tag}
                        </Link>
                    ))
                }
            </div>
            <article>
                <MDXRemote source={body.raw} options={{ mdxOptions }} components={MDXComponents} />
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
