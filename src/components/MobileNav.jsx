import { Menu } from "lucide-react"
import { languages } from "@/data/siteConfig"
import Link from "next/link"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function MobileNav({ lang }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Menu className="h-6 w-6 cursor-pointer sm:hidden" />
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={20}>
                {
                    languages[lang].navLinks
                        .filter((link) => link.href !== '/')
                        .map((link) => (
                            <DropdownMenuItem key={link.title}>
                                <Link
                                    href={`/${lang}${link.href}`}
                                    className="whitespace-nowrap text-foreground"
                                >
                                    {link.title}
                                </Link>
                            </DropdownMenuItem>
                        ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
