import connectDB from "@/config/database";
import Message from "@/models/Message";
import {getSessionUser} from "@/utils/getSessionUser";

// pour deploy vercel
export const dynamic = 'force-dynamic'

// GET /api/messages/unread-count
export const GET = async () => {
    try {
        await connectDB()

        // obtenir userId en session
        const sessionUser = await getSessionUser()

        // vérifier la session
        if (!sessionUser || !sessionUser.user) {
            return new Response("ID utilisateur requis.", {status: 401})
        }

        // obtenir user
        const { userId } = sessionUser

        // compter le nb de msg non lus
        const count = await Message.countDocuments({
            recipient: userId,
            read: false
        })

        return new Response(JSON.stringify(count), {status: 200})
    } catch (e) {
        console.log(e)
        Response("Quelque chose s'est mal passé", {status: 500})
    }
}
