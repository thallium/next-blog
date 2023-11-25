import Link from "next/link"
import { siteMetadata } from "@/data/siteConfig"
import { languages } from "@/data/siteConfig"
import MobileNav from "./MobileNav"
import LangSwitch from "./LangSwitch"

export default function Navbar({ lang }) {
    return (
        <header className="bg-base-200 text-base-content">
            <div className="mx-auto max-w-3xl py-5 px-4 sm:px-8 xl:px-0 xl:max-w-3xl flex items-center justify-between">
                <div>
                    <Link href={`/${lang}`}>
                        <div className="flex items-center justify-between">
                            <div className="font-semibold block">
                                {siteMetadata.title}
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
                    {languages[lang].navLinks
                        .filter((link) => link.href !== '/')
                        .map((link) => (
                            <Link
                                key={link.title}
                                href={`/${lang}${link.href}`}
                                className="hidden sm:block whitespace-nowrap"
                            >
                                {link.title}
                            </Link>
                        ))}
                    <LangSwitch />
                    <MobileNav lang={lang} />
                </div>
            </div>
        </header>
    )
}
