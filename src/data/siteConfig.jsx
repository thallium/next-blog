import Figure from "@/components/Figure";
import Collapsible from "@/components/Collapsible";
import Image from "next/image";
import Link from "next/link";

import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math-old'
import remarkGfm from "remark-gfm-old";
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug'

import TokyoNight from "../app/TokyoNight.json";
import TokyoNightLight from "../app/TokyoNightLight.json"

export const siteMetadata = {
    title: "Thallium54",
    author: 'Thallium54',
    description: "The place where I post something about myself."
}

export const config = {
    postPerPage: 7,
    langs: ["en", "zh"],
    footer: "© 2023 Powered by Next.js | Theme inspired by Tokyo Night"
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
    Image: (props) => <Image {...props} />,
    a: ({ href, children, ...props }) => <Link href={href} {...props} >{children}</Link>
}

export const mdxOptions = {
    remarkPlugins: [remarkMath, remarkGfm],
    rehypePlugins: [
        [rehypeKatex, { strict: true, throwOnError: true }],
        [rehypePrettyCode, {
            theme: {
                dark: TokyoNight,
                light: TokyoNightLight
            }
        }],
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
                className: "opacity-0 no-underline text-muted-foreground group-hover:opacity-100"
            }
        }],
    ],
}
