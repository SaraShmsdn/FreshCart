import { log } from 'console'
import React from 'react'
import { MdAdd } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { FaStarHalfStroke } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa6";
import { FaTruck } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { BsHeadset } from "react-icons/bs";
import { GiAnticlockwiseRotation } from "react-icons/gi";
import ProductCard from './_components/ProductCard';
import { ProductType } from '@/types/Product.types';
import { getAllProducts } from '@/service/Products';
import MySlider from './_components/MySlider';
import image1 from "../assets/images/vegetables.png"
import localFont from "next/font/local";
import Link from 'next/link';
import ShopByCategory from './_components/ShopByCategory';
import { getMyToken } from '@/utils/getMyToken';


const exo = localFont({
  src: "../assets/fonts/Exo.ttf",
});


export default async function Home() {

  const products = await getAllProducts()

  getMyToken()

  return (
    <>
      <MySlider listOfImages={[image1.src, image1.src, image1.src]} slidesPreView={1} />

      <div className={`bg-[#F9FAFB] px-16 py-8 ${exo.className}`}>
        <div className='grid grid-cols-4 gap-[16px]'>
          <div className='flex items-center  rounded-[12px] p-[16px] gap-[16px] bg-white shadow hover:shadow-md'>
            <div className='rounded-full w-12 h-12 flex items-center justify-center bg-[#EEF6FF]'>
              <FaTruck className='text-[#2B7FFF] text-xl' />
            </div>
            <div>
              <h3 className='font-semibold text-[#1E2939] text-[14px]'>Free Shipping</h3>
              <p className='text-xs text-[#6A7282]'>On orders over 500 EGP</p>
            </div>
          </div>
          <div className='flex items-center  rounded-[12px] p-[16px] gap-[16px] bg-white shadow hover:shadow-md'>
            <div className='rounded-full w-12 h-12 flex items-center justify-center bg-[#ECFDF5]'>
              <FaShieldAlt className='text-[#00BC7D] text-xl' />
            </div>
            <div>
              <h3 className='font-semibold text-[#1E2939] text-[14px]'>Secure Payment</h3>
              <p className='text-xs text-[#6A7282]'>100% secure transactions</p>
            </div>
          </div>
          <div className='flex items-center  rounded-[12px] p-[16px] gap-[16px] bg-white shadow hover:shadow-md'>
            <div className='rounded-full w-12 h-12 flex items-center justify-center bg-[#FFF7ED]'>
              <GiAnticlockwiseRotation className='text-[#FF6900] text-xl' />
            </div>
            <div>
              <h3 className='font-semibold text-[#1E2939] text-[14px]'>Easy Returns</h3>
              <p className='text-xs text-[#6A7282]'>14-day return policy</p>
            </div>
          </div>
          <div className='flex items-center  rounded-[12px] p-[16px] gap-[16px] bg-white shadow hover:shadow-md'>
            <div className='rounded-full w-12 h-12 flex items-center justify-center bg-[#FAF5FF]'>
              <BsHeadset className='text-[#AD46FF] text-xl' />
            </div>
            <div>
              <h3 className='font-semibold text-[#1E2939] text-[14px]'>24/7 Support</h3>
              <p className='text-xs text-[#6A7282]'>Dedicated support team</p>
            </div>
          </div>
        </div>
      </div>

      <div id="categories" className={`px-16 gap-[32px] py-10 ${exo.className}`}>
        <div className='flex justify-between gap-[12px] items-center mb-8'>
          <div className='flex justify-center items-center gap-[12px]'>
            <div className='h-[32px] w-[6px] bg-gradient-to-t from-[#007A55] to-[#00BC7D] rounded-[33554400px]'></div>
            <h2 className='font-bold text-3xl my-8'>Shop By <span className='text-[#009966]'>Category</span></h2>
          </div>
          <Link href="/categories" className='text-[16px] text-[#16A34A] font-medium cursor-pointer hover:text-[#15803d]'>View All Categories <FaArrowRightLong className='inline'/></Link>
        </div>
        <ShopByCategory />
      </div>

      <div id="featured products" className={`px-16 gap-[32px] py-10 ${exo.className}`}>
        <div className='flex gap-[12px] items-center mb-8'>
          <div className='h-[32px] w-[6px] bg-gradient-to-t from-[#007A55] to-[#00BC7D] rounded-[33554400px]'></div>
          <h2 className='font-bold text-3xl my-8'>Featured <span className='text-[#009966]'>Products</span></h2>
        </div>

        <div className='grid xl:grid-cols-5 md:grid-cols-4 grid-cols-1 gap-6'>
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </>
  )
}
