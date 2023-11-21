import { languages } from '@/data/siteConfig'
import { siteMetadata } from '@/data/siteConfig'

/**
 * 
 * @param {import('next').Metadata} param0 
 * @return {import('next').Metadata}
 */
export function genPageMetadata({ lang, title, description, ...rest }) {
    return {
        title,
        openGraph: {
            title,
            description: description || siteMetadata.description,
            url: './',
            siteName: siteMetadata.title,
            locale: languages[lang].langCode,
            type: 'website',
        },
        twitter: {
            title,
        },
        ...rest
    }
}
