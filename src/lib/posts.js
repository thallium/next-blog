import { readFileSync } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { allDocuments } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'


/**
 * @param {string} lang
 * @param {string?} tag
 * @returns {import('contentlayer/generated').Post[]}
 */
export function getSortedPostsData(lang, tag) {
    const allPostsData = allDocuments
        .filter(post => post.lang === lang && !post.draft)
        .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

    if (tag) {
        return allPostsData.filter(post => post.tags?.includes(tag))
    } else {
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
    try {
        const data = readFileSync(path.join(process.cwd(), '.contentlayer', 'generated', 'Post', `${lang}__posts__${id}.md.json`), 'utf8')
        return JSON.parse(data)
    } catch (e) {
        return null;
    }
    // return allDocuments.find(post => post.id === id && post.lang === lang)
}

export function getTags(lang) {
    const cnt = getSortedPostsData(lang).reduce((cnt, post) => {
        if (!post._tags) return cnt;
        for (let tag of post._tags) {
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

const contentRootDirectory = path.join(process.cwd(), 'content')

export function readContent(lang, id) {
    const fileName = path.join(contentRootDirectory, lang, `${id}.md`)
    const fileContents = readFileSync(fileName, 'utf8')

    // Use gray-matter to parse the post metadata section
    const mat = matter(fileContents)
    return mat.content;
}
