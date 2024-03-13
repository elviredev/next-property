import React from 'react'
import Navbar from "@/components/Navbar";
import '@/assets/styles/globals.css'
import Footer from "@/components/Footer";

// Métadonnées - SEO
export const metadata = {
    title: 'Next-Property | Trouvez la location idéale',
    description: 'Trouvez la location de vos rêves',
    keywords: 'location, propriétés, trouvez locations, trouvez propriétés'
}

const MainLayout = ({ children }) => {
    return (
        <html lang='fr' suppressHydrationWarning={true}>
        <body>
            <Navbar />
            <main>{ children }</main>
        <Footer />
        </body>
        </html>
    )
}
export default MainLayout





