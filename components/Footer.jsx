import React from 'react'
import Image from "next/image";
import Link from "next/link";
import logo from '@/assets/images/logo.png'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gray-200 py-4 sticky top-[100vh]">
            <div
                className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4"
            >
                <div className="mb-4 md:mb-0">
                    <Image src={ logo } alt="Logo" className="h-8 w-auto"/>
                </div>
                <div
                    className="flex flex-wrap justify-center md:justify-start mb-4 md:mb-0"
                >
                    <ul className="flex space-x-2 text-xs ms:space-x-4 md:text-base">
                        <li><Link href="/">Accueil</Link></li>
                        <li><Link href="/properties">Propriétés</Link></li>
                        <li><Link href="#">Conditions d'utilisation</Link></li>
                    </ul>
                </div>
                <div>
                    <p className="text-sm text-gray-500 mt-2 md:mt-0">
                        &copy; { currentYear } Next-Property. Tous droits réservés.
                    </p>
                </div>
            </div>
        </footer>
    )
}
export default Footer
