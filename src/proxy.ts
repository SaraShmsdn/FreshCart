import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import React from 'react'

export default async function proxy(req : NextRequest) {

    const jwt = await getToken({req})

  return NextResponse.next()
}

// export const config = {
//     //secure paths
//     matcher : [
//     ]
// }