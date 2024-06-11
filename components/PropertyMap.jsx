'use client'

import { useState, useEffect } from "react";
import 'mapbox-gl/dist/mapbox-gl.css'
import Map, { Marker } from 'react-map-gl'
import { setDefaults, fromAddress } from "react-geocode";
import Spinner from "./Spinner";
import Image from 'next/image'
import pin from '@/assets/images/pin.svg'

const PropertyMap = ({ property }) => {

    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 12,
        width: '100%',
        height: '500px'
    });
    const [loading, setLoading] = useState(true);
    const [geocodeError, setGeocodeError] = useState(false);

    // Définir nos valeurs par défaut
    setDefaults({
        key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
        language: "fr",
        region: "fr"
    });

    // Transmettre adresse
    useEffect(() => {
        const fetchCoords = async () => {
            try {
                const res = await fromAddress(`${property.location.street} ${property.location.zipcode} ${property.location.city} ${property.location.state}`)

                // Check for results
                if (res.results.length === 0) {
                    // No results found
                    setGeocodeError(true)
                    setLoading(false)
                    return
                }

                const { lat, lng } = res.results[0].geometry.location

                setLat(lat)
                setLng(lng)
                setViewport({
                    ...viewport,
                    latitude: lat,
                    longitude: lng
                })
                setLoading(false)
            } catch (e) {
                console.log(e)
                setGeocodeError(true)
                setLoading(false)
            }
        }

        fetchCoords()
    }, [])

    if (loading) return <Spinner loading={loading} />

    if (geocodeError) {
        return <div className='text-xl'>Aucune donnée de localisation n'a été trouvée.</div>
    }

    return (
        !loading && (
            <Map
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                mapLib={import('mapbox-gl')}
                initialViewState={{
                    longitude: lng,
                    latitude: lat,
                    zoom: 15
                }}
                style={{ width: '100%', height: 500 }}
                mapStyle='mapbox://styles/mapbox/streets-v9'
            >
                <Marker longitude={lng} latitude={lat} anchor='bottom' >
                    <Image src={pin} alt='localisation' width={40} height={40} />
                </Marker>
            </Map>
        )
    )
}
export default PropertyMap
