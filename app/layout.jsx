import React from 'react'
import '@/assets/styles/globals.css'

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
            <div>{ children }</div>
        </body>
        </html>
    )
}
export default MainLayout





