import GoogleProvider from 'next-auth/providers/google'
import connectDB from "@/config/database";
import User from '@/models/User'

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    callbacks: {
        // Invoqué lors d'une connexion réussie
        async signIn({ profile }) {
            // 1. Connect to database
            await connectDB();
            // 2. Check if user exists in database
            const userExists = await User.findOne({ email: profile.email });
            // 3. If not, then add user to database
            if (!userExists) {
                // Truncate user name if too long
                const username = profile.name.slice(0, 20);
                // Save user in bdd
                await User.create({
                    email: profile.email,
                    username,
                    image: profile.picture,
                });
            }
            // 4. Return true pour autoriser la connexion
            return true;
        },
        // Modifies the session object
        async session({ session }) {
            // 1. 1. Récupéer user qui se connecte depuis la BDD
            const user = await User.findOne({ email: session.user.email });
            // 2. Attribuer l'ID user à la session
            session.user.id = user._id.toString();
            // 3. return session
            return session;
        },
    },

}