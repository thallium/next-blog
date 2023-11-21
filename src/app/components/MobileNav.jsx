import { IconMenu2 } from "@tabler/icons-react"
import navLinks from "@/data/navLinks"
import LangSwitch from "./LangSwitch"
import Link from "next/link"

export default function MobileNav({ lang }) {
    return (
        <div className="dropdown dropdown-end sm:hidden text-base-content">
            <IconMenu2 tabIndex={0} />
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-md">
                {navLinks
                    .filter((link) => link.href !== '/')
                    .map((link) => (
                        <li key={link.title}><Link
                            href={`/${lang}${link.href}`}
                            className="text-base"
                        >
                            {link.title}
                        </Link></li>
                    ))}
            </ul>
        </div>
    )
}
