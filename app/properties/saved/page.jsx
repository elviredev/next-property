'use client'
import React, { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";

const SavedPropertiesPage = () => {

    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSavedProperties = async () => {
            try {
                // Appel à notre requête GET
                const res = await fetch('/api/bookmarks')
                // vérifier le statut
                if (res.status === 200) {
                    // Récupérer data
                    const data = await res.json()
                    // Définir les propriétés sur les data reçues
                    setProperties(data)
                } else {
                    console.log(res.statusText)
                    toast.error('Échec de la récupération des propriétés enregistrées.')
                }
            } catch (e) {
                console.log(e)
                toast.error('Échec de la récupération des propriétés enregistrées.')
            } finally {
                setLoading(false)
            }
        }

        // Appel de la fonction
        fetchSavedProperties()
    }, []);

    console.log(properties)

    return loading ?(<Spinner loading={loading} />) : (
        <section className="px-4 py-6">
            <div className="container-xl lg:container m-auto px-4 py-6">
                <h1 className="text-2xl mb-4">Propriétés sauvegardées</h1>

                {properties.length === 0 ? (
                    <p>Aucune propriété n'a été sauvegardée.</p>
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
export default SavedPropertiesPage
