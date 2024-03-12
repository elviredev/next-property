import React from 'react'
import Link from "next/link";

const HomePage = () => {
    return (
        <div>
            <h1 className="text-3xl">Bienvenue</h1>
            <Link href="/properties">Voir Propriétés</Link>
        </div>
    )
}
export default HomePage
