import Navbar from "@/app/components/Navbar"

export default function RootLayout({ children, params }) {
    return (
        <>
            <Navbar lang={params.lang} />
            <div className="max-w-3xl mx-auto px-6 xl:px-0 font-light my-6">
                {children}
            </div>
        </>
    )
}
