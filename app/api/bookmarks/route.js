import connectDB from "@/config/database";
import User from "@/models/User"
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

// Pour déploiement PROD vers Vercel
export const dynamic = 'force-dynamic'

// GET /api/bookmarks (get propriétés sauvegardées)
export const GET = async () => {
    try {
        // connect BDD
        await connectDB()

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

        // obtenir les favoris du user
        const bookmarks = await Property.find({ _id: { $in: user.bookmarks }})

        return new Response(JSON.stringify(bookmarks), {status: 200})

    } catch (e) {
        console.error(e)
        return new Response('Quelque chose s\'est mal passé.', { status: 500 })
    }
}

// POST /api/bookmarks (post add or remove property to bookmarks array)
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

        let message

        if (isBookmarked) {
            // si déja en favori on la retire
            user.bookmarks.pull(propertyId)
            message = 'Favori supprimé avec succès.'
            isBookmarked = false
        } else {
            // si pas en favori on l'ajoute
            user.bookmarks.push(propertyId)
            message = 'Favori ajouté avec succès.'
            isBookmarked = true
        }

        // sauvegarder en BDD
        await user.save()

        return new Response(JSON.stringify({ message, isBookmarked }), { status: 200 })
        
    } catch (e) {
        console.error(e)
        return new Response('Quelque chose s\'est mal passé.', { status: 500 })
    }
}