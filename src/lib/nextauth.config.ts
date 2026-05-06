import { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { redirect } from "next/dist/server/api-utils";

export const nextAuthConfig: NextAuthOptions = {

    providers: [
        Credentials({
            name: "fresh cart",

            credentials: {
                email: {},
                password: {}
            },

            async authorize(credentials) { //it runs when we click on login button

                const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                const finalRes = await res.json()
                console.log("finalRes", finalRes);

                if (finalRes.message == "success") {
                    return {
                        name: finalRes.user.name,
                        email: finalRes.user.email,
                        realTokenFromBackend: finalRes.token
                    }
                }
                return null

            },
        
        })
    ],

    callbacks: {
        //runs after login (authorize function) or refresh or navigation (it return the data on server side)
        jwt(params) {
            if (params.user) {
                params.token.realTokenFromBackend = params.user.realTokenFromBackend //save the user token in token bc it will not be availabe later
            }

            console.log("params.token", params.token)
            return params.token
        },

        //runs on /api/auth/session or useSession or getServerSession (it return the data on clinet side)
        session(params) {
            return params.session
        }
    },

    session: {
        maxAge: 60 * 60 * 24 * 7, // 7 days and the session endss
    },

    pages: {
        signIn: "/login",
    },

    //secret: process.env.BETTER_AUTH_SECRET //or name in .env the key by NEXTAUTH_SECRET and delete this line 

}