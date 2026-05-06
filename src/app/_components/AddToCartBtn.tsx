"use client"
import React, { useContext, useState } from 'react'
import { MdAdd } from 'react-icons/md'
import { addProductToCart } from '../cart/cart.action'
import { toast } from 'sonner'
import { FaCheck } from 'react-icons/fa6'
import { cartContext } from '../_context/CartContextProvider'
import { useSession } from 'next-auth/react'

export default function AddToCartBtn({ productId }: { productId: string }) {
  const session = useSession()
  const [clicked, setClicked] = useState(false)
 // const { setNumberOfCartItems, setCartProducts, setTotalPriceOfCart } = useContext(cartContext)
 const cart = useContext(cartContext)

if (!cart) return null

const {
  setNumberOfCartItems,
  setCartProducts,
  setTotalPriceOfCart,
} = cart

  async function handleAddToCart() {
    const res = await addProductToCart(productId)
    if (session.data) {
      if (res?.status == "success") {
        setClicked(true)
        setTimeout(() => {
          setClicked(false);
        }, 2000);
        console.log(res)
        setNumberOfCartItems(res.numOfCartItems)
        setCartProducts(res.data.products)
        setTotalPriceOfCart(res.data.totalCartPrice)
        // toast.success("Product added successfully to your cart", {
        //   position: "top-right",
        //   richColors: true,
        // });
      }
    }
    else {

      toast.error("You need to be signed in to add products to your cart", {
        position: "top-right",
        richColors: true,
      });


    }
  }

  return (
    <>
      <button onClick={handleAddToCart} className='rounded-full w-10 h-10 bg-[#16A34A] text-white flex  justify-center items-center hover:bg-[#03692b]'>
        {clicked ? <FaCheck className='text-[24px]' /> : <MdAdd className='text-[24px]' />}
      </button>
    </>
  )
}
