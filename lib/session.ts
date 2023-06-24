import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import jsonwebtoken from 'jsonwebtoken'
import { JWT } from "next-auth/jwt";
import { SessionInterface, UserProfile } from "@/common.types";
import { createUser, getUser } from "./actions";


// ------------ CONFIGURACIÓN IMPORTANTE ------------
/**
 * - Configurar el provider
 * - Configurar el iss del jwt
 * - Configurar el logo del theme
 */

export const authOptions: NextAuthOptions = {
    providers: [
      // PROVIDERS
    ],
    jwt: {
      encode: ({ secret, token }) => {
        const encodedToken = jsonwebtoken.sign(
          {
            ...token,
            iss: "EMISOR_DEL_TOKEN",
            exp: Math.floor(Date.now() / 1000) + 60 * 60, // 13 horas
          },
          secret
        );
        
        return encodedToken;
      },
      decode: async ({ secret, token }) => {
        const decodedToken = jsonwebtoken.verify(token!, secret) as JWT;
        return decodedToken;
      },
    },
    theme: {
      colorScheme: "light",
      logo: "FILE_PATH",
    },
    callbacks: {
        async session({ session }) {
            try {
                // Revisar si el ususario existe por el email u otro campo 
                // const email = session.user?.email as string;
                // const data = await getUser( email ) as { user?: UserProfile };

                // Generar una nueva session con los datos del usuario
                // const newSession = {
                //     ...session,
                //     user: {
                //         ...session?.user,
                //         ...data?.user,
                //     }
                // }

                // return newSession;
                return session;
            } catch (error) {
                console.log('Error retreaving data', error );
                return session;
            }
        },
        async signIn({ user }: {
            user: AdapterUser | User
        }) {
            try {
                // exist user user
                // const userExists = await getUser( user?.email as string ) as { user?: UserProfile };

                // if( !userExists.user ) {
                //     await createUser({
                //         name: user?.name || '',
                //         email: user?.email || '',
                //         avatarUrl: user?.image || '',
                //     });
                // }

                return true;
            } catch (error: any) {
                console.log("Error checking if user exists: ", error.message);
                return false;
            }
        },
    }
}


export async function getCurrentUser() {
    const session = await getServerSession( authOptions ) as SessionInterface;

    return session;
}