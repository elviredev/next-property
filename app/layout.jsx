import React from 'react'
import { Montserrat, Lora } from 'next/font/google'
import Navbar from "@/components/Navbar";
import '@/assets/styles/globals.css'
import Footer from "@/components/Footer";

// Métadonnées - SEO
export const metadata = {
    title: 'Next-Property | Trouvez la location idéale',
    description: 'Trouvez la location de vos rêves',
    keywords: 'location, propriétés, trouvez locations, trouvez propriétés'
}

// font-family google-fonts
const montserrat = Montserrat({
    weight: ['400', '700'],
    subsets: ['latin'],
    variable: 'font-montserrat',
    display: 'swap',
})

const lora = Lora({
    subsets: ['latin'],
    variable: '--font-lora',
    display: 'swap',
})

const MainLayout = ({ children }) => {
    return (
        <html lang='fr' suppressHydrationWarning={true} className={`${montserrat.className} ${lora.variable}`}>

        <body>
            <Navbar />
            <main>{ children }</main>
        <Footer />
        </body>
        </html>
    )
}
export default MainLayout





