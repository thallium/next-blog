import { config } from '@/data/siteConfig';
import { getSortedPostsData } from '@/lib/posts';
import { generateByLang } from '@/lib/util';

/**
 * @return {import('next').MetadataRoute.Sitemap}
 */
export default function sitemap() {
    const siteURL = process.env.URL;
    const blogRoutes = generateByLang(lang => {
        return getSortedPostsData(lang).map(post => ({
            url: `${siteURL}/${lang}/post/${post.id}`,
            lastModified: post.lastModified || new Date(post.date)
        }))
    });
    const routes = generateByLang(lang => {
        return ['', 'posts', 'tags'].map(route => ({
            url: `${siteURL}/${lang}/${route}`,
            lastModified: new Date()
        }))
    })

    return [...routes, ...blogRoutes]
}
