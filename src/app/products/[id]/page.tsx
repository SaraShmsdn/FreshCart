import { getProductById } from '@/service/Products'
import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { BsLightningChargeFill } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { FaShareAlt } from "react-icons/fa";
import localFont from "next/font/local";

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { FaRegStar, FaStar, FaStarHalfStroke } from 'react-icons/fa6';
import NumberField from './../../_components/NumberField';


const exo = localFont({
  src: "../../../assets/fonts/Exo.ttf",
});


export default async function page({ params }) {

  const myParams = await params

  const product = await getProductById(myParams.id)

  return (
    <div className={`px-16 gap-8 h-[1000px] mt-5 ${exo.className}`}>
      <div className='flex gap-8 '>
        <div id='productImg' className=' w-1/4 '>
          <div className='bg-white p-4 top-4 sticky shadow rounded-[12px] '>
            <div className='flex flex-col justify-center items-center'>
              <img src={product?.imageCover} alt={product?.title} className='w-full max-h-280 mb-4' />
              <div >
                <Carousel
                  opts={{
                    align: "start",
                  }}
                  className="w-fill max-w-[12rem] sm:max-w-xs md:max-w-sm"
                >
                  <CarouselContent>
                    {Array.from({ length: product?.images?.length || 0 }).map((_, index) => (
                      <CarouselItem key={index} className="basis-1/2 lg:basis-1/3">
                        <div>

                          <CardContent className="flex aspect-square items-center justify-center p-0">
                            <img src={product?.images[index]} alt={`${product?.title} - ${index + 1}`} className="h-full w-full object-contain" />
                          </CardContent>

                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          </div>
        </div>

        <div id='productInfo' className='w-3/4'>
          <div className='bg-white p-6 rounded-[12px] shadow'>
            <div className='flex gap-2 mb-4'>
              <a className='bg-[#F0FDF4] py-1.5 cursor-pointer px-3 text-[#15803D] text-[12px] rounded-full hover:bg-[#dafde4]'>{product?.category?.name}</a>
              <span className='bg-[#F3F4F6] py-1.5 px-3 text-[#364153] text-[12px] rounded-full'>{product?.brand?.name}</span>
            </div>
            <h1 className='font-bold text-[30px] mb-3'>{product?.title}</h1>
            <div className='flex items-center mb-4 gap-3'>
              <div className='flex pr-2 '>
                {[...Array(Math.floor(product?.ratingsAverage))].map((rating, index) => (
                  <FaStar key={index} className='text-[#FCC800] text-[20px]' />
                ))}
                {product?.ratingsAverage % 1 !== 0 && <FaStarHalfStroke className='text-[#FCC800] text-[20px]' />}
                {product?.ratingsAverage === 0 && <FaRegStar className='text-[#FCC800] text-[20px]' />}

              </div>
              <span className='text-[14px] text-[#4A5565]'>{product?.ratingsAverage} ({product?.ratingsQuantity} reviews)</span>
            </div>
            <div className='flex items-center gap-3 mb-6'>
              {product?.priceAfterDiscount ?
                <span className='text-[30px] font-bold'>{product?.priceAfterDiscount} EGP</span> : 
                <span className='text-[30px] font-bold'>{product?.price} EGP</span>
              }
              {product?.priceAfterDiscount && <>
              <span className='text-lg line-through text-[#99a1af]'>{product?.price} EGP</span> 
              <span className='bg-red-500 text-white text-sm px-3 py-1 rounded-full font medium'>Save {Math.round(((product?.price - product?.priceAfterDiscount) / product?.price) * 100)}%</span>
              </>
              }
            </div>
            <div className='flex mb-6 gap-2 items-center'>
              <span className='flex items-center rounded-full px-3 py-1.5 bg-[#F0FDF4] gap-1.5 text-[#008236] text-[14px]'>
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                In Stock
              </span>
            </div>
            <div className='border-t-[#F3F4F6] border-t pt-5 mb-6'>
              <p className='text-[16px] text-[#4A5565] '>{product?.description}</p>
            </div>
            <div className='mb-6'>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <div className='flex gap-4 items-center'>
                <div className='flex rounded-lg border-2 border-[#E5E7EB] w-[188px] h-[52px]'>
                  <NumberField/>
                </div>
                <span className='text-sm text-[#6A7282]'>{product?.quantity} available</span>
              </div>
            </div>
            <div className='bg-[#F9FAFB] p-4 rounded-[8px] mb-6'>
              <div className='flex justify-between items-center'>
                <span className='text-[#4A5565] text-[16px]'>Total Price:</span>
                {product?.priceAfterDiscount ?
                <span className='text-2xl text-[#16A34A] text-[24px] font-bold'>{product?.priceAfterDiscount} EGP</span> :
                <span className='text-2xl text-[#16A34A] text-[24px] font-bold'>{product?.price} EGP</span>}
              </div>
            </div>
            <div className='flex gap-3 mb-6'>
              <button className='px-6 py-3.5 gap-[8px] cursor-pointer flex flex-1 bg-[#16A34A] items-center justify-center shadow-lg shadow-[#16A34A40] text-white text-[16px] rounded-[16px] font-medium hover:bg-[#15803d]'><FaShoppingCart className='text-[20px]'/>Add to Cart</button>
              <button className='px-6 py-3.5 gap-[8px] cursor-pointer flex flex-1 bg-[#101828] items-center justify-center text-white text-[16px] rounded-[16px] font-medium hover:bg-[#1e2939]'><BsLightningChargeFill className='text-[20px]'/>Buy Now</button>
            </div>
            <div className='flex gap-3'>
              <button className='border-2 border-[#E5E7EB] rounded-[12px] gap-[8px] px-[16px] py-[12px] cursor-pointer flex justify-center items-center flex-1 hover:border-[#86efac] hover:text-[#16a34a]'><FaRegHeart />Add to Wishlist</button>
              <button className='border-2 border-[#E5E7EB] rounded-[12px] px-[16px] py-[12px] cursor-pointer hover:border-[#86efac] hover:text-[#16a34a]'><FaShareAlt /></button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
