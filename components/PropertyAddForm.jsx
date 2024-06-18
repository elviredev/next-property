'use client'
import {useState} from "react";
// import Select from 'react-select'

const PropertyAddForm = () => {
    const [fields, setFields] = useState({
        type: '',
        name: '',
        description: '',
        location: {
            street: '',
            city: '',
            state: '',
            zipcode: '',
        },
        beds: '',
        baths: '',
        square_feet: '',
        amenities: [],
        rates: {
            weekly: '',
            monthly: '',
            nightly: '',
        },
        seller_info: {
            name: '',
            email: '',
            phone: '',
        },
        images: [],
    });

    // Form input Handlers
    const handleChange = (e) => {
        const { name, value } = e.target

        // Vérifier si propriété imbriquée
        if (name.includes(".")) {
            // diviser name: location.street devient location (outerKey) street (innerKey)
            const [outerKey, innerKey] = name.split(".")

            // MAJ du state
            // Si objets imbriqués (ex: location.street)
            setFields((prevFields) => ({
                ...prevFields,
                [outerKey]: {
                    ...prevFields[outerKey],
                    [innerKey]: value
                }
            }) )
        } else { // Si non imbriqués
            setFields((prevFields) => ({
                ...prevFields,
                [name]: value
            }))
        }
    }
    const handleAmenitiesChange = (e) => {
        const { value, checked } = e.target

        // Clone the current array
        const updatedAmenities = [...fields.amenities]

        // Si coché
        if (checked) {
            // Add value to array
            updatedAmenities.push(value)
        } else {
            // Remove value from array
            const index = updatedAmenities.indexOf(value)

            if (index !== -1) {
                // Supprimer index
                updatedAmenities.splice(index, 1)
            }
        }

        // Update state with updated array
        setFields((prevFields) => ({
            ...prevFields,
            amenities: updatedAmenities
        }))
    }
    const handleImageChange = (e) => {
        const { files } = e.target

        // Clone images array
        const updatedImages = [...fields.images]

        // Add new files to the array
        for (const file of files) {
            updatedImages.push(file)
        }

        // updated state with array of images
        setFields((prevFields) =>({
            ...prevFields,
            images: updatedImages
        }))
    }


    return (
        <form action="/api/properties" method="POST" encType="multipart/form-data">
            <h2 className="text-3xl text-center font-semibold mb-6">
                Ajouter votre propriété
            </h2>

            <div className="mb-4">
                <label htmlFor="type" className="block text-gray-700 font-bold mb-2">Type de propriété</label>
                <select
                    id="type"
                    name="type"
                    className="border rounded w-full py-2 px-3 text-sm sm:text-base"
                    required
                    value={fields.type}
                    onChange={handleChange}
                >
                    <option value="Appartement">Appartement</option>
                    <option value="Copropriété">Copropriété</option>
                    <option value="Maison">Maison</option>
                    <option value="Cabane ou Chalet">Cabane ou Chalet</option>
                    <option value="Loft">Loft</option>
                    <option value="Chambre">Chambre</option>
                    <option value="Studio">Studio</option>
                    <option value="Autre">Autre</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Nom de l'annonce</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="border rounded w-full py-2 px-3 mb-2 outline-indigo-400 text-sm sm:text-base"
                    placeholder="eg. Bel appartement à Miami"
                    required
                    value={fields.name}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
                <textarea
                    id="description"
                    name="description"
                    className="border rounded w-full py-2 px-3 outline-indigo-400 text-sm sm:text-base"
                    rows="4"
                    placeholder="Ajouter une description pour votre propriété (facultatif)"
                    value={fields.description}
                    onChange={handleChange}
                ></textarea>
            </div>

            {/* Adresse */}
            <div className="mb-4 bg-indigo-50 p-4">
                <label className="block text-gray-700 font-bold mb-2">Adresse</label>
                <input
                    type="text"
                    id="street"
                    name="location.street"
                    className="border rounded w-full py-2 px-3 mb-2 outline-indigo-400 text-sm sm:text-base"
                    placeholder="Rue"
                    value={fields.location.street}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    id="city"
                    name="location.city"
                    className="border rounded w-full py-2 px-3 mb-2 outline-indigo-400 text-sm sm:text-base"
                    placeholder="Ville"
                    required
                    value={fields.location.city}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    id="state"
                    name="location.state"
                    className="border rounded w-full py-2 px-3 mb-2 outline-indigo-400 text-sm sm:text-base"
                    placeholder="Région"
                    required
                    value={fields.location.state}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    id="zipcode"
                    name="location.zipcode"
                    className="border rounded w-full py-2 px-3 mb-2 outline-indigo-400 text-sm sm:text-base"
                    placeholder="Code Postal"
                    value={fields.location.zipcode}
                    onChange={handleChange}
                />
            </div>

            {/* Lits, SdB, m² */}
            <div className="mb-4 flex flex-wrap space-y-2 sm:space-y-0 ">
                <div className="w-full sm:w-1/3 sm:pr-2">
                    <label htmlFor="beds" className="block text-gray-700 font-bold mb-2">Lits</label>
                    <input
                        type="number"
                        id="beds"
                        name="beds"
                        className="border rounded w-full py-2 px-3 outline-indigo-400"
                        required
                        value={fields.beds}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full sm:w-1/3 ">
                    <label htmlFor="baths" className="block text-gray-700 font-bold mb-2">SdB</label>
                    <input
                        type="number"
                        id="baths"
                        name="baths"
                        className="border rounded w-full py-2 px-3 outline-indigo-400"
                        required
                        value={fields.baths}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full sm:w-1/3 sm:pl-2">
                    <label htmlFor="square_feet" className="block text-gray-700 font-bold mb-2">M²</label>
                    <input
                        type="number"
                        id="square_feet"
                        name="square_feet"
                        className="border rounded w-full py-2 px-3 outline-indigo-400"
                        required
                        value={fields.square_feet}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Equipements */}
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Agréments</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <div className="inline-flex items-center text-nowrap text-xs sm:text-base">
                        <input
                            type="checkbox"
                            id="amenity_wifi"
                            name="amenities"
                            value="Wifi"
                            className="mr-2 accent-indigo-500"
                            checked={fields.amenities.includes('Wifi')}
                            onChange={handleAmenitiesChange}
                        />
                        <label htmlFor="amenity_wifi">Wifi</label>
                    </div>
                    <div className="inline-flex items-center text-nowrap text-xs sm:text-base">
                        <input
                            type="checkbox"
                            id="amenity_kitchen"
                            name="amenities"
                            value="Cuisine équipée"
                            className="mr-2 accent-indigo-500"
                            checked={fields.amenities.includes('Cuisine équipée')}
                            onChange={handleAmenitiesChange}
                        />
                        <label htmlFor="amenity_kitchen">Cuisine équipée</label>
                    </div>
                    <div className="inline-flex items-center text-nowrap text-xs sm:text-base">
                        <input
                            type="checkbox"
                            id="amenity_washer_dryer"
                            name="amenities"
                            value="Lave Linge"
                            className="mr-2 accent-indigo-500"
                            checked={fields.amenities.includes('Lave Linge')}
                            onChange={handleAmenitiesChange}
                        />
                        <label htmlFor="amenity_washer_dryer">Lave Linge</label>
                    </div>
                    <div className="inline-flex items-center text-nowrap text-xs sm:text-base">
                        <input
                            type="checkbox"
                            id="amenity_free_parking"
                            name="amenities"
                            value="Parking gratuit"
                            className="mr-2 accent-indigo-500"
                            checked={fields.amenities.includes('Parking gratuit')}
                            onChange={handleAmenitiesChange}
                        />
                        <label htmlFor="amenity_free_parking">Parking gratuit</label>
                    </div>
                    <div className="inline-flex items-center text-nowrap text-xs sm:text-base">
                        <input
                            type="checkbox"
                            id="amenity_pool"
                            name="amenities"
                            value="Piscine"
                            className="mr-2 accent-indigo-500"
                            checked={fields.amenities.includes('Piscine')}
                            onChange={handleAmenitiesChange}
                        />
                        <label htmlFor="amenity_pool">Piscine</label>
                    </div>
                    <div className="inline-flex items-center text-nowrap text-xs sm:text-base">
                        <input
                            type="checkbox"
                            id="amenity_hot_tub"
                            name="amenities"
                            value="Jacuzzi"
                            className="mr-2 accent-indigo-500"
                            checked={fields.amenities.includes('Jacuzzi')}
                            onChange={handleAmenitiesChange}
                        />
                        <label htmlFor="amenity_hot_tub">Jacuzzi</label>
                    </div>
                    <div className="inline-flex items-center text-nowrap text-xs sm:text-base">
                        <input
                            type="checkbox"
                            id="amenity_24_7_security"
                            name="amenities"
                            value="Sécurité 24/7"
                            className="mr-2 accent-indigo-500"
                            checked={fields.amenities.includes('Sécurité 24/7')}
                            onChange={handleAmenitiesChange}
                        />
                        <label htmlFor="amenity_24_7_security">Sécurité 24/7</label>
                    </div>
                    <div className="inline-flex items-center text-nowrap text-xs sm:text-base">
                        <input
                            type="checkbox"
                            id="amenity_wheelchair_accessible"
                            name="amenities"
                            value="Accessible Fauteuil"
                            className="mr-2 accent-indigo-500"
                            checked={fields.amenities.includes('Accessible Fauteuil')}
                            onChange={handleAmenitiesChange}
                        />
                        <label htmlFor="amenity_wheelchair_accessible">Accessible
                            Fauteuil</label>
                    </div>
                    <div className="inline-flex items-center text-nowrap text-xs sm:text-base">
                        <input
                            type="checkbox"
                            id="amenity_dishwasher"
                            name="amenities"
                            value="Lave-vaisselle"
                            className="mr-2 accent-indigo-500"
                            checked={fields.amenities.includes('Lave-vaisselle')}
                            onChange={handleAmenitiesChange}
                        />
                        <label htmlFor="amenity_dishwasher">Lave-vaisselle</label>
                    </div>
                    <div className="inline-flex items-center text-nowrap text-xs sm:text-base">
                        <input
                            type="checkbox"
                            id="amenity_elevator_access"
                            name="amenities"
                            value="Ascenseur"
                            className="mr-2 accent-indigo-500"
                            checked={fields.amenities.includes('Ascenseur')}
                            onChange={handleAmenitiesChange}
                        />
                        <label htmlFor="amenity_elevator_access">Ascenseur</label>
                    </div>
                    <div className="inline-flex items-center text-nowrap text-xs sm:text-base">
                        <input
                            type="checkbox"
                            id="amenity_gym_fitness_center"
                            name="amenities"
                            value="Gym/Fitness"
                            className="mr-2 accent-indigo-500"
                            checked={fields.amenities.includes('Gym/Fitness')}
                            onChange={handleAmenitiesChange}
                        />
                        <label htmlFor="amenity_gym_fitness_center">Gym/Fitness</label>
                    </div>
                    <div className="inline-flex items-center text-nowrap text-xs sm:text-base">
                        <input
                            type="checkbox"
                            id="amenity_air_conditioning"
                            name="amenities"
                            value="Air conditionné"
                            className="mr-2 accent-indigo-500"
                            checked={fields.amenities.includes('Air conditionné')}
                            onChange={handleAmenitiesChange}
                        />
                        <label htmlFor="amenity_air_conditioning">Air conditionné</label>
                    </div>
                    <div className="inline-flex items-center text-nowrap text-xs sm:text-base">
                        <input
                            type="checkbox"
                            id="amenity_balcony_patio"
                            name="amenities"
                            value="Balcon/Patio"
                            className="mr-2 accent-indigo-500"
                            checked={fields.amenities.includes('Balcon/Patio')}
                            onChange={handleAmenitiesChange}
                        />
                        <label htmlFor="amenity_balcony_patio">Balcon/Patio</label>
                    </div>
                    <div className="inline-flex items-center text-nowrap text-xs sm:text-base">
                        <input
                            type="checkbox"
                            id="amenity_smart_tv"
                            name="amenities"
                            value="Smart TV"
                            className="mr-2 accent-indigo-500"
                            checked={fields.amenities.includes('Smart TV')}
                            onChange={handleAmenitiesChange}
                        />
                        <label htmlFor="amenity_smart_tv">Smart TV</label>
                    </div>
                    <div className="inline-flex items-center text-nowrap text-xs sm:text-base">
                        <input
                            type="checkbox"
                            id="amenity_coffee_maker"
                            name="amenities"
                            value="Machine à café"
                            className="mr-2 accent-indigo-500"
                            checked={fields.amenities.includes('Machine à café')}
                            onChange={handleAmenitiesChange}
                        />
                        <label htmlFor="amenity_coffee_maker">Machine à café</label>
                    </div>
                    <div className="inline-flex items-center text-nowrap text-xs sm:text-base">
                        <input
                            type="checkbox"
                            id="amenity_coffee_maker"
                            name="amenities"
                            value="Cheminée"
                            className="mr-2 accent-indigo-500"
                            checked={fields.amenities.includes('Cheminée')}
                            onChange={handleAmenitiesChange}
                        />
                        <label htmlFor="amenity_coffee_maker">Cheminée</label>
                    </div>
                    <div className="inline-flex items-center text-nowrap text-xs sm:text-base">
                        <input
                            type="checkbox"
                            id="amenity_coffee_maker"
                            name="bbq"
                            value="BBQ/Grill"
                            className="mr-2 accent-indigo-500"
                            checked={fields.amenities.includes('BBQ/Grill')}
                            onChange={handleAmenitiesChange}
                        />
                        <label htmlFor="amenity_coffee_maker">BBQ/Grill</label>
                    </div>
                    <div className="inline-flex items-center text-nowrap text-xs sm:text-base">
                        <input
                            type="checkbox"
                            id="amenity_coffee_maker"
                            name="amenities"
                            value="Animaux acceptés"
                            className="mr-2 accent-indigo-500"
                            checked={fields.amenities.includes('Animaux acceptés')}
                            onChange={handleAmenitiesChange}
                        />
                        <label htmlFor="amenity_coffee_maker">Animaux acceptés</label>
                    </div>
                </div>
            </div>

            {/* Tarifs */}
            <div className="mb-4 bg-indigo-50 p-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Tarifs en € <span className="text-xs sm:text-base">(Laissez un vide si non applicable)</span>
                </label>
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                    <div className="flex items-center">
                        <label htmlFor="weekly_rate" className="mr-2">Semaine</label>
                        <input
                            type="number"
                            id="weekly_rate"
                            name="rates.weekly"
                            className="border rounded w-full py-2 px-3 outline-indigo-400"
                            value={fields.rates.weekly}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="monthly_rate" className="mr-2">Mois</label>
                        <input
                            type="number"
                            id="monthly_rate"
                            name="rates.monthly"
                            className="border rounded w-full py-2 px-3 outline-indigo-400"
                            value={fields.rates.monthly}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="nightly_rate" className="mr-2">Nuit</label>
                        <input
                            type="number"
                            id="nightly_rate"
                            name="rates.nightly"
                            className="border rounded w-full py-2 px-3 outline-indigo-400"
                            value={fields.rates.nightly}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            {/* Infos Vendeur */}
            <div className="mb-4">
                <label htmlFor="seller_name" className="block text-gray-700 font-bold mb-2">Nom du propriétaire</label>
                <input
                    type="text"
                    id="seller_name"
                    name="seller_info.name"
                    className="border rounded w-full outline-indigo-400 py-2 px-3 text-sm sm:text-base"
                    placeholder="Nom"
                    value={fields.seller_info.name}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="seller_email" className="block text-gray-700 font-bold mb-2">Email du propriétaire</label>
                <input
                    type="email"
                    id="seller_email"
                    name="seller_info.email"
                    className="border rounded w-full outline-indigo-400 py-2 px-3 text-sm sm:text-base"
                    placeholder="Email"
                    required
                    value={fields.seller_info.email}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="seller_phone" className="block text-gray-700 font-bold mb-2">Téléphone du propriétaire</label>
                <input
                    type="tel"
                    id="seller_phone"
                    name="seller_info.phone"
                    className="border rounded w-full outline-indigo-400 py-2 px-3 text-sm sm:text-base"
                    placeholder="Téléphone"
                    value={fields.seller_info.phone}
                    onChange={handleChange}
                />
            </div>

            {/* Image */}
            <div className="mb-4">
                <label htmlFor="images" className="block text-gray-700 font-bold mb-2">
                    Images <span className="text-xs sm:text-base">(Sélectionnez jusqu'à 4 images)</span>
                </label>
                <input
                    type="file"
                    id="images"
                    name="images"
                    className="block w-full text-sm text-slate-500
                               file:mr-4 file:py-2 file:px-4
                               file:rounded-full file:border-0
                               file:text-sm file:font-semibold
                               file:bg-indigo-300 file:text-white
                               hover:file:bg-indigo-500"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    required
                />
            </div>

            <div>
                <button
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Ajouter Propriété
                </button>
            </div>
        </form>
    )
}
export default PropertyAddForm
