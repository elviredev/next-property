'use client'

import React, {useState, useEffect} from "react";
import {useSearchParams} from "next/navigation";
import Link from 'next/link'
import {FaArrowAltCircleLeft} from 'react-icons/fa'
import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import Spinner from "@/components/Spinner";

const SearchResultsPage = () => {

    // obtenir les paramètres directement depuis URL
    const searchParams = useSearchParams()

    // state
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)

    // params
    const location = searchParams.get('location')
    const propertyType = searchParams.get('propertyType')

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                // requête à l'API
                const res = await fetch(`/api/properties/search?location=${location}&propertyType=${propertyType}`)

                // vérifier statut
                if (res.status === 200) {
                    const data = await res.json()
                    setProperties(data)
                } else {
                    setProperties([])
                }
            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false)
            }
        }

        fetchSearchResults()
    }, [location, propertyType]);

    // console.log(properties)


    return (
        <>
            <section className="bg-indigo-700 py-4">
                <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
                    <PropertySearchForm />
                </div>
            </section>

            {
                loading ?(<Spinner loading={loading} />) : (
                    <section className="px-4 py-6">
                        <div className="container-xl lg:container m-auto px-4 py-6">
                            <Link href='/properties' className="flex items-center text-blue-500 hover:underline mb-3">
                                <FaArrowAltCircleLeft className="mr-2 mb-1" /> Retour aux propriétés
                            </Link>
                            <h1 className="text-2xl mb-4">Résultats de recherche</h1>
                            {properties.length === 0 ? (
                                <p>Aucun résultat n'a été trouvé.</p>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Parcourir les propriétés*/}
                                    {properties.map((property) => (
                                        <PropertyCard
                                            key={property._id}
                                            property={property}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                )
            }
        </>
    )
}
export default SearchResultsPage
