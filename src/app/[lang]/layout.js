import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import { langs, data } from "@/data/i18n"
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
            locale: data[lang].langCode,
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

// <body className={`${inter.className} text-[#222222] bg-[#fff] dark:bg-[#292a2d] dark:text-[#A9A9B3]`}>
export default function RootLayout({ children, params }) {
    const { lang } = params;
    if (!langs.includes(lang)) {
        notFound();
    }
    return (
        <html lang={`${data[lang].langCode}`}>
            <body className={`${inter.className} `}>
                <Navbar lang={params.lang} />
                <div className="min-h-screen max-w-3xl mx-auto px-6 xl:px-0 mt-6">
                    {children}
                </div>
                <Footer />
            </body>
        </html>
    )
}
