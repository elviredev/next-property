import connectDB from "@/config/database";
import Property from "@/models/Property";
import {getSessionUser} from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";


// GET /api/properties (get properties)
export const GET = async (request) => {
    try {
        // se connecter à la bdd
        await connectDB()

        // pagination
        const page = request.nextUrl.searchParams.get('page') || 1
        const pageSize = request.nextUrl.searchParams.get('pageSize') || 6

        // saut de page pour ignorer les propriétés des pages précédentes
        const skip = (page - 1) * pageSize

        // nb total de propriétés
        const total = await Property.countDocuments({})

        // récupérer les propriétés de la page
        const properties = await Property.find({}).skip(skip).limit(pageSize)

        const result = {
            total,
            properties
        }

        // transmettre properties
        return new Response(JSON.stringify(result), { status: 200 })
    } catch (e) {
        console.log(e.message)
        return new Response('Something went wrong...', { status: 500 })
    }
}

// POST /api/properties (add property)
export const POST = async (request) => {
    try {
        // se connecter à la bdd
        await connectDB()

        // obtenir session utilisateur
        const sessionUser = await getSessionUser()

        // si pas de session ou pas de userId
        if (!sessionUser || !sessionUser.userId) {
            return new Response('Identifiant utilisateur requis.', {status: 401})
        }

        // obtenir userID de la session
        const { userId } = sessionUser

        // récupérer les données du form
        const formData = await request.formData()

        // Access all values from amenities and images
        const amenities = formData.getAll('amenities')
        const images = formData.getAll('images').filter((image) => image !== '')

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

        // Upload image(s) to Cloudinary
        const imageUploadPromises = []

        for (const image of images) {
            const imageBuffer = await image.arrayBuffer()
            const imageArray = Array.from(new Uint8Array(imageBuffer))
            const imageData = Buffer.from(imageArray)

            // Convert the image data to base64
            const imageBase64 = imageData.toString('base64')

            // Make request to upload to Cloudinary
            const result = cloudinary.uploader.upload(
                `data:image/png;base64,${imageBase64}`, {
                    folder: 'nextproperty'
                }
            )

            imageUploadPromises.push((await result).secure_url)

            // Wait for all images to upload
            const uploadedImages = await Promise.all(imageUploadPromises)
            // Add uploaded images to the propertyData object
            propertyData.images = uploadedImages
        }

        // transmettre à la BDD
        const newProperty = new Property(propertyData)
        await newProperty.save()

        // redirect vers http://localhost:3000/properties/{id}
        return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`)

        // return new Response(JSON.stringify({message: 'Success'}), {status: 200})
    } catch (e) {
        return new Response('Failed to add property', {status: 500})
    }
}