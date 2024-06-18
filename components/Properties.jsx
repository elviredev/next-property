'use client'
import { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";
import Pagination from "@/components/Pagination";

const Properties = () => {

    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(6)
    const [totalItems, setTotalItems] = useState(0)

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                // requête à la route API
                const res = await fetch(`/api/properties?page=${page}&pageSize=${pageSize}`)
                // vérifier le statut
                if (!res.ok) {
                    throw new Error("Echec lors de la récupération des propriétés")
                }
                // si statut OK, récupérer les données
                const data = await res.json()
                // définir les propriétés
                setProperties(data.properties)
                setTotalItems(data.total)
            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false)
            }
        }

        fetchProperties()
    }, [page, pageSize]);

    // Pagination
    const handlePageChange = (newPage) => {
        setPage(newPage)
    }

    return loading ? (<Spinner loading={loading} />) : (
        <section className="px-4 py-6">
            <div className="container-xl lg:container m-auto px-4 py-6">
                {properties.length === 0 ? (
                    <p>Aucune propriété n'a été trouvée</p>
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
                <Pagination
                    page={page}
                    pageSize={pageSize}
                    totalItems={totalItems}
                    onPageChange={handlePageChange}
                />
            </div>
        </section>
    )
}
export default Properties
