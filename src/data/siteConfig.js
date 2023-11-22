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
