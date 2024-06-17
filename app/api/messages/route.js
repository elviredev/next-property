import connectDB from "@/config/database";
import Message from "@/models/Message";
import {getSessionUser} from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic'

// GET /api/messages (récupérer les mails envoyés à un utilisateur, classés par Nouveau et par date)
export const GET = async () => {
    try {
        // connect BDD
        await connectDB()

        // user en session
        const sessionUser = await getSessionUser()

        // vérifier la session
        if (!sessionUser || !sessionUser.user) {
            return new Response(JSON.stringify("ID utilisateur requis."), {status: 401})
        }

        // obtenir user
        const { userId } = sessionUser

        // obtenir les messages lus
        const readMessages = await Message
            .find({ recipient: userId, read: true })
            .sort({ createdAt: -1 }) // sort read messages in asc order
            .populate('sender', 'username')
            .populate('property', 'name')

        // obtenir les messages non lus
        const unreadMessages = await Message
            .find({ recipient: userId, read: false })
            .sort({ createdAt: -1 }) // sort unread messages in asc order
            .populate('sender', 'username')
            .populate('property', 'name')

        // obtenir tous les messages triés auparavant
        const messages = [...unreadMessages, ...readMessages]

        return new Response(JSON.stringify(messages), {status: 200})

    } catch (e) {
        console.log(e)
        return new Response("Quelque chose s'est mal passé.", {status: 500})
    }
}

// POST /api/messages (envoyer un mail)
export const POST = async (request) => {
    try {
        // connect BDD
        await connectDB()

        // récupérer données du form
        const { name, email, phone, message, property, recipient } = await request.json()

        // user en session
        const sessionUser = await getSessionUser()

        // vérifier la session
        if (!sessionUser || !sessionUser.user) {
            return new Response(JSON.stringify({message: "Vous devez être connecté pour envoyer un message"}), {status: 401})
        }

        // obtenir user
        const { user } = sessionUser

        // un propriétaire d'annonce ne peut pas s'envoyer de message à lui même
        if (user.id === recipient) {
            return new Response(JSON.stringify({message: "Vous ne pouvez pas vous envoyer de message à vous-même"}), {status: 400})
        }

        // créer nouveau message
        const newMessage = new Message({
            sender: user.id,
            recipient,
            property,
            name,
            email,
            phone,
            body: message
        })

        // save new message
        await newMessage.save()

        return new Response(JSON.stringify({message: "Message envoyé"}), {status: 200})
    } catch (e) {
        console.log(e)
        return new Response("Quelque chose s'est mal passé.", {status: 500})
    }
}
