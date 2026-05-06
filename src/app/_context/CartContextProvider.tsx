"use client"

import React, {createContext, ReactNode, useEffect, useState} from 'react'
import { getUserCart } from '../cart/cart.action'
import { CartItemType } from '@/types/cart.type'

//export const cartContext = createContext({})

export const cartContext = createContext<CartContextType | null>(null)

type CartContextType = {
  numberOfCartItems: number
  setNumberOfCartItems: React.Dispatch<React.SetStateAction<number>>

  cartProducts: CartItemType[] | undefined
  setCartProducts: React.Dispatch<React.SetStateAction<CartItemType[] | undefined>>

  totalPriceOfCart: number
  setTotalPriceOfCart: React.Dispatch<React.SetStateAction<number>>

  isLoading: boolean

  cartId: string
  setCartId: React.Dispatch<React.SetStateAction<string>>
}

export default function CartContextProvider({children} : {children: ReactNode}) {

  const [isLoading, setIsLoading] = useState(true)
  
  async function getDataFromAPI(){

    try {
    const userCart = await getUserCart()

    setNumberOfCartItems(userCart?.numOfCartItems || 0)
    setCartProducts(userCart?.data?.products || [])
    setTotalPriceOfCart(userCart?.data?.totalCartPrice || 0)
    setCartId(userCart?.cartId || "")
  } catch (error) {
    console.log(error)
  } finally {
    setIsLoading(false)
  }

  }

  useEffect(() => {
    getDataFromAPI()
  }, [])

  const [cartId, setCartId] = useState("")
  const [numberOfCartItems, setNumberOfCartItems] = useState(0)
  const [totalPriceOfCart, setTotalPriceOfCart] = useState(0)
  const [cartProducts, setCartProducts] = useState<CartItemType[]>()

  return (
    <cartContext.Provider value={{isLoading, numberOfCartItems, setNumberOfCartItems, totalPriceOfCart, setTotalPriceOfCart, cartProducts, setCartProducts, cartId, setCartId}}>{children}</cartContext.Provider>
  )
}
