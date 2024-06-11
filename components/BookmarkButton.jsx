'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

import { FaBookmark } from 'react-icons/fa'
const BookmarkButton = ({ property }) => {

    // obtenir la session
    const { data: session } = useSession()

    // obtenir userId dans la session
    const userId = session?.user?.id

    const [isBookmarked, setIsBookmarked] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // si user non connecté
        if (!userId) {
            setLoading(false)
            return
        }

        // si user connecté, vérifier le statut du favori
        const checkBookmarkStatus = async () => {
            try {
                // requête vers API
                const res = await fetch('/api/bookmarks/check', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        propertyId: property._id
                    })
                })

                // vérifier response
                if (res.status === 200) {
                    // récupérer données
                    const data = await res.json()
                    // mettre à jour le state
                    setIsBookmarked(data.isBookmarked)
                }
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }
        checkBookmarkStatus()
    }, [property._id, userId]);

    const handleClick = async () => {
        if (!userId) {
            toast.error('Vous devez être connecté pour ajouter une propriété à vos favoris.')
            return
        }

        // si user connecté
        try {
            // requête vers API
            const res = await fetch('/api/bookmarks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    propertyId: property._id
                })
            })

            // vérifier response
            if (res.status === 200) {
                // récupérer données
                const data = await res.json()
                // notification
                toast.success(data.message)
                // mettre à jour le state
                setIsBookmarked(data.isBookmarked)
            }
        } catch (e) {
            console.error(e)
            toast.error('Quelque chose s\'est mal passé.')
        }
    }

    if (loading) return <p className='text-center'>Chargement...</p>

    return isBookmarked ? (
        <button
            onClick={handleClick}
            className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
        >
            <FaBookmark className="mr-2" /> Supprimer des favoris
        </button>
    ) : (
        <button
            onClick={handleClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
        >
            <FaBookmark className="mr-2"/> Ajouter aux favoris
        </button>
    )
}
export default BookmarkButton
