import { config } from "@/data/siteConfig";
import { getSortedPostsData } from "./posts";

export function generateStaticParamsWithLang(f) {
    const allParams = config.langs.map(lang => {
        return f(lang)
    }).reduce((allParams, params) => allParams.concat(params), [])

    return allParams
}

export function getTotalPages(lang, tag) {
    const posts = getSortedPostsData(lang, tag)
    return Math.ceil(posts.length / config.postPerPage)
}
