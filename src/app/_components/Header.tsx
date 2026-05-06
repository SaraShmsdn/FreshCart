"use client"
import React from 'react'
import { FaTruckMoving } from "react-icons/fa";
import { BiSolidGift } from "react-icons/bi";
import { FaPhone, FaUserPlus } from "react-icons/fa6";
import { LuMail } from "react-icons/lu";
import { LuUserRound } from "react-icons/lu";
import { PiSignOutBold } from "react-icons/pi";
import Link from 'next/link';
import localFont from "next/font/local";
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

const exo = localFont({
    src: "../../assets/fonts/Exo.ttf",
});

export default function Header() {

    const session = useSession();

    function handleLogout (){
        signOut({redirect: true, callbackUrl:"/login"})
    }


    return (
        <>
            <div className={`px-16 bg-white py-2 text-[14px] text-[#6A7282] ${exo.className}`}>
                <div className='flex justify-between gap-[557.9500122070312px]'>
                    <div className='flex gap-[24px]'>
                            <span className='flex items-center gap-[8px]'><FaTruckMoving className='text-[#16A34A]' />Free Shipping on Orders 500 EGP</span>
                            <span className='flex items-center gap-[8px]'><BiSolidGift className='text-[#16A34A]' />New Arrivals Daily</span>
                    </div>
                    <div className='flex gap-[24px]'>
                        <div className='flex gap-[16px]'>
                            <a className='flex items-center gap-[6px] cursor-pointer hover:text-[#16a34a] group/item'> <FaPhone className='text-[#6A7282] group-hover/item:text-[#16a34a]' /> +1 (800) 123-4567</a>
                            <a className='flex items-center gap-[6px] cursor-pointer hover:text-[#16a34a] group/item'> <LuMail className='text-[#6A7282] group-hover/item:text-[#16a34a]' /> support@freshcart.com</a>
                        </div>
                        <span className='w-[1px] h-[16px] justify-center self-center bg-[#E5E7EB]'></span>
                        <div className='flex gap-[16px]'>
                            {session.data?  <Button className='flex items-center gap-[6px] cursor-pointer text-[#6A7282] hover:text-red-600 group/item bg-transparent' onClick={handleLogout}> <PiSignOutBold className='text-[#6A7282] group-hover/item:text-red-600' /> Sign Out</Button>
                            : <><Link className='flex items-center gap-[6px] cursor-pointer hover:text-[#16a34a] group/item' href='/login'> <LuUserRound className='text-[#6A7282] group-hover/item:text-[#16a34a]' /> Sign In</Link>
                            <Link className='flex items-center gap-[6px] cursor-pointer hover:text-[#16a34a] group/item' href='/signup'> <FaUserPlus className='text-[#6A7282] group-hover/item:text-[#16a34a]' /> Sign Up</Link></>}
                        </div>
                    </div>
                </div>
            </div>
            <hr></hr>
        </>
    )
}
