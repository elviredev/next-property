'use client'
import { useState } from "react";
import { toast } from "react-toastify";
import { useGlobalContext } from "@/context/GlobalContext";

const Message = ({ message }) => {

    const [isRead, setIsRead] = useState(message.read)
    const [isDeleted, setIsDeleted] = useState(false);

    const { setUnreadCount } = useGlobalContext()

    // Gestion des messages lus/non lus
    const handleReadClick = async () => {
        try {
            const res = await fetch(`/api/messages/${message._id}`, {
                method: 'PUT'
            })

            if (res.status === 200) {
                const { read } = await res.json()
                setIsRead(read)
                setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1))
                if (read) {
                    toast.success("Marquer comme lu")
                } else {
                    toast.success("Marquer comme nouveau")
                }
            }
        } catch (e) {
            console.log(e)
            toast.error("Quelque chose s'est mal passé.")
        }
    }

    // Supprimer un message
    const handleDeleteClick = async () => {
        try {
            const res = await fetch(`/api/messages/${message._id}`, {
                method: 'DELETE'
            })

            if (res.status === 200) {
                setIsDeleted(true)
                setUnreadCount((prevCount) => (prevCount - 1))
                toast.success("Message supprimé !")
            }
        } catch (e) {
            console.log(e)
            toast.error("Le message n'a pas été supprimé.")
        }
    }

    if (isDeleted) {
        return null
    }

    return (
        <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
            {!isRead && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-white text-sm px-2 py-1 rounded-md">Nouveau</div>
            )}
            <h2 className="text-xl mb-4">
                <span className="font-bold">Propriété demandée : </span>
                {message.property.name}
            </h2>
            <p className="text-gray-700">
                {message.body}
            </p>

            <ul className="mt-4">
                <li><strong>Nom : </strong>{message.sender.username}</li>

                <li>
                    <strong>Répondre à l'email : </strong>
                    <a
                        href={`mailto:${message.email}`}
                        className="text-blue-500">
                        {message.email}
                    </a>
                </li>
                <li>
                    <strong>Répondre au tél. : </strong>
                    <a
                        href={`tel:${message.phone}`}
                        className="text-blue-500">
                        {message.phone}
                    </a>
                </li>
                <li><strong>Reçu le : </strong>{new Date(message.createdAt).toLocaleString()}</li>
            </ul>
            <button
                onClick={handleReadClick}
                className={`mt-4 mr-3 ${isRead ? 'bg-gray-300' : 'bg-indigo-500 text-white'} text-sm py-1 px-3 rounded-md`}
            >
                {isRead ? 'Marquer comme nouveau' : 'Marquer comme lu'}
            </button>
            <button
                onClick={handleDeleteClick}
                className="mt-4 bg-red-500 text-white text-sm py-1 px-3 rounded-md"
            >
                Supprimer
            </button>
        </div>
    )
}
export default Message
