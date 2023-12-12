import YAML from 'yaml'
import { writeFileSync } from 'fs'

const frontmatter = {
    title: '',
    date: new Date().toISOString(),
    tags: [],
    summary: "",
    keywords: [],
}

const res = "---\n" + YAML.stringify(frontmatter) + "---\n"

writeFileSync(process.argv[2], res)

console.log(`Created ${process.argv[2]}`)
