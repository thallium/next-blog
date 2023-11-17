import { getPostsByTag, getSortedPostsData } from "@/lib/posts"
import ListItem from "./ListItem"
import { config } from "@/data/siteConfig"

export default function Posts({ lang, page, category, tag }) {
    const postPerPage = config.postPerPage
    let posts;
    posts = getSortedPostsData(lang, { category, tag })
    posts = posts.slice((page - 1) * postPerPage, page * postPerPage)
    return (
        <section className="mt-6 mx-auto">
            <ul >
                {posts.map(post => (
                    <ListItem key={post.id} post={post} lang={lang} />
                ))}
            </ul>
        </section>
    )
}
