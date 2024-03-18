// si pas de domaine API, retourner un tableau vide donc pas de propriétés, mais ne générera pas d'erreurs
// si le domaine API n'est pas disponible, on le définit sur null
const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null

// récupérer les propriétés
async function fetchProperties() {
    try {
        // vérifier le cas ou le domaine n'est pas encore disponible
        if (!apiDomain) {
            return []
        }

        const res = await fetch(`${apiDomain}/properties`)
        // si echec
        if (!res.ok) {
            throw new Error('Échec de la récupération des données')
        }
        // si response OK
        return res.json()
    } catch (e) {
        console.log(e)
        return []
    }
}

export { fetchProperties }