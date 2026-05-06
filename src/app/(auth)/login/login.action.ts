"use server"

import { cookies } from "next/headers";
import { LoginDataType } from "./login.schema";

export async function loginAction(values: LoginDataType){
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const finalRes = await res.json()
    console.log("finalRes", finalRes);

    const myCookies = await cookies();
    myCookies.set("token", finalRes.token,
        {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        }
    )

    return res.ok
}