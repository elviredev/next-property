import React from 'react'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { Montserrat, Lora } from 'next/font/google'
import { ToastContainer } from 'react-toastify';
import {GlobalProvider} from "@/context/GlobalContext";
import '@/assets/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';

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
        <GlobalProvider>
            <AuthProvider>
                <html
                    lang='fr'
                    suppressHydrationWarning={true}
                    className={`${montserrat.className} ${lora.variable}`}
                >

                    <body>
                        <Navbar />
                        <main className="min-h-svh">{ children }</main>
                        <Footer />
                        <ToastContainer />
                    </body>
                </html>
            </AuthProvider>
        </GlobalProvider>
    )
}
export default MainLayout





