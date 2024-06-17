import connectDB from "@/config/database";
import Message from "@/models/Message";
import {getSessionUser} from "@/utils/getSessionUser";

// pour deploy vercel
export const dynamic = 'force-dynamic'

// PUT /api/messages/:id
export const PUT = async (request, { params }) => {
    try {
        await connectDB()

        // obtenir ID
        const { id } = params

        // obtenir userId en session
        const sessionUser = await getSessionUser()

        // vérifier la session
        if (!sessionUser || !sessionUser.user) {
            return new Response("ID utilisateur requis.", {status: 401})
        }

        // obtenir user
        const { userId } = sessionUser

        // find message by ID
        const message = await Message.findById(id)

        // vérifier que le message existe
        if (!message) return new Response("Message non trouvé !", {status: 404})

        // vérifier propriété du message
        if (message.recipient.toString() !== userId) {
            return new Response("Non Autorisé.", {status: 401})
        }

        // modifier message a lu/non lu selon le statut actuel
        message.read = !message.read

        // save message
        await message.save()

        return new Response(JSON.stringify(message), {status: 200})
    } catch (e) {
        console.log(e)
        Response("Quelque chose s'est mal passé", {status: 500})
    }
}

// DELETE /api/messages/:id
export const DELETE = async (request, { params }) => {
    try {
        await connectDB()

        // obtenir ID
        const { id } = params

        // obtenir userId en session
        const sessionUser = await getSessionUser()

        // vérifier la session
        if (!sessionUser || !sessionUser.user) {
            return new Response("ID utilisateur requis.", {status: 401})
        }

        // obtenir user
        const { userId } = sessionUser

        // find message by ID
        const message = await Message.findById(id)

        // vérifier que le message existe
        if (!message) return new Response("Message non trouvé !", {status: 404})

        // vérifier propriété du message
        if (message.recipient.toString() !== userId) {
            return new Response("Non Autorisé.", {status: 401})
        }

        // supprimer le mesasge
        await message.deleteOne()

        return new Response("Message supprimé !", {status: 200})
    } catch (e) {
        console.log(e)
        Response("Quelque chose s'est mal passé", {status: 500})
    }
}


























