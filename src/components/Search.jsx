'use client'
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandLoading,
} from "@/components/ui/command"
import { useState, useEffect } from "react";
import FlexSearch from "flexsearch"
import { useRouter } from "next/navigation";
import { Search as SearchIcon } from "lucide-react"

const indexes = {}

async function loadIndexes(lang) {
    if (indexes[lang]) return indexes[lang]

    const pageIndex = new FlexSearch.Document({
        cache: 100,
        tokenize: 'full',
        document: {
            id: 'id',
            index: ['content', 'title'],
            store: ['title']
        },
        context: {
            resolution: 9,
            depth: 2,
            bidirectional: true
        }
    })

    const res = await fetch(`/search-index/${lang}.json`);
    const posts = await res.json();
    console.log("Loaded index")

    for (const post of posts) {
        pageIndex.add({
            id: post.id,
            title: post.title,
            content: post.content
        })
    }

    indexes[lang] = pageIndex
}

export default function Search({ lang }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState([])
    const router = useRouter()

    useEffect(() => {
        const down = (e) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    useEffect(() => {
        if (open) {
            setLoading(true)
            loadIndexes(lang).then(() => setLoading(false))
        }
    }, [open, lang])

    const doSearch = (search) => {
        if (!search) {
            setResults([])
            return;
        }
        const pageIndex = indexes[lang];
        const pageResults = pageIndex.search(search, 5, {
            enrich: true,
            suggest: true
        })[0]?.result || []

        setResults(pageResults);
    }

    return (
        <>
            <SearchIcon onClick={() => setOpen((open) => !open)} className="h-6 w-6 cursor-pointer" />

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput onValueChange={doSearch} placeholder="Search blog posts..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                        {loading && <CommandLoading>Loading</CommandLoading>}
                        {
                            results.map(result => (
                                <CommandItem key={result.id} onSelect={() => { setOpen(open => !open); router.push(`/${lang}/post/${result.id}`); setResults([]) }}>{result.doc.title}</CommandItem>
                            ))
                        }
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}
