import { languages } from "@/data/siteConfig"

export function translate(lang, key) {
    return languages[lang].dict[key]
}
