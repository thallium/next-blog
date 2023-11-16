import Link from "next/link"
import { siteMetadata } from "@/data/siteConfig"
import navLinks from "@/data/navLinks"

export default function Navbar({ lang }) {
    return (
        <header className="bg-[#FAFAFA] dark:bg-[#252627]">
            <div className="mx-auto max-w-3xl py-5 px-4 sm:px-6 xl:max-w-3xl xl:px-0 flex items-center justify-between">
                <div>
                    <Link href={`/${lang}`}>
                        <div className="flex items-center justify-between">
                            <div className="hidden font-semibold sm:block">
                                {siteMetadata.title}
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
                    {navLinks
                        .filter((link) => link.href !== '/')
                        .map((link) => (
                            <Link
                                key={link.title}
                                href={`/${lang}${link.href}`}
                                className="hidden sm:block"
                            >
                                {link.title}
                            </Link>
                        ))}
                </div>
            </div>
        </header>
    )
}
