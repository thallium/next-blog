import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

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
 * @param {{category: string, tag: string}} opt
 * @returns PostData[]
 */
export function getSortedPostsData(lang, opt) {
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
            draft: matterData.draft,
        }

        return blogPost;
    }).filter(post => !post.draft)

    // Sort posts by date
    allPostsData.sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return a.date < b.date ? 1 : -1
    })

    if (!opt || (!opt.category && !opt.tag)) return allPostsData;
    else if (opt.category) {
        return allPostsData.filter(post => {
            return post.categories && post.categories.includes(opt.category)
        })
    } else if (opt.tag) {
        return allPostsData.filter(post => {
            return post.tags && post.tags.includes(opt.tag)
        })
    }
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
export function getPostData(lang, id) {
    const fullPath = path.join(postsRootDirectory, lang, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterData = matter(fileContents)

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

export function getTags(lang) {
    const cnt = getSortedPostsData(lang).reduce((cnt, post) => {
        if (!post.tags) return cnt;
        for (let tag of post.tags) {
            if (cnt[tag]) {
                cnt[tag]++;
            } else {
                cnt[tag] = 1;
            }
        }
        return cnt;
    }, {})

    const sorted = Object.entries(cnt).sort((a, b) => {
        return a[0] < b[0] ? -1 : 1
    })

    return sorted;
}
