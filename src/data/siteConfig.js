import Figure from "@/app/components/Figure";
import Collapsible from "@/app/components/Collapsible";
import Image from "next/image";

import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import remarkGfm from "remark-gfm";
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug'

export const siteMetadata = {
    title: "Thallium54",
    author: 'Thallium54',
    description: "The place where I post something about myself."
}

export const config = {
    postPerPage: 7,
    langs: ["en", "zh"],
}

export const languages = {
    en: {
        name: "English",
        langCode: "en",
        dict: {
            recentPosts: "Recent Posts",
            tags: "Tags",
        },
        navLinks: [
            { href: '/posts', title: 'Posts' },
            { href: '/tags', title: 'Tags' },
        ]
    },
    zh: {
        name: "中文",
        langCode: "zh-hans",
        dict: {
            recentPosts: "最近文章",
            tags: "标签",
        },
        navLinks: [
            { href: '/posts', title: '文章' },
            { href: '/tags', title: '标签' },
        ]
    },
}


export const MDXComponents = {
    Figure, Collapsible,
    Image: (props) => <Image {...props} />
}

export const mdxOptions = {
    remarkPlugins: [remarkMath, remarkGfm],
    rehypePlugins: [
        [rehypeKatex, { strict: true, throwOnError: true }],
        [rehypePrettyCode, { theme: 'nord' }],
        rehypeSlug,
        [rehypeAutolinkHeadings, {
            behavior: 'append',
            content: { type: 'text', value: ' #' },
            headingProperties: {
                className: "group",
            },
            properties: {
                ariaHidden: true,
                tabIndex: -1,
                className: "opacity-0 no-underline text-neutral-content group-hover:opacity-100"
            }
        }],
    ],
}
