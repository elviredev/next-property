import connectDB from "@/config/database";
import User from "@/models/User"
import { getSessionUser } from "@/utils/getSessionUser";

// pour déploiement vers Vercel
export const dynamic = 'force-dynamic'

// POST /api/bookmarks/check (verify isBookmarked)
export const POST = async (request) => {
    try {
        // connect BDD
        await connectDB()
        // obtenir ID de la property
        const { propertyId } = await request.json()
        // obtenir la session
        const sessionUser = await getSessionUser()
        // vérifier qu'il existe une session et un user dans la session
        if (!sessionUser || !sessionUser.userId) {
            return new Response('ID Utilisateur requis.', { status: 401 })
        }
        // obtenir ID user
        const { userId } = sessionUser

        // trouver user en bdd
        const user = await User.findOne({ _id: userId })

        // vérifier si la propriété est déja ajoutée aux favoris
        let isBookmarked = user.bookmarks.includes(propertyId)

        return new Response(JSON.stringify({ isBookmarked }), { status: 200 })
    } catch (e) {
        console.error(e)
        return new Response('Quelque chose s\'est mal passé.', { status: 500 })
    }
}
