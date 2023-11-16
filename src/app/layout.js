import { Inter } from 'next/font/google'
import './globals.css'
import './katex.min.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Thallium54's Blog",
  description: 'Just some random stuff.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-[#222222] dark:bg-[#292A2D] dark:text-[#A9A9B3]`}>
        {children}
      </body>
    </html>
  )
}
