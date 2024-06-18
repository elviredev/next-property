'use client'
import { useState, useEffect } from "react";
import Image from "next/image"
import Link from 'next/link'
import { useSession } from "next-auth/react";
import profileDefault from '@/assets/images/profile.png'
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";

const ProfilePage = () => {
    // Image du profil user en session
    const { data: session } = useSession()
    const profileImage = session?.user?.image
    const profileName = session?.user?.name
    const profileEmail = session?.user?.email

    // state
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    // récupérer données
    useEffect(() => {
        const fetchUserProperties = async (userId) => {
            if (!userId) {
                return
            }

            try {
                const res = await fetch(`/api/properties/user/${userId}`);

                if (res.status === 200) {
                    const data = await res.json()
                    setProperties(data)
                }
            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false)
            }
        }

        // fetch user properties when session is available
        if (session?.user?.id) {
            fetchUserProperties(session.user.id);
        }
    }, [session]);


    // Handle Delete Property
    const handleDeleteProperty = async (propertyId) => {
        const confirmed = window.confirm('Etes-vous sûr de vouloir supprimer cette propriété ?')
        if (!confirmed) return
        
        try {
            const res = await fetch(`/api/properties/${propertyId}`, { method: 'DELETE' })

            if (res.status === 200) {
                // supprimer la propriété de l'UI, du state
                const updatedProperties = properties.filter((property) => property._id !== propertyId)

                setProperties(updatedProperties)
                toast.success('Propriété supprimée')
            } else {
                toast.error('Echec pour supprimer la propriété')
            }
        } catch (e) {
            console.log(e)
            toast.error('Echec pour supprimer la propriété')
        }
    }

    return (
        <section className="bg-indigo-50">
            <div className="container m-auto py-24">
                <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <h1 className="text-3xl font-bold mb-4">Votre profil</h1>
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 sm:mx-20 mt-10 mb-5">
                            <div className="mb-4">
                                <Image
                                    className="h-16 w-16 sm:w-32 sm:h-32 object-cover rounded-full mx-auto md:mx-0"
                                    src={profileImage || profileDefault}
                                    width={200}
                                    height={200}
                                    alt="User"
                                />
                            </div>
                            <h2 className="text-sm lg:text-xl mb-4">
                                <span className="font-bold block">Nom: </span>
                                {profileName}
                            </h2>
                            <h2 className="text-sm lg:text-xl"><span className="font-bold block">Email: </span>
                                {profileEmail}
                            </h2>
                        </div>

                        <div className="md:w-3/4 md:pl-4">
                            <h2 className="text-2xl text-indigo-500 font-semibold mb-4">Vos annonces</h2>
                            { !loading && properties.length === 0 && (
                                <p>Vous n'avez pas d'annonces en cours.</p>
                            ) }

                            { loading ? (<Spinner loading={loading}/>) : (
                                properties.map((property) => (
                                    <div key={property._id} className="mb-10">
                                        <Link href={`/properties/${property._id}`}>
                                            <Image
                                                className="h-32 w-full rounded-md object-cover"
                                                src={property.images[0]}
                                                alt=''
                                                width={500}
                                                height={100}
                                                priority={true}
                                            />
                                        </Link>
                                        <div className="mt-2">
                                            <p className="text-lg font-semibold">{property.name}</p>
                                            <p className="text-gray-600">Adresse: {property.location.street} - {property.location.city} ({property.location.state})
                                            </p>
                                        </div>
                                        <div className="mt-2">
                                            <Link
                                                href={`/properties/${property._id}/edit`}
                                                className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                                            >
                                                Modifier
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteProperty(property._id)}
                                                className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                                                type="button"
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) }

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default ProfilePage
