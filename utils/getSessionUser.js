import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

export const getSessionUser = async () => {
    try {
        // récupérer session utilisateur
        const session = await getServerSession(authOptions)

        // si pas de session ou pas d'objet user dans session
        if (!session || !session.user) {
            return null
        }

        // si user existe on renvoie l'objet user et userId
        return {
            user: session.user,
            userId: session.user.id
        }
    } catch (e) {
        console.error(e)
        return null
    }
}