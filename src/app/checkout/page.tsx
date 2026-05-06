"use client"
import React, { useContext, useEffect, useState } from 'react'
import localFont from "next/font/local";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { GoChecklist } from "react-icons/go";
import { FaArrowLeftLong, FaBox, FaBoxArchive, FaCheck, FaCircleInfo, FaCity, FaCreditCard, FaLocationDot, FaTruck, FaWallet } from 'react-icons/fa6';
import Link from 'next/link';
import { FaShieldAlt, FaShoppingBag } from 'react-icons/fa';
import { IoCallSharp, IoShieldHalf } from 'react-icons/io5';
import { IoMdHome } from "react-icons/io";
import { Controller, useForm } from 'react-hook-form';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { RiCashFill } from "react-icons/ri";
import { shippingAddressType } from '@/types/order.type';
import { cartContext } from '../_context/CartContextProvider';
import { createCashOrder, createVisaOrder } from './orders.actions';
import { toast } from 'sonner';
import { getUserCart } from '../cart/cart.action';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema } from './checkout.schema';
import { CartItemType } from '@/types/cart.type';

const exo = localFont({
  src: "../../assets/fonts/Exo.ttf",
});

export default function page() {

  const [selected, setSelected] = useState("cash")

  const form = useForm({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
      postalCode: "",
      type: "cash"
    },
    resolver: zodResolver(checkoutSchema)
  })

  const { cartId, setCartProducts, setNumberOfCartItems, isLoading, numberOfCartItems, totalPriceOfCart, cartProducts } = useContext(cartContext)

  async function handlePayment(value: any) {
    console.log(value);

    const userData: shippingAddressType = {
      shippingAddress: {
        details: value.details,
        phone: value.phone,
        city: value.city,
        postalCode: ""
      }
    }

    if (value.type === "cash") {
      const res = await createCashOrder(cartId, userData)
      console.log("Res from create cash order", res);
      if (res.status === "success") {
        form.reset()
        toast.success("Order created successfully", {
          position: "top-right",
          richColors: true,
        });
        setCartProducts([])
        setNumberOfCartItems(0)
      }
    }

    else if (value.type === "online") {
      const res = await createVisaOrder(cartId, userData)
      console.log("Res from create visa order", res);
      window.open(res.session.url)
    }


  }

  return (
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
                <BreadcrumbLink href="/cart">Shopping Cart</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink className='text-black' href="/checkout">Checkout</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className='flex justify-between'>
            <div className='gap-2'>
              <h1 className='text-3xl gap-3 font-bold text-[#101828] flex justify-center items-center mb-2'><GoChecklist className='text-white rounded-[12px] p-2 w-[48px] h-[48px] flex justify-center items-center bg-linear-to-r from-[#16A34A] to-[#15803D]' />Complete Your Order</h1>
              <p className='text-gray-500 text-[16px] font-medium'>Review your items and complete your purchase</p>
            </div>
            <div>
              <Link href='/cart' className='text-[14px] flex gap-2 items-center text-[#16A34A] cursor-pointer font-medium'><FaArrowLeftLong />Back To Cart</Link>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-3 gap-8'>
          <div className='gap-6 col-span-2'>
            <div className='space-y-6 gap-6'>
              <div className='bg-white rounded-[16px] border border-[#F3F4F6] shadow'>

                <div className='gap-1 py-4 px-6 rounded-t-[16px] bg-linear-to-r from-[#16A34A] to-[#15803D]'>
                  <h2 className='text-lg font-bold text-white flex items-center gap-2'><IoMdHome className='text-2xl' />Shipping Address</h2>
                  <p className='text-[#DCFCE7] font-medium text-[14px]'>Where should we deliver your order?</p>
                </div>

                <div className='p-6 gap-5'>
                  {/* <div className='pb-5 border-b border-[#F3F4F6] gap-3'>
                    <div className='flex gap-2'>
                      <span className='font-semibold text-[16px] text-[#1E2939]'>Saved Addresses</span>
                    </div>
                  </div> */}
                  <div className='flex rounded-[12px] p-4 gap-3 border border-blue-100 bg-blue-50 mb-5'>
                    <div className='w-8 h-8 bg-blue-100 flex items-center justify-center rounded-full'>
                      <FaCircleInfo className='text-blue-600' />
                    </div>
                    <div className='gap-0.5'>
                      <p className='text-sm text-[#193CB8] font-medium'>Delivery Information</p>
                      <p className='text-xs text-[#155DFC] font-medium'>Please ensure your address is accurate for smooth delivery</p>
                    </div>
                  </div>

                  <form id="checkout-form" onSubmit={form.handleSubmit(handlePayment)} action="">
                    <Controller
                      name="city"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className='mb-5'>
                          <FieldLabel htmlFor={field.name}>
                            City <span className='text-red-500'>*</span>
                          </FieldLabel>
                          <div className='relative'>
                            <Input
                              {...field}
                              id={field.name}
                              aria-invalid={fieldState.invalid}
                              placeholder="e.g. Cairo, Alexandria, Giza"
                              className=' border-2 border-[#E5E7EB] rounded-[12px] py-3.5 px-4 pl-14 w-full font-medium text-[#36415380] focus:outline-none focus:ring-[#dcfce7] focus:ring-2 focus:border-[#22c55e]'
                            />
                            <div className='rounded-[8px] bg-[#F3F4F6] w-8 h-8 absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-[#6A7282]'><FaCity /></div>
                          </div>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )} />

                    <Controller
                      name="details"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className='mb-5'>
                          <FieldLabel htmlFor={field.name}>
                            Street Address <span className='text-red-500'>*</span>
                          </FieldLabel>
                          <div className='relative'>
                            <textarea
                              {...field}
                              rows={3}
                              id={field.name}
                              aria-invalid={fieldState.invalid}
                              placeholder="Street name, building number, floor, apartment..."
                              className='resize-none border-2 border-[#E5E7EB] rounded-[12px] py-3.5 px-4 pl-14 w-full font-medium text-[#36415380] focus:outline-none focus:ring-[#dcfce7] focus:ring-2 focus:border-[#22c55e]'
                            />
                            <div className='rounded-[8px] bg-[#F3F4F6] w-8 h-8 absolute left-4 top-4  flex items-center justify-center text-[#6A7282]'><FaLocationDot /></div>
                          </div>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )} />

                    <Controller
                      name="phone"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="mb-5">
                          <FieldLabel htmlFor={field.name}>
                            Phone Number <span className='text-red-500'>*</span>
                          </FieldLabel>
                          <div className='relative'>
                            <Input
                              {...field}
                              id={field.name}
                              aria-invalid={fieldState.invalid}
                              placeholder="01xxxxxxxxx"
                              type="tel"
                              className=' border-2 border-[#E5E7EB] rounded-[12px] py-3.5 px-4 pl-14 w-full font-medium text-[#36415380] focus:outline-none focus:ring-[#dcfce7] focus:ring-2 focus:border-[#22c55e]'
                            />
                            <span className='absolute text-[12px] font-medium text-[#99A1AF] right-4 top-1/2 -translate-y-1/2 '>Egyptian numbers only</span>
                            <div className='rounded-[8px] bg-[#F3F4F6] w-8 h-8 absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-[#6A7282]'><IoCallSharp /></div>
                          </div>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )} />
                  </form>
                </div>
              </div>

              <div className='bg-white rounded-[16px] border border-[#F3F4F6] shadow'>
                <div className='gap-1 py-4 px-6 rounded-t-[16px] bg-linear-to-r from-[#16A34A] to-[#15803D]'>
                  <h2 className='text-lg font-bold text-white flex items-center gap-2'><FaWallet className='text-lg' />Payment Method</h2>
                  <p className='text-[#DCFCE7] font-medium text-[14px]'>Choose how you'd like to pay</p>
                </div>

                <div className='p-6 gap-4'>
                  <button onClick={() => {setSelected("cash"); form.setValue("type", "cash")}} className={`${selected === "cash" ? "border-[#22c55e] bg-linear-to-r from-[#f0fdf4] to-[#ecfdf5]" : "border-[#E5E7EB]"} group w-full rounded-[12px] border-2 p-5 gap-4 flex items-center mb-4 hover:bg-gray-50 hover:border-[#bbf7d0]`}>
                    <div className=' w-14 h-14 rounded-[12px] bg-[#F3F4F6] flex items-center justify-center group-hover:bg-gray-200'><RiCashFill className='text-[#99A1AF]' /></div>
                    <div className='flex-1 gap-0.5 text-left'>
                      <h3 className='font-bold text-[16px] text-[#101828] '>Cash on Delivery </h3>
                      <p className='text-sm font-medium text-[#6A7282]'>Pay when your order arrives at your doorstep</p>
                    </div>
                    <div className={`${selected === "cash" ? "bg-[#16a34a]" : ""} w-7 h-7 rounded-full border-2 border-[#E5E7EB] flex justify-center items-center`}><FaCheck className='text-white' /></div>
                  </button>

                  <button onClick={() => {setSelected("online"); form.setValue("type", "online")}} className={`${selected === "online" ? "border-[#22c55e] bg-linear-to-r from-[#f0fdf4] to-[#ecfdf5]" : "border-[#E5E7EB]"} group w-full rounded-[12px] border-2 p-5 gap-4 flex items-center mb-4 hover:bg-gray-50 hover:border-[#bbf7d0]`}>
                    <div className={`${selected === "online" ? "bg-linear-to-br from-[#22c55e] to-[#155dfc]" : "bg-[#F3F4F6]"} w-14 h-14 rounded-[12px] flex items-center justify-center group-hover:bg-gray-200`}><FaCreditCard className={`${selected === "online" ? "text-white" : "text-[#99A1AF]"}`} /></div>
                    <div className='flex-1 gap-0.5 text-left'>
                      <h3 className='font-bold text-[16px] text-[#101828] '>Pay Online</h3>
                      <p className='text-sm font-medium text-[#6A7282]'>Secure payment with Credit/Debit Card via Stripe</p>
                      <div className='flex pt-1.5 gap-2'>
                        <img alt="Visa" className="h-5" src="https://img.icons8.com/color/48/visa.png"></img>
                        <img alt="Mastercard" className="h-5" src="https://img.icons8.com/color/48/mastercard.png"></img>
                        <img alt="Amex" className="h-5" src="https://img.icons8.com/color/48/amex.png"></img>
                      </div>
                    </div>
                    <div className={`${selected === "online" ? "bg-[#16a34a]" : ""} w-7 h-7 rounded-full border-2 border-[#E5E7EB] flex justify-center items-center`}><FaCheck className='text-white' /></div>
                  </button>

                  <div className='flex items-center rounded-[12px] border border-[#DCFCE7] p-4 gap-3 bg-linear-to-r from-[#F0FDF4] to-[#F3F4F6]'>
                    <div className='w-10 h-10 bg-[#DCFCE7] rounded-full text-[#00A63E] flex items-center justify-center'><FaShieldAlt /></div>
                    <div className='gap-0.5'>
                      <p className='text-sm font-medium text-[#016630]'>Secure & Encrypted</p>
                      <p className='text-xs font-medium text-[#00A63E]'>Your payment info is protected with 256-bit SSL encryption</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
          <div className='relative'>
            <div className='bg-white rounded-[16px] border border-[#F3F4F6] shadow sticky top-20'>
              <div className='bg-linear-to-r from-[#16A34A] to-[#15803D] gap-1 py-4 px-6 rounded-t-[16px]'>
                <h2 className='text-lg font-bold text-white flex items-center gap-2'><FaShoppingBag />Order Summary</h2>
                <p className='font-medium text-[14px] text-[#DCFCE7]'>{numberOfCartItems} items in your cart</p>
              </div>
              <div className='p-6 gap-5'>

                <div className='space-y-3 mb-5 max-h-56 pr-1 overflow-y-auto'>
                  {cartProducts?.map((item: CartItemType) => <div className='flex items-center justify-center rounded-[12px] p-3 gap-3 bg-[#F9FAFB]'>
                    <div key={item.product.id} className='w-14 rounded-[8px] p-1 border border-[#F3F4F6] bg-white '>
                      <img className='w-full object-cover' src={item.product.imageCover} alt={item.product.title}></img>
                    </div>
                    <div className='flex-1 gap-0.5'>
                      <p className='text-[14px] font-medium text-[#101828]'>{item.product.title}</p>
                      <p className='text-[12px] font-medium text-[#6A7282]'>{item.count} × {item.price} EGP</p>
                    </div>
                    <p className='font-bold text-[14px] text-[#101828]'>{item.price * item.count}</p>
                  </div>)}
                  
                </div>

                <div className='space-y-3 gap-3 mb-5'>
                  <div className='flex justify-between'>
                    <span className='font-medium text-[#4A5565] text-[16px]'>Subtotal</span>
                    <span className='font-medium text-[16px] text-[#101828]'>{totalPriceOfCart} EGP</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='font-medium text-[#4A5565] text-[16px] flex justify-center items-center gap-2'><FaTruck />Shipping</span>
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

                <div className='flex items-center justify-center flex-col'>
                  <button disabled={!cartId} type='submit' form="checkout-form" className='cursor-pointer rounded-[12px] py-3.5 px-6 gap-3 bg-linear-to-r mb-4 from-[#16A34A] to-[#15803D] font-semibold text-[16px] text-white w-full flex items-center justify-center'>
                    <FaBoxArchive />Place Order</button>
                </div>

                <div className='flex justify-center items-center border-t border-[#F3F4F6] gap-4 py-3 '>
                  <div className='flex gap-1.5 items-center justify-center '>
                    <IoShieldHalf className='text-[#00C950]' />
                    <span className='text-[#6A7282] font-medium text-[12px]'>Secure</span>
                  </div>

                  <div className='w-px h-4 bg-[#E5E7EB] '></div>

                  <div className='flex gap-1.5 items-center justify-center '>
                    <FaTruck className='text-[#2B7FFF]' />
                    <span className='text-[#6A7282] font-medium text-[12px]'>Fast Delivery</span>
                  </div>

                  <div className='w-px h-4 bg-[#E5E7EB] '></div>

                  <div className='flex gap-1.5 items-center justify-center '>
                    <FaBox className='text-[#FF6900]' />
                    <span className='text-[#6A7282] font-medium text-[12px]'>Easy Returns</span>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
