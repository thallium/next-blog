import { defineDocumentType, makeSource } from 'contentlayer/source-files'

/**@type {import("contentlayer/source-files").FieldDefs} */
const fields = {
    authors: { type: 'list', of: { type: 'string' } },
    categories: { type: 'list', of: { type: 'string' } },
    category: { type: 'string' },
    date: { type: 'date', required: true },
    draft: { type: 'boolean' },
    featured: { type: 'boolean' },
    image: { type: 'json' },
    keywords: { type: 'list', of: { type: 'string' } },
    lastmod: { type: 'date' },
    layout: { type: 'string' },
    math: { type: 'boolean' },
    output: { type: 'string' },
    profile: { type: 'boolean' },
    projects: { type: 'list', of: { type: 'string' } },
    published: { type: 'boolean' },
    subtitle: { type: 'string' },
    summary: { type: 'string' },
    tags: { type: 'list', of: { type: 'string' } },
    title: { type: 'string', required: true },
}

/**@type {import("contentlayer/source-files").ComputedFields} */
const computedFields = {
    _tags: {
        type: 'list',
        of: { type: 'string' },
        resolve: (doc) => {
            const cat = doc.category || doc.categories || []
            const tags = doc.tags || []
            return [...new Set([...tags, ...cat])].sort()
        }
    },
    id: {
        type: 'string',
        resolve: (doc) => doc._raw.sourceFileName.replace(/\.md$/, '')
    },
    lang: { type: 'string', resolve: (doc) => doc._raw.sourceFilePath.split('/')[0] },
}

export const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: `*/posts/*.md`,
    fields,
    computedFields: {
        ...computedFields,
    }
}))

export default makeSource({
    contentDirPath: 'content',
    documentTypes: [Post],
    contentDirExclude: ['**/index.md']
})
