'use client'

import { Languages } from "lucide-react";
import { config, languages } from "@/data/siteConfig";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LangSwitch() {
    const pathname = usePathname().split('/')
    const suffix = pathname.slice(2).join('/')
    return (
        <div className="dropdown dropdown-end">
            <Languages tabIndex={0} className="h-6 w-6 cursor-pointer" />
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow rounded-box text-base bg-base-200">
                {
                    config.langs.map(lang => (
                        <li key={lang}>
                            <Link href={`/${lang}/${suffix}`} >{languages[lang].name}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
