import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { config, languages } from "@/data/siteConfig"
import { notFound } from "next/navigation"
import { Inter } from "next/font/google"
import '@/app/globals.css'
import '@/app/katex.min.css'
import { siteMetadata } from "@/data/siteConfig"

/** @return {import('next').Metadata} */
export function generateMetadata({ params }) {
    const { lang } = params;
    return {
        metadataBase: new URL(process.env.URL),
        title: {
            default: siteMetadata.title,
            template: `%s | ${siteMetadata.title}`
        },
        description: siteMetadata.description,
        openGraph: {
            title: siteMetadata.title,
            description: siteMetadata.description,
            url: './',
            siteName: siteMetadata.title,
            locale: languages[lang].langCode,
            type: 'website',
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        twitter: {
            title: siteMetadata.title,
            card: 'summary_large_image',
        },
    }
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children, params }) {
    const { lang } = params;
    if (!config.langs.includes(lang)) {
        notFound();
    }
    return (
        <html lang={`${languages[lang].langCode}`}>
            <body className={`${inter.className} `}>
                <Navbar lang={params.lang} />
                <div className="min-h-screen max-w-3xl mx-auto px-4 sm:px-8 xl:px-0 mt-8 sm:mt-12">
                    {children}
                </div>
                <Footer />
            </body>
        </html>
    )
}
