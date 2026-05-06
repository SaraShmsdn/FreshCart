"use client"
import React, { useContext, useState } from 'react'
import { FaArrowLeftLong, FaArrowRightLong, FaBoxOpen, FaCheck, FaLock, FaUser } from 'react-icons/fa6'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import localFont from "next/font/local";
import Link from 'next/link';
import img from "../../assets/images/vegetables.png"
import { FaShoppingBag, FaShoppingCart } from 'react-icons/fa';
import { ProductType } from '@/types/Product.types';
import { IoCheckmark } from 'react-icons/io5';
import NumberField from '../_components/NumberField';
import { MdDelete } from 'react-icons/md';
import { cartContext } from '../_context/CartContextProvider';
import { number } from 'zod';
import { CartItemType } from '@/types/cart.type';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { deleteItemFromCart, deleteUserCart, updateProductCart } from './cart.action';

import { Trash2Icon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useSession } from 'next-auth/react';

const exo = localFont({
  src: "../../assets/fonts/Exo.ttf",
});


interface ProductCardPropsType {
  product: ProductType
}
export default function page({ product }: ProductCardPropsType) {
  const [value, setValue] = useState(1)
  const session = useSession()

  const { cartProducts, totalPriceOfCart, numberOfCartItems, setCartProducts, setNumberOfCartItems, setTotalPriceOfCart } = useContext(cartContext)

  async function handleDeleteItem(id: string) {
    const res = await deleteItemFromCart(id)
    setCartProducts(res.data.products)
    setNumberOfCartItems(res.numOfCartItems)
    setTotalPriceOfCart(res.data.totalCartPrice)
  }

  async function handleClearCart() {
    const res = await deleteUserCart()
    setCartProducts(res.data.products)
    setNumberOfCartItems(res.numOfCartItems)
    setTotalPriceOfCart(res.data.totalCartPrice)
  }

  async function handleUpdate(id: string, count: number) {
    const res = await updateProductCart(id, count)
    setCartProducts(res.data.products)
    setNumberOfCartItems(res.numOfCartItems)
    setTotalPriceOfCart(res.data.totalCartPrice)
  }

  return (
    <>
      {(numberOfCartItems === 0 || !session?.data) ?(
        <div className={`flex items-center justify-center py-2 px-4 ${exo.className}`}>
          <div className='max-w-md text-center'>
            <div className='mb-8 relative'>
              <div className='w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mx-auto'>
                <FaBoxOpen className='text-5xl text-gray-300' />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">Looks like you haven't added anything to your cart yet.
              <br />
              Start exploring our products!
            </p>
            <Link href='/' className='inline-flex items-center gap-2 text-white py-3.5 px-8 rounded-xl font-semibold shadow-lg bg-[#16a34a] hover:bg-[#15803d]'>Start Shopping <FaArrowRightLong /></Link>
          </div>
        </div>
      ) :
        (
          <div className={`bg-[#F9FAFB] ${exo.className} min-h-screen`}>
            <div className='container px-16 gap-8 mb-8 mt-8 '>
              <div className='mb-8 gap-4'>
                <Breadcrumb className='mb-4'>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink className='text-black' href="/cart">Shopping Cart</BreadcrumbLink>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <div className='flex'>
                  <div className='gap-2'>
                    <h1 className='text-3xl gap-3 font-bold text-[#101828] flex justify-center items-center mb-2'><FaShoppingCart className='text-white rounded-[12px] p-2 w-[48px] h-[48px] flex justify-center items-center bg-linear-to-r from-[#16A34A] to-[#15803D]' />Shopping Cart</h1>
                    <p className='text-gray-500 text-[16px] font-medium'>You have<span className='font-semibold text-[#14A44A]'> {numberOfCartItems} items</span>  in your cart</p>
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-3 gap-8'>
                <ul className='gap-6 col-span-2'>
                  <div className='space-y-4 gap-4'>
                    {cartProducts?.map((item: CartItemType) =>
                      <li key={item.product.id} className='relative rounded-[16px] px-5 py-2 bg-white border border-[#F3F4F6] shadow mb-4'>
                        <div className='flex gap-6 my-2'>
                          <Link href={`/products`} className='relative'>
                            <div className='w-32 h-32 rounded-[12px] border border-[#F3F4F6] bg-[#F3F4F6] p-3 mb-4'><img src={item.product.imageCover} alt={item.product.title} className="w-full h-full object-cover" /></div>
                            <div className='absolute rounded-full bg-[#00C950] py-0.5 px-2 gap-1 text-white font-semibold text-[10px] right-0 flex justify-center items-center'><FaCheck />In Stock</div>
                          </Link>
                          <div className='flex-1 justify-between'>
                            <div className='mb-3 pb-3'>
                              <div className='gap-2'>
                                <p className='text-[18px] font-semibold text-[#101828] mb-2'>{item.product.title}</p>
                                <div className='flex gap-2 items-center'>
                                  <span className='inline-block rounded-full py-1 px-2.5 bg-linear-to-r from-[#F0FDF4] to-[#F3F4F6] text-[#15803D] font-medium text-[12px] '>{item.product.category.name}</span>
                                  {/* <span className='text-xs text-[12px] text-[#99A1AF] font-medium'>•</span> */}
                                  {/* <span className='text-xs text-[#6A7282] text-[12px] font-medium '>{item.product.id}</span> */}
                                </div>
                              </div>
                            </div>
                            <div className=' pb-4'>
                              <div className='flex gap-2 items-center'>
                                <p className='text-[18px] font-bold text-[#16A34A]'>{item.price} EGP</p>
                                <p className='text-[12px] font-medium text-[#99A1AF]'>per unit</p>
                              </div>
                            </div>
                            <div className='flex justify-between'>
                              <div className="bg-[#F9FAFB] rounded-[12px] px-1 border border-[#E5E7EB] w-30">
                                {/* <div className="scale-70 origin-left">
                                    <NumberField />
                                  </div> */}
                                <div className="flex items-center">
                                  <Button
                                    className="border-none rounded-none cursor-pointer rounded-l-lg w-[30px] h-[30px] text-[28px] text-[#4A5565] hover:text-[#16A34A]"
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleUpdate(item.product.id, item.count - 1)}
                                  >
                                    -
                                  </Button>

                                  <Input
                                    type="number"
                                    value={item.count}
                                    onChange={(e) => setValue(Number(e.target.value))}
                                    className="w-12 text-center border-none text-[#364153]"
                                  />

                                  <Button
                                    className="border-none w-[30px] h-[30px] rounded-none cursor-pointer rounded-r-lg text-[28px] text-white bg-[#16A34A] hover:text-white hover:bg-[#147a39]"
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleUpdate(item.product.id, item.count + 1)}
                                  >
                                    +
                                  </Button>
                                </div>
                              </div>
                              <div className='flex gap-4'>
                                <div className='text-right min-width-[67.58px] gap-2'>
                                  <p className='text-xs font-medium text-[#99A1AF] text-right'>Total</p>
                                  <p className='text-xl'><span className='text-[#101828] font-bold '>{item.price * item.count}</span><span className='text-[#99A1AF] font-medium text-[14px]'>EGP</span></p>
                                </div>

                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="destructive" className='w-10 h-10 rounded-[12px] text-[20px] border cursor-pointer border-[#FFC9C9] bg-[#FEF2F2] flex justify-center items-center'>
                                      <MdDelete className='text-[#FB2C36]' />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent className={`${exo.className}`} size='sm'>
                                    <AlertDialogHeader>
                                      <AlertDialogMedia className="bg-destructive/10 rounded-full! text-destructive dark:bg-destructive/20 dark:text-destructive">
                                        <Trash2Icon />
                                      </AlertDialogMedia>
                                      <AlertDialogTitle className='text-xl font-bold text-gray-900 mb-2 font-'>Remove Item?</AlertDialogTitle>
                                      <AlertDialogDescription className='text-gray-500 text-sm leading-relaxed'>
                                        Remove <span className='font-semibold text-gray-700'>{item.product.title}</span>  from your cart?
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter className='bg-white border-none'>
                                      <AlertDialogCancel className='bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl ' variant="outline">Cancel</AlertDialogCancel>
                                      <AlertDialogAction className='bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl' onClick={() => handleDeleteItem(item.product.id)} variant="destructive">Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </div>
                          </div>

                        </div>
                      </li>)}
                  </div>

                  <div className='mt-6 flex justify-between border-t border-[#E5E7EB] pt-6 '>
                    <Link href='/' className='text-[14px] flex gap-2 items-center text-[#16A34A] cursor-pointer font-medium'><FaArrowLeftLong />Continue Shopping</Link>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className='flex items-center gap-2 cursor-pointer text-[#99A1AF] text-[14px] font-medium hover:text-red-500 bg-transparent'><MdDelete className='text-lg' />Clear all items</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className={`${exo.className}`} size='sm'>
                        <AlertDialogHeader>
                          <AlertDialogMedia className="bg-destructive/10 rounded-full! text-destructive dark:bg-destructive/20 dark:text-destructive">
                            <Trash2Icon />
                          </AlertDialogMedia>
                          <AlertDialogTitle className='text-xl font-bold text-gray-900 mb-2 font-'>Clear Your Cart?</AlertDialogTitle>
                          <AlertDialogDescription className='text-gray-500 text-sm leading-relaxed'>
                            All items will be removed from your cart. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className='bg-white border-none'>
                          <AlertDialogCancel className='bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl ' variant="outline">Keep Shopping</AlertDialogCancel>
                          <AlertDialogAction className='bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl' onClick={handleClearCart} variant="destructive">Yes, Clear All</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </ul>

                <div className='relative'>
                  <div className='bg-white rounded-[16px] border border-[#F3F4F6] shadow sticky top-20'>
                    <div className='bg-linear-to-r from-[#16A34A] to-[#15803D] gap-1 py-4 px-6 rounded-t-[16px]'>
                      <h2 className='text-lg font-bold text-white flex items-center gap-2'><FaShoppingBag />Order Summary</h2>
                      <p className='font-medium text-[14px] text-[#DCFCE7]'>{numberOfCartItems} items in your cart</p>
                    </div>
                    <div className='p-6 gap-5'>
                      <div className='space-y-3 gap-3 mb-5'>
                        <div className='flex justify-between'>
                          <span className='font-medium text-[#4A5565] text-[16px]'>Subtotal</span>
                          <span className='font-medium text-[16px] text-[#101828]'>{totalPriceOfCart} EGP</span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='font-medium text-[#4A5565] text-[16px]'>Shipping</span>
                          {totalPriceOfCart >= 500 ? <span className='font-medium text-[16px] text-[#00A63E]'>Free</span> : <span className='font-medium text-[16px] text-[#00A63E]'>50 EGP</span>}
                          
                        </div>
                        <div className='border-t border-[#E5E7EB] pt-3'>
                          <div className='flex justify-between'>
                            <p className='text-[#101828] font-semibold text-[16px]'>Total</p>
                            <div className='text-right'>
                              {totalPriceOfCart >= 500 ? <span className='font-bold text-[24px] text-[#101828]'>{totalPriceOfCart}</span> : <span className='font-bold text-[24px] text-[#101828]'>{totalPriceOfCart + 50}</span>}
                              <span className='text-sm text-[#6A7282] font-medium text-[14px]'> EGP</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* {session.data ? <div className='flex items-center justify-center flex-col'><Link href='/checkout' className='rounded-[12px] py-3.5 px-6 gap-3 bg-linear-to-r mb-4 from-[#16A34A] to-[#15803D] font-semibold text-[16px] text-white w-full flex items-center justify-center'><FaLock />Secure Checkout</Link>
                      <Link href='/' className='text-[14px] flex gap-2 items-center text-[#16A34A] cursor-pointer font-medium'><FaArrowLeftLong />Continue Shopping</Link></div> :
                        <><Link href='/login' className='rounded-[12px] py-3.5 px-6 gap-3 bg-linear-to-r mb-4 from-[#16A34A] to-[#15803D] font-semibold text-[16px] text-white w-full flex items-center justify-center'><FaUser />Login to Checkout</Link>
                          <p className='text-xs text-center text-gray-400'>Don't have an account?<Link href='/signup' className='text-[#16A34A] hover:underline'> Sign up</Link> </p></>} */}
                          <div className='flex items-center justify-center flex-col'><Link href='/checkout' className='rounded-[12px] py-3.5 px-6 gap-3 bg-linear-to-r mb-4 from-[#16A34A] to-[#15803D] font-semibold text-[16px] text-white w-full flex items-center justify-center'><FaLock />Secure Checkout</Link>
                      <Link href='/' className='text-[14px] flex gap-2 items-center text-[#16A34A] cursor-pointer font-medium'><FaArrowLeftLong />Continue Shopping</Link></div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        )}
    </>
  )
}
