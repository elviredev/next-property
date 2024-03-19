import connectDB from "@/config/database";
import Property from "@/models/Property";

// GET /api/properties/:id
export const GET = async (request, { params }) => {
    try {
        // se connecter à la bdd
        await connectDB()

        // récupérer une seule propriété
        const property = await Property.findById(params.id)

        // si aucune propriété trouvée
        if (!property) return new Response('Propriété Non Touvée', {status: 404})

        // si OK, transmettre property
        return new Response(JSON.stringify(property), { status: 200 })
    } catch (e) {
        console.log(e.message)
        return new Response('Something went wrong...', { status: 500 })
    }
}