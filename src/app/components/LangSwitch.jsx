'use client'

import { LanguageIcon } from "@heroicons/react/24/outline";
import { langs, data } from "@/data/i18n";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LangSwitch() {
    const pathname = usePathname().split('/')
    const suffix = pathname.slice(2).join('/')
    return (
        <div className="dropdown dropdown-end">
            <LanguageIcon tabIndex={0} className="h-6 w-6 cursor-pointer" />
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow rounded-box text-base bg-base-200">
                {
                    langs.map(lang => (
                        <li key={lang}>
                            <Link href={`/${lang}/${suffix}`} >{data[lang].name}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
