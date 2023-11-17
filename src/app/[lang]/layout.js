import Navbar from "@/app/components/Navbar"
import Footer from "../components/Footer"

export default function RootLayout({ children, params }) {
    return (
        <>
            <Navbar lang={params.lang} />
            <div className="min-h-screen max-w-3xl mx-auto px-6 xl:px-0 font-light mt-6">
                {children}
            </div>
            <Footer />
        </>
    )
}
