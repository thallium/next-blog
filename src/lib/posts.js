import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsRootDirectory = path.join(process.cwd(), 'content')

/**
 * @typedef {{
 *  id: string, 
 *  title: string,
 *  date: number,
 *  summary: string,
 *  keywords: string[],
 *  tags: string[],
 *  content: string,
 * }} PostData
 */

/**
 * @param {string} lang
 * @param {{category: string, tag: string}} opt
 * @returns {PostData[]}
 */
export function getSortedPostsData(lang, tag) {
    const postsDirectory = path.join(postsRootDirectory, lang, 'posts')
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '')

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // Use gray-matter to parse the post metadata section
        const mat = matter(fileContents)
        const matterData = mat.data

        const tags = (matterData.tags || []).concat(matterData.categories)
        // Combine the data with the id
        /** @type PostData */
        const blogPost = {
            id,
            title: matterData.title,
            date: Date.parse(matterData.date),
            summary: matterData.summary,
            keywords: matterData.keywords,
            tags: [...new Set(tags)].sort(),
            draft: matterData.draft,
            content: mat.content,
        }

        return blogPost;
    }).filter(post => !post.draft)

    // Sort posts by date
    allPostsData.sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return a.date < b.date ? 1 : -1
    })

    if (tag) {
        return allPostsData.filter(post => {
            return post.tags?.includes(tag)
        })
    }
    else {
        return allPostsData;
    }
}

/**
 * 
 * @param {string} lang 
 * @param {string} id 
 * @returns {PostData}
 */
export function getPostData(lang, id) {
    return getSortedPostsData(lang).find(post => post.id === id)
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

export function readContent(lang, id) {
    const fileName = path.join(postsRootDirectory, lang, `${id}.md`)
    const fileContents = fs.readFileSync(fileName, 'utf8')

    // Use gray-matter to parse the post metadata section
    const mat = matter(fileContents)
    return mat.content;
}
