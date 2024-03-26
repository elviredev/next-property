import React from 'react'
import Image from "next/image"
import Link from "next/link"
import { FaBed, FaBath, FaRulerCombined, FaMoneyBill, FaMapMarker } from 'react-icons/fa'

const PropertyCard = ({ property }) => {
    // Fonction pour afficher tarifs selon périodicité
    const getRateDisplay = () => {
        // obtenir les tarifs
        const { rates } = property
        // condition d'affichage selon les tarifs
        if (rates.monthly) {
            return `${rates.monthly.toLocaleString()}/mo`
        } else if (rates.weekly) {
            return `${rates.weekly.toLocaleString()}/sem`
        } else if (rates.nightly) {
            return `${rates.nightly.toLocaleString()}/nuit`
        }
    }

    return (
        <div className="rounded-xl shadow-md relative">
            <Image
                src={property.images[0]}
                alt=""
                height={0}
                width={0}
                sizes='100vw'
                className='w-full h-auto rounded-t-xl'
            />
            <div className="p-4">
                <div className="text-left md:text-center lg:text-left mb-6">
                    <div className="text-gray-600">{ property.type }</div>
                    <h3 className="text-xl font-bold">{ property.name }</h3>
                </div>
                <h3
                    className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-indigo-600 font-bold text-right md:text-center lg:text-right"
                >
                    €{ getRateDisplay() }
                </h3>

                <div className="flex justify-center gap-4 text-gray-500 mb-4">
                    <p>
                        <FaBed className='inline mr-2' /> {property.beds} { ' ' }
                        <span className="md:hidden lg:inline">
                            { property.beds === 1 ? 'Chambre' : 'Chambres'}
                        </span>
                    </p>
                    <p>
                        <FaBath className='inline mr-2' /> {property.baths} { ' ' }
                        <span className="md:hidden lg:inline">SdB</span>
                    </p>
                    <p>
                        <FaRulerCombined className='inline mr-2' /> {property.square_feet} { ' ' }
                        <span className="md:hidden lg:inline">m2</span>
                    </p>
                </div>

                <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
                    { property.rates.nightly && (
                        <p><FaMoneyBill className='inline mr-2' />Nuité</p>
                    )}

                    { property.rates.weekly && (
                        <p><FaMoneyBill className='inline mr-2' />Hebdomadaire</p>
                    )}

                    { property.rates.monthly && (
                        <p><FaMoneyBill className='inline mr-2' />Mensuel</p>
                    )}
                </div>

                <div className="border border-gray-100 mb-5"></div>

                <div className="flex flex-col lg:flex-row justify-between mb-4">
                    <div className="flex align-middle gap-2 mb-4 lg:mb-0">
                        <FaMapMarker className='text-orange-700 mt-1' />
                        <span className="text-orange-700"> { property.location.city } ({ property.location.state }) </span>
                    </div>
                    <Link
                        href={`/properties/${property._id}`}
                        className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                    >
                        Details
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default PropertyCard
