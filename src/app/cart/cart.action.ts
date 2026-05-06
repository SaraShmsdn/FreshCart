"use server"

import { CartResType } from "@/types/cart.type"
import { getMyToken } from "@/utils/getMyToken"

export async function addProductToCart(id: string): Promise<CartResType> {

    const token = await getMyToken()

    const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
        method: "POST",
        body: JSON.stringify({ productId: id }),
        headers: {
            "Content-Type": "application/json",
            token: token as string
        }
    })

    const finalRes = await res.json()

    console.log("finalRes from  add to cart", finalRes);


    return finalRes
}

export async function getUserCart() : Promise<CartResType> {

    const token = await getMyToken()
    const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
        headers:{
            token: token as string
        }
    } )
    const finalRes = await res.json()
    return finalRes
}

export async function deleteItemFromCart(productId: string): Promise<CartResType> {

    const token = await getMyToken()
    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
        method: "DELETE",
        headers:{
            token: token as string
        }
    } )
    const finalRes = await res.json()
    return finalRes
}

export async function deleteUserCart(): Promise<CartResType> {

    const token = await getMyToken()
    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
        method: "DELETE",
        headers:{
            token: token as string
        }
    } )
    const finalRes = await res.json()
    return finalRes
}

export async function updateProductCart(id : string, count : number): Promise<CartResType> {

    const token = await getMyToken()

    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${id}`, {
        method: "PUT",
        body: JSON.stringify({ count: count }),
        headers: {
            "Content-Type": "application/json",
            token: token as string
        }
    })

    const finalRes = await res.json()

    console.log("finalRes from update cart", finalRes);


    return finalRes
}