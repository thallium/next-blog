import React from 'react'
import Link from 'next/link';
import { IconCategory } from '@tabler/icons-react';

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
            <Link className="mb-4 font-medium" href={`/${lang}/posts/${id}`}>{title}</Link>
            <div className="text-base flex flex-row gap-x-2 mb-2 mt-1 items-center">

                {
                    post.date &&
                    <time>{new Date(post.date).toISOString().split("T")[0]}</time>
                }
                {
                    (post.categories && post.categories.length > 0) &&
                    <Link href={"/"} className='flex flex-row items-center'>
                        <IconCategory size={20} />
                        {post.categories[0]}
                    </Link>
                }
            </div>
        </li>
    )
}
