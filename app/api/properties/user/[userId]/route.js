import connectDB from "@/config/database";
import Property from "@/models/Property";


// GET /api/properties/user/:userId (get user listings)
export const GET = async (request, { params }) => {
    try {
        // se connecter à la bdd
        await connectDB()

        // stocker user ID
        const userId = params.userId

        // vérifier si user id existe
        if (!userId) {
            return new Response('L\'ID utilisateur est requis.', { status: 400 })
        }

        // récupérer toutes les propriétés de l'utilisateur
        const properties = await Property.find({ owner: userId })

        // transmettre properties
        return new Response(JSON.stringify(properties), { status: 200 })
    } catch (e) {
        console.log(e.message)
        return new Response('Something went wrong...', { status: 500 })
    }
}