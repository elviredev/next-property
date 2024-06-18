import connectDB from "@/config/database";
import Property from "@/models/Property";


// GET /api/properties/featured (get featured properties)
export const GET = async (request) => {
    try {
        // se connecter à la bdd
        await connectDB()

        // récupérer les propriétés en vedette
        const properties = await Property.find({
            is_featured: true
        })

        // transmettre properties
        return new Response(JSON.stringify(properties), { status: 200 })
    } catch (e) {
        console.log(e.message)
        return new Response('Something went wrong...', { status: 500 })
    }
}