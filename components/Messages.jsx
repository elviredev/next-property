'use client'
import {useState, useEffect} from "react";
import Spinner from "@/components/Spinner";
import Message from '@/components/Message'

const Messages = () => {

    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getMessages = async () => {
            try {
                // requête à la route API GET
                const res = await fetch('/api/messages')
                // vérifier status
                if (res.status === 200) {
                    // récupérer les données
                    const data = await res.json()
                    // définir le state
                    setMessages(data)
                }
            } catch (e) {
                console.log('Erreur lors de la récupération des messages: ', e)
            } finally {
                setLoading(false)
            }
        }

        getMessages()
    }, []);

    return loading ? (<Spinner loading={loading} />) : (
        <section className="bg-indigo-50">
            <div className="container m-auto py-24 max-w-6xl">
                <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <h1 className="text-3xl font-bold mb-4">Vos messages</h1>

                    <div className="space-y-4">
                        { messages.length === 0 ? (<p>Vous n'avez pas de messages.</p>) : (
                            messages.map((message) => (
                                <Message key={message._id} message={message} />
                            ))
                        )}

                    </div>
                </div>
            </div>
        </section>
    )
}
export default Messages
