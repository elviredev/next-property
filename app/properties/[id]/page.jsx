'use client'
import React from 'react'
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchProperty } from '@/utils/requests'
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyImages from "@/components/PropertyImages";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm";
import Spinner from "@/components/Spinner";
import { FaArrowLeft } from 'react-icons/fa'

const PropertyPage = () => {
    // obtenir ID
    const { id } = useParams()
    // State
    const [property, setProperty] = useState(null)
    const [loading, setLoading] = useState(true)

    // useEffect
    useEffect(() => {
        const fetchPropertyData = async () => {
            if (!id) return
            try {
                const property = await fetchProperty(id)
                setProperty(property)
            } catch (e) {
                console.error('Erreur lors de la récupération de la propriété', e)
            } finally {
                setLoading(false)
            }
        }
        // appel de fetchPropertyData que si property est null pour éviter la boucle sans fin
        if (property === null) {
            fetchPropertyData()
        }
    }, [id, property]);


    // si pas de propriété et si pas de chargement donc si la propriété est null
    if (!property && !loading) {
        return(
            <h1 className="text-center text-2xl font-bold mt-10">Propriété Non Trouvée</h1>
        )
    }

    return <>
        {loading && <Spinner loading={loading} />}
        {!loading && property && (<>
            {/* Property Header Image */}
            <PropertyHeaderImage image={ property.images[0] } />
            {/* Go Back */}
            <section className="bg-indigo-50">
                <div className="container m-auto py-6 px-6">
                    <Link
                        href="/properties"
                        className="text-indigo-500 hover:text-indigo-600 flex items-center"
                    >
                        <FaArrowLeft className="mr-2" /> Retour aux propriétés
                    </Link>
                </div>
            </section>
            {/* Détail Property */}
            <section className="bg-indigo-50">
                <div className="container m-auto py-10 px-6">
                    <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                        {/* Property Infos */}
                        <PropertyDetails property={property} />

                        {/* <!-- Sidebar --> */}
                        <aside className="space-y-4">
                            <BookmarkButton property={property} />
                            <ShareButtons property={property} />
                            <PropertyContactForm property={property} />
                        </aside>
                    </div>
                </div>
            </section>

            {/* Images supplémentaires */}
            <PropertyImages images={property.images} />
            </>)
        }
    </>

}
export default PropertyPage
