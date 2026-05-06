import React from 'react'
import { FaCcMastercard, FaCcVisa, FaFacebookF, FaHeadset, FaInstagram, FaLocationDot, FaPaypal, FaTruck, FaTwitter, FaYoutube } from 'react-icons/fa6'
import localFont from "next/font/local";
import { FaPhoneAlt, FaShieldAlt } from 'react-icons/fa';
import { IoMdMail, IoMdRefresh } from 'react-icons/io';
import FreshCartLogo from "@/assets/images/FreshCartLogo.png";

const exo = localFont({
    src: "../../assets/fonts/Exo.ttf",
});


export default function Footer() {
  return (
    <footer className={`${exo.className} mt-5`}>

    <div className={`bg-[#F0FDF4] border-y-2 border-[#DCFCE7] py-[24px] px-[208px]`}>
        <div className='grid grid-cols-4 gap-6'>
            <div className='flex items-center gap-3'>
                <div className='w-12 h-12 rounded-[12px] bg-[#DCFCE7] text-[#16A34A] flex justify-center items-center text-xl'><FaTruck /></div>
                <div>
                    <h4 className='font-semibold text-[14px] text-[#101828]'>Free Shipping</h4>
                    <p className='text-gray-500 font-medium text-[12px] text-[#6A7282]'>On orders over 500 EGP</p>
                </div>
            </div>
            <div className='flex items-center gap-3'>
                <div className='w-12 h-12 rounded-[12px] bg-[#DCFCE7] text-[#16A34A] flex justify-center items-center text-xl'><IoMdRefresh /></div>
                <div>
                    <h4 className='font-semibold text-[14px] text-[#101828]'>Easy Returns</h4>
                    <p className='text-gray-500 font-medium text-[12px] text-[#6A7282]'>14-day return policy</p>
                </div>
            </div>
            <div className='flex items-center gap-3'>
                <div className='w-12 h-12 rounded-[12px] bg-[#DCFCE7] text-[#16A34A] flex justify-center items-center text-xl'><FaShieldAlt /></div>
                <div>
                    <h4 className='font-semibold text-[14px] text-[#101828]'>Secure Payment</h4>
                    <p className='text-gray-500 font-medium text-[12px] text-[#6A7282]'>100% secure checkout</p>
                </div>
            </div>
            <div className='flex items-center gap-3'>
                <div className='w-12 h-12 rounded-[12px] bg-[#DCFCE7] text-[#16A34A] flex justify-center items-center text-xl'><FaHeadset /></div>
                <div>
                    <h4 className='font-semibold text-[14px] text-[#101828]'>24/7 Support</h4>
                    <p className='text-gray-500 font-medium text-[12px] text-[#6A7282]'>Contact us anytime</p>
                </div>
            </div>
        </div>
    </div>

    <div className='gap-[48px] bg-[#101828] py-[48px] px-[208px]'>
        <div className="grid grid-cols-6 gap-10">

        {/* Logo + Info */}
        <div className="col-span-2 text-gray-400">
          <div className="flex items-center gap-2 mb-4">
            <div className='bg-white rounded-[8px] py-2 px-4 flex items-center justify-center w-[165px] h-[32px]'><img src={FreshCartLogo.src} alt="FreshCartLogo"></img></div>
          </div>

          <p className="text-sm  mb-6 leading-relaxed">
            FreshCart is your one-stop destination for quality products. From
            fashion to electronics, we bring you the best brands at competitive
            prices with a seamless shopping experience.
          </p>

          <div className="text-sm space-y-2 mb-6">
            <p className='flex gap-2'><FaPhoneAlt className='text-[#22C55E]'/> +1 (800) 123-4567</p>
            <p className='flex gap-2'><IoMdMail className='text-[#22C55E]'/> support@freshcart.com</p>
            <p className='flex gap-2'><FaLocationDot className='text-[#22C55E]'/> 123 Commerce Street, New York, NY 10001</p>
          </div>

          {/* Socials */}
          <div className="flex gap-3">
            <div className="group w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#22C55E] cursor-pointer">
              <FaFacebookF className='group-hover:text-white'/>
            </div>
            <div className="group w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#22C55E] cursor-pointer">
              <FaTwitter className='group-hover:text-white'/>
            </div>
            <div className="group w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#22C55E] cursor-pointer">
              <FaInstagram className='group-hover:text-white'/>
            </div>
            <div className="group w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#22C55E] cursor-pointer">
              <FaYoutube className='group-hover:text-white'/>
            </div>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-white font-semibold mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>All Products</li>
            <li>Categories</li>
            <li>Brands</li>
            <li>Electronics</li>
            <li>Men's Fashion</li>
            <li>Women's Fashion</li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h4 className="text-white font-semibold mb-4">Account</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>My Account</li>
            <li>Order History</li>
            <li>Wishlist</li>
            <li>Shopping Cart</li>
            <li>Sign In</li>
            <li>Create Account</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Contact Us</li>
            <li>Help Center</li>
            <li>Shipping Info</li>
            <li>Returns & Refunds</li>
            <li>Track Order</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Cookie Policy</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 flex justify-between items-center text-sm text-gray-400">
        <p>© 2026 FreshCart. All rights reserved.</p>

        <div className="flex items-center gap-4 text-xl">
          <FaCcVisa />
          <FaCcMastercard />
          <FaPaypal />
        </div>
      </div>
    </div>
    </footer>
  )
}
