import connectDB from "@/config/database";
import Property from "@/models/Property";

// GET /api/properties/search (rechercher une propriété)
export const GET = async (request) => {
    try {
        // connect BDD
        await connectDB()

        // obtenir les query params
        const { searchParams } = new URL(request.url)
        const location = searchParams.get('location')
        const propertyType = searchParams.get('propertyType')

        const locationPattern = new RegExp(location, 'i')

        // match location pattern avec champs en bdd
        let query = {
            $or: [
                {name: locationPattern},
                {description: locationPattern},
                {'location.street': locationPattern},
                {'location.city': locationPattern},
                {'location.state': locationPattern},
                {'location.zipcode': locationPattern},
            ]
        }

        // seulement vérifier pour le type de property si ce n'est pas "All"
        if (propertyType && propertyType !== 'All') {
            const typePattern = new RegExp(propertyType, 'i')
            query.type = typePattern
        }

        // récupérer les propriétés correspondantes en bdd
        const properties = await Property.find(query)

        return new Response(JSON.stringify(properties), {status: 200})
    } catch (e) {
        console.log(e)
        return new Response("Quelque chose s'est mal passé.", {status: 500})
    }
}