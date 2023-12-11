'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Languages } from "lucide-react";
import { config, languages } from "@/data/siteConfig";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LangSwitch() {
    const pathname = usePathname().split('/')
    const suffix = pathname.slice(2).join('/')
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Languages className="h-6 w-6 cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={20} className="text-foreground">
                {
                    config.langs.map(lang => (
                        <DropdownMenuItem key={lang}>
                            <Link href={`/${lang}/${suffix}`} >{languages[lang].name}</Link>
                        </DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
