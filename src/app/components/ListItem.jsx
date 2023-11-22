import React from 'react'
import Link from 'next/link';
import { IconHash } from '@tabler/icons-react';

/**
 * import { PostData } from "../../lib/posts.js";
 * @param {{post: {import("../../lib/posts.js").PostData}, lang: string}} param0 
 * @returns 
 */
export default function ListItem({ post, lang }) {
    const { id, title, date, summary, keywords, tags, categories } = post;
    // const formattedDate = Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(date);
    return (
        <li className="mt-3 py-3 text-2xl">
            <Link className="mb-4 font-medium text-base-content" href={`/${lang}/post/${id}`}>{title}</Link>
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
        </li>
    )
}
