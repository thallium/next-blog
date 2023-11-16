import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import rehypeHighlight from 'rehype-highlight'
import remarkDirective from 'remark-directive'
import { figure } from './md-directives'
import torchlight from 'remark-torchlight'
import remarkParse from 'remark-parse'

const postsRootDirectory = path.join(process.cwd(), 'posts')

/**
 * @typedef {{
 *  id: string, 
 *  title: string,
 *  date: number,
 *  summary: string,
 *  keywords: string[],
 *  tags: string[],
 *  categories: string[],
 * }} PostData
 */

/**
 * @param {string} lang
 * @returns PostData[]
 */
export function getSortedPostsData(lang) {
    const postsDirectory = path.join(postsRootDirectory, lang)
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '')

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // Use gray-matter to parse the post metadata section
        const matterData = matter(fileContents).data

        // Combine the data with the id
        /** @type PostData */
        const blogPost = {
            id,
            title: matterData.title,
            date: Date.parse(matterData.date),
            summary: matterData.summary,
            keywords: matterData.keywords,
            tags: matterData.tags,
            categories: matterData.categories,
        }

        return blogPost;
    })
    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return a.date < b.date ? 1 : -1
    })
}

/**
 * 
 * @param {string} lang 
 * @param {string} id 
 * @returns {{
 *  id: string,
 *  title: string,
 *  date: number,
 *  tags: string[],
 *  categories: string[],
 *  contentHtml: string,
 * }}
 */
export async function getPostData(lang, id) {
    const fullPath = path.join(postsRootDirectory, lang, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterData = matter(fileContents)

    // const processedContent = await remark()
    //     .use(remarkParse)
    //     .use(remarkDirective)
    //     .use(remarkGfm)
    //     .use(remarkMath)
    //     .use(figure)
    //     .use(torchlight)
    //     .use(remarkRehype)
    //     .use(rehypeKatex)
    //     .use(rehypeStringify)
    //     .process(matterData.content)

    const blogPost = {
        id,
        title: matterData.data.title,
        date: Date.parse(matterData.data.date),
        tags: matterData.data.tags,
        categories: matterData.data.categories,
        contentHtml: matterData.content,
    }

    return blogPost;
}
