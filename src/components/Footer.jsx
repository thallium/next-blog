import { ChevronRight } from 'lucide-react';
import { siteMetadata, config } from '@/data/siteConfig';

export default function Footer() {
    return (
        <footer className="flex flex-wrap justify-between items-center p-4 max-w-3xl mx-auto px-6 xl:px-0 text-muted-foreground">
            <div className='flex flex-row'>
                <ChevronRight className="h-6 w-6" />
                <p className='font-bold'>{siteMetadata.title}</p>
            </div>
            <p className="md:place-self-center md:justify-self-end">{config.footer}</p>
        </footer>
    )
}
