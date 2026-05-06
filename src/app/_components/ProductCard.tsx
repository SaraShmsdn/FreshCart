import { ProductType } from '@/types/Product.types'
import Link from 'next/link'
import React from 'react'
import { FaRegEye, FaRegHeart, FaRegStar, FaStar, FaStarHalfStroke } from 'react-icons/fa6'
import { FiRefreshCw } from 'react-icons/fi'
import { MdAdd } from 'react-icons/md'
import AddToCartBtn from './AddToCartBtn'

interface ProductCardPropsType {
  product: ProductType
}

export default function ProductCard({ product }: ProductCardPropsType) {
  return (
    <div className='border border-[#E5E7EB] rounded-[8px] '>

      <div className='relative'>
        <img src={product.imageCover} alt={product.title} className='w-full h-60 object-contain'></img>
        <div className='absolute top-3 right-3 flex flex-col '>
          <div className='pb-2 w-[32px] h-[40px] '>
            <button className='rounded-full shadow flex justify-center items-center bg-white w-[32px] h-[32px]'>
              <FaRegHeart className='text-[#4A5565] hover:text-red-600' />
            </button>
          </div>
          <div className='pb-2 w-[32px] h-[40px] '>
            <button className='rounded-full shadow flex justify-center items-center bg-white w-[32px] h-[32px]'>
              <FiRefreshCw className='text-[#4A5565] hover:text-[#16A34A]' />
            </button>
          </div>
          <Link href={`/products/${product.id}`} className=' w-[32px] h-[32px] rounded-full shadow flex justify-center items-center bg-white w-[32px] h-[32px]'>
            <FaRegEye className='text-[#4A5565] hover:text-[#16A34A]' />
          </Link>
        </div>
        {product.priceAfterDiscount && <span className='rounded-[4px] py-1 px-2 bg-[#FB2C36] w-11.75 h-6 text-[12px] font-medium text-white absolute top-3 left-3 items-center'>-{Math.round(((product?.price - product?.priceAfterDiscount) / product?.price) * 100)}%</span>}
        
      </div>

      <div className='p-4 gap-1'>
        <p className='text-xs text-[#6A7282]'>{product.category.name}</p>
        <a className='font-[16px] text-[#364153] line-clamp-2'>{product.title}</a>
        <div className='flex py-2 items-center'>
          <div className='flex pr-2 '>
            {[...Array(Math.floor(product.ratingsAverage))].map((rating, index) => (
              <FaStar key={index} className='text-[#FCC800] ' />
            ))}
            {product.ratingsAverage % 1 !== 0 && <FaStarHalfStroke className='text-[#FCC800] ' />}
            {product.ratingsAverage === 0 && <FaRegStar className='text-[#FCC800] ' />}

          </div>
          <span className='text-xs text-[#6A7282]'>{product.ratingsAverage} ({product.ratingsQuantity})</span>
        </div>

        <div className='flex justify-between pt-4 '>
          {product.priceAfterDiscount ? <div>
            <span className='font-bold text-[#16A34A] text-[18px]'>{product.priceAfterDiscount} EGP</span> <span className='text-[14px] text-[#6A7282] line-through'>{product.price} EGP</span>
          </div> : <p className='font-bold text-[#1E2939] text-[18px]'>{product.price} EGP</p>}

          <AddToCartBtn productId = {product.id} />
        </div>

      </div>

    </div>
  )
}
