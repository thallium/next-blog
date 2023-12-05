import { ChevronRight } from 'lucide-react';
import { siteMetadata } from '@/data/siteConfig';

export default function Footer() {
    return (
        <footer className="footer items-center p-4 max-w-3xl mx-auto px-6 xl:px-0 text-neutral-content">
            <aside className="items-center grid-flow-col">
                <ChevronRight className="h-6 w-6 text-gray-500" />
                <p className='font-bold'>{siteMetadata.title}</p>
            </aside>
            <p className="md:place-self-center md:justify-self-end">
                © 2023 Powered by Next.js | Theme inspired by Panr
            </p>
        </footer>
    )
}
