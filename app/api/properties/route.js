import connectDB from "@/config/database";
import Property from "@/models/Property";

// GET /api/properties
export const GET = async (request) => {
    try {
        // se connecter à la bdd
        await connectDB()

        // récupérer toutes les propriétés
        const properties = await Property.find({})

        // transmettre properties
        return new Response(JSON.stringify(properties), { status: 200 })
    } catch (e) {
        console.log(e.message)
        return new Response('Something went wrong...', { status: 500 })
    }
}