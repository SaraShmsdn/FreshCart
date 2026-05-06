'use client'
import React from 'react'
import LoginImg from "../../../assets/images/LoginImg.png"
import { FaClock, FaEye, FaFacebook, FaGoogle, FaLock, FaStar, FaTruck, FaUsers } from 'react-icons/fa6';
import { FaShieldAlt } from 'react-icons/fa';
import { MdEmail, MdLock } from 'react-icons/md';
import Link from 'next/link';
import localFont from "next/font/local";
import { Controller, useForm } from 'react-hook-form';
import { email } from 'zod';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { LoginDataType, loginSchema } from './login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { loginAction } from './login.action';
import { signIn } from 'next-auth/react';

const exo = localFont({
  src: "../../../assets/fonts/Exo.ttf",
});

export default function page() {

  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    }, resolver: zodResolver(loginSchema)
  })

  const router = useRouter()

  async function handleLogin(values : LoginDataType) {

     //signIn("credentials", {...values, redirect: true, callbackUrl: "/"})
    
     const res = await signIn("credentials", {
    email: values.email,
    password: values.password,
    redirect: false,
  });

  if (res?.error) {
    toast.error("Invalid email or password", {
      position: "top-right",
      richColors: true,
    });
  } else {
    toast.success("Logged in successfully", {
      position: "top-right",
      richColors: true,
    });

    router.replace("/");
  }

    // using server action
    // const res = await loginAction(values)

    // if (res) {
    //   router.replace("/")
    //   toast.success("Logged in successfully",{
    //     position: "top-right",
    //     richColors: true,
    //   })
    // }
    // else {
    //   toast.error("Invalid email or password",{
    //     position: "top-right",
    //     richColors: true,
    //   })
    // }
  }

  return (
    <div className={`grid grid-cols-2 m-auto gap-12 mt-18 w-[80%] h-screen ${exo.className}`}>
      <div className='text-center gap-6 flex flex-col justify-center'>
        <img src={LoginImg.src} className='rounded-[16px] w-154 h-96 shadow-lg object-cover'></img>
        <div className='gap-[16px] space-y-4'>
          <h2 className='text-3xl font-bold text-[#1E2939]'>FreshCart - Your One-Stop Shop for Fresh Products</h2>
          <p className='text-lg font-medium text-[#4A5565]'>Join thousands of happy customers who trust FreshCart for their daily grocery needs</p>
          <div className='flex justify-center'>
            <div className='flex justify-center pr-8'>
              <FaTruck className='text-[#16A34A] text-2xl pr-2' />
              <p className='text-[#6A7282] font-medium text-[14px]'>Free Delivery</p>
            </div>
            <div className='flex justify-center pr-8'>
              <FaShieldAlt className='text-[#16A34A] text-2xl pr-2' />
              <p className='text-[#6A7282] font-medium text-[14px]'>Secure Payment</p>
            </div>
            <div className='flex justify-center pr-8'>
              <FaClock className='text-[#16A34A] text-2xl pr-2' />
              <p className='text-[#6A7282] font-medium text-[14px]'>24/7 Support</p>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-white shadow-xl rounded-[16px] p-8'>
        <div className='flex text-center justify-center flex-col gap-3 mb-8'>
          <p className='text-3xl font-bold'><span className='text-[#16A34A]'>Fresh</span>Cart</p>
          <h1 className='text-2xl font-bold text-[#1E2939]'>Welcome Back!</h1>
          <p className='text-gray-600 font-medium text-[16px]'>Sign in to continue your fresh shopping experience</p>
        </div>
        <div className='space-y-3 gap-3 mb-6'>
          <button className='w-full rounded-[12px] border-2 border-[#E5E7EB] gap-3 py-3 px-4 flex items-center justify-center font-medium text-[16px] text-[#364153] hover:bg-[#f0fdf4] hover:border-[#86efac]'> <FaGoogle className='text-[#FB2C36]' /> Continue with Google</button>
          <button className='w-full rounded-[12px] border-2 border-[#E5E7EB] gap-3 py-3 px-4 flex items-center justify-center font-medium text-[16px] text-[#364153] hover:bg-[#f0fdf4] hover:border-[#86efac]'> <FaFacebook className='text-[#155DFC]' /> Continue with Facebook</button>
        </div>
        <div className='my-6 relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className="px-4 bg-white text-gray-500 font-medium">OR CONTINUE WITH EMAIL</span>
          </div>
        </div>

        <form className='space-y-6' onSubmit={form.handleSubmit(handleLogin)}>
          {/*email*/}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className='block font-semibold text-[#364153] text-[14px]' htmlFor={field.name}>Email Address</FieldLabel>
                <div className='relative'>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your email"
                    autoComplete="off"
                    className='w-full rounded-[12px] border-2 border-[#E5E7EB] py-3.5 px-12 text-[#99A1AF] text-[16px] font-medium focus:outline-none focus:ring-[#dcfce7] focus:ring-2 focus:border-[#22c55e]'
                    type='email'
                  />
                  <MdEmail className='text-[#99A1AF] text-xl absolute left-4 top-1/2 transform -translate-y-1/2' />
                </div>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          {/*password*/}
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className='flex justify-between'>
                  <FieldLabel className='block font-semibold text-[#364153] text-[14px]' htmlFor={field.name}>Password</FieldLabel>
                  <Link href="" className='text-sm font-medium text-[#16A34A] hover:text-[#15803d]'>Forgot Password?</Link>
                </div>
                <div className='relative'>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password"
                    autoComplete="off"
                    className='w-full rounded-[12px] border-2 border-[#E5E7EB] py-3.5 px-12 text-[#99A1AF] text-[16px] font-medium focus:outline-none focus:ring-[#dcfce7] focus:ring-2 focus:border-[#22c55e]'
                    type='password'
                  />
                  <MdLock className='text-[#99A1AF] text-xl absolute left-4 top-1/2 transform -translate-y-1/2' />
                  <button className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer'><FaEye /></button>
                </div>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          {/*keep me signed in*/}
          <div className='flex'>
            <label className='flex'>
              <input type='checkbox' className='border border-[#767676] rounded-[2.5px] h-4 w-4'></input>
              <span className='pl-3 font-medium text-[14px] text-[#364153]'>Keep me signed in</span>
            </label>
          </div>
          {/*sign in button*/}
          <button type='submit' className='cursor-pointer w-full mb-6 bg-[#16A34A] shadow-lg rounded-[12px] py-3 px-4 text-white font-semibold text-[18px] hover:shadow-xl hover:bg-[#15803d]'>Sign In</button>
        </form>

        <div className='border-t border-t-[#F3F4F6] pt-6'>
          <p className='text-gray-600 px-32 font-medium'>New to FreshCart? <Link href='/signup' className='text-[#16A34A] hover:text-[#15803d]'>Create an account</Link></p>
        </div>

        <div className='flex items-center justify-center mt-6'>
          <div className='pr-6'>
            <p className='text-[#6A7282] font-medium text-[12px] flex items-center'><FaLock className='pr-1 text-[14px]' />SSL Secured</p>
          </div>
          <div className='pr-6'>
            <p className='text-[#6A7282] font-medium text-[12px] flex items-center'><FaUsers className='pr-1 text-[14px]' />50K+ Users</p>
          </div>
          <div className='pr-6'>
            <p className='text-[#6A7282] font-medium text-[12px] flex items-center'><FaStar className='pr-1 text-[14px]' />4.9 Rating</p>
          </div>
        </div>
      </div>
    </div>
  )
}
