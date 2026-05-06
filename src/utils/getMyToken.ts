import { decode } from 'next-auth/jwt'
import { cookies } from 'next/headers'
import React from 'react'

export async function getMyToken() {

    const myCookies = await cookies()

    const tokenFromCookies = myCookies.get("next-auth.session-token")?.value

    console.log("cookies" , tokenFromCookies)

    const myToken = await decode({ token : tokenFromCookies, secret : process.env.NEXTAUTH_SECRET! })

    console.log("real",myToken)

    return myToken?.realTokenFromBackend

}
