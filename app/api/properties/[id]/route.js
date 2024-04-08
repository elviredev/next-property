import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";

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

// DELETE /api/properties/:id
export const DELETE = async (request, { params }) => {
    try {
        // ID Property obtenu depuis URL
        const propertyId = params.id

        // Obtenir la session
        const sessionUser = await getSessionUser()

        // vérifier si une session ou un user session existe
        if (!sessionUser || !sessionUser.userId) {
            return new Response('ID Utilisateur requis.', { status: 401 })
        }

        // si session existe, obtenir le user ID depuis la session
        const { userId } = sessionUser

        // se connecter à la bdd
        await connectDB()

        // récupérer une seule propriété
        const property = await Property.findById(propertyId)

        // si aucune propriété trouvée
        if (!property) return new Response('Propriété Non Touvée', {status: 404})

        // vérifier la possession (ownership)
        if (property.owner.toString() !== userId) {
            return new Response('Non Autorisé.', { status: 401 })
        }

        // si c'est l'annonce de l'utilisateur en question, on supprime
        await property.deleteOne()

        // si OK, transmettre un message
        return new Response('Propriété supprimée', { status: 200 })
    } catch (e) {
        console.log(e.message)
        return new Response('Something went wrong...', { status: 500 })
    }
}

// PUT /api/properties/:id
export const PUT = async (request, { params }) => {
    try {
        // se connecter à la bdd
        await connectDB()

        // obtenir session utilisateur
        const sessionUser = await getSessionUser()

        // si pas de session ou pas de userId
        if (!sessionUser || !sessionUser.userId) {
            return new Response('Identifiant utilisateur requis.', {status: 401})
        }

        // obtenir ID de la propriété qui est dans URL
        const { id } = params

        // obtenir userID de la session
        const { userId } = sessionUser

        // récupérer les données du form
        const formData = await request.formData()

        // Access all values from amenities
        const amenities = formData.getAll('amenities')

        // Get property to update
        const existingProperty = await Property.findById(id)

        if (!existingProperty) {
            return new Response('Cette propriété n\'existe pas.', { status: 404 })
        }

        // vérify ownership
        if (existingProperty.owner.toString() !== userId) {
            return new Response('Non autorisé à modifier cette propriété', { status: 401 })
        }

        // Create propertyData object for bdd
        const propertyData = {
            type: formData.get('type'),
            name: formData.get('name'),
            description: formData.get('description'),
            location: {
                street: formData.get('location.street'),
                city: formData.get('location.city'),
                state: formData.get('location.state'),
                zipcode: formData.get('location.zipcode'),
            },
            beds: formData.get('beds'),
            baths: formData.get('baths'),
            square_feet: formData.get('square_feet'),
            amenities,
            rates: {
                weekly: formData.get('rates.weekly'),
                monthly: formData.get('rates.monthly'),
                nightly: formData.get('rates.nightly'),
            },
            seller_info: {
                name: formData.get('seller_info.name'),
                email: formData.get('seller_info.email'),
                phone: formData.get('seller_info.phone'),
            },
            owner: userId
        }

        // update property in BDD
        const updatedProperty = await Property.findByIdAndUpdate(id, propertyData)

        return new Response(JSON.stringify(updatedProperty), {status: 200})
    } catch (e) {
        return new Response('Failed to add property', {status: 500})
    }
}