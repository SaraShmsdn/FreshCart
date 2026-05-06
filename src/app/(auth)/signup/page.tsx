'use client'
import React from 'react'
import localFont from "next/font/local";
import { FaFacebook, FaGoogle, FaShield, FaStar } from 'react-icons/fa6';
import { FaShieldAlt, FaShippingFast } from 'react-icons/fa';
import SignupImg from '../../../assets/images/SignupImg.png'
import { MdPersonAddAlt1 } from 'react-icons/md';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupDataType, signupSchema } from './signup.schema';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


const exo = localFont({
  src: "../../../assets/fonts/Exo.ttf",
});


export default function page() {

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    resolver: zodResolver(signupSchema)
  })

  const router = useRouter()

  async function handleSignup(values : SignupDataType) {

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const finalRes = await res.json()
    console.log("finalRes", finalRes);

    if (res.ok) {
      toast.success("Account created Successfully", {
        position: "top-right",
        richColors: true,
      })
      router.replace("/login")
    }
    else {
      toast.error(finalRes.message, {
        position: "top-right",
        richColors: true,
      })
    }

  }

  return (
    <div className={`grid grid-cols-2 m-auto gap-12 mt-18 w-[80%] h-screen ${exo.className}`}>
      <div className='gap-2'>
        <h1 className='text-4xl font-bold text-[#364153]'>Welcome to <span className='text-[#16A34A]'>FreshCart</span></h1>
        <p className='text-xl font-medium text-[#364153] text-[20px]'>Join thousands of happy customers who enjoy fresh groceries
          delivered right to their doorstep.</p>
        <ul className='space-y-6 py-6 gap-6'>
          <li className='gap-4 flex'>
            <div className='bg-[#BBF7D0] rounded-full flex justify-center items-center text-xl h-12 w-12'>
              <FaStar className='text-[#16A34A]' />
            </div>
            <div>
              <h2 className='text-lg text-[#364153] font-semibold text-[18px]'>Premium Quality</h2>
              <p className='text-gray-600 font-medium text-[16px]'>Premium quality products sourced from trusted suppliers.</p>
            </div>
          </li>
          <li className='gap-4 flex'>
            <div className='bg-[#BBF7D0] rounded-full flex justify-center items-center text-xl h-12 w-12'>
              <FaShippingFast className='text-[#16A34A]' />
            </div>
            <div>
              <h2 className='text-lg text-[#364153] font-semibold text-[18px]'>Fast Delivery</h2>
              <p className='text-gray-600 font-medium text-[16px]'>Same-day delivery available in most areas</p>
            </div>
          </li>
          <li className='gap-4 flex'>
            <div className='bg-[#BBF7D0] rounded-full flex justify-center items-center text-xl h-12 w-12'>
              <FaShieldAlt className='text-[#16A34A]' />
            </div>
            <div>
              <h2 className='text-lg text-[#364153] font-semibold text-[18px]'>Secure Shopping</h2>
              <p className='text-gray-600 font-medium text-[16px]'>Your data and payments are completely secure</p>
            </div>
          </li>
        </ul>
        <div className='bg-white p-4 rounded-[6px] gap-4 shadow font-'>
          <div className='flex mb-4 gap-4'>
            <img src={SignupImg.src} alt="author" className='w-12 h-12 rounded-full ' />
            <div>
              <h3 className='font-medium text-[#364153]'>Sarah Johnson</h3>
              <div className='pt-0.5 pb-1 flex items-center text-[#FFDF20]'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
            </div>
          </div>
          <p className='text-[16px] text-[#4A5565] italic mb-2 font-medium'>"FreshCart has transformed my shopping experience. The quality of the
            products is outstanding, and the delivery is always on time. Highly
            recommend!"</p>
        </div>
      </div>
      <div className=' rounded-[16px] shadow-lg py-10 px-6 mb-4 gap-2'>
        <h2 className='text-center text-[#364153] font-semibold text-[30px] mb-2'>Create Your Account</h2>
        <p className='text-center text-[#364153] font-medium text-[16px]'>Start your fresh journey with us today</p>
        {/*regsiter btns*/}
        <div className='py-8 flex items-center justify-center gap-2'>
          <button className='border flex justify-center items-center border-[#D1D5DC] py-2 px-4 rounded-[8px] w-[50%] text-[16px] hover:bg-gray-100'><FaGoogle className='text-red-600 mr-3' /><span className='text-[#101828] font-semibold'>Google</span></button>
          <button className='border flex justify-center items-center border-[#D1D5DC] py-2 px-4 rounded-[8px] w-[50%] text-[16px] hover:bg-gray-100'><FaFacebook className='text-blue-600 mr-3' /><span className='text-[#101828] font-semibold'>Facebook</span></button>
        </div>

        <div className=' relative '>
          <div className='absolute inset-0 flex items-center'>
            <div className="w-full border border-t border-gray-200"></div>
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className="px-4 bg-white text-[#364153] font-medium text-[16px]">or</span>
          </div>
        </div>

        <form className='space-y-7 py-2 gap-7' onSubmit={form.handleSubmit(handleSignup)}>
          {/*name*/}
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className='font-medium text-[#364153] text-[16px]' htmlFor={field.name}>Name*</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Ali"
                  autoComplete="off"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          {/*email*/}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className='font-medium text-[#364153] text-[16px]' htmlFor={field.name}>Email*</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="ali@example.com"
                  autoComplete="off"
                  type='email'
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          {/*password*/}
          <div className='flex flex-col gap-2'>
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className='font-medium text-[#364153] text-[16px]' htmlFor={field.name}>Password*</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="create a strong password"
                    autoComplete="off"
                    type="password"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <div className='flex items-center pt-1 gap-2'>
              <div className='rounded-8 bg-[#E5E7EB] w-123.75 h-1'></div>
              <span className='text-sm pr-3.5 text-[#364153] font-medium text-[14px]'>Weak</span>
            </div>
            <p className='text-gray-500 font-medium text-[12px]'>Must be at least 8 characters with numbers and symbols</p>
          </div>
          {/*confirm password*/}
          <Controller
            name="rePassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className='font-medium text-[#364153] text-[16px]' htmlFor={field.name}>Confirm Password*</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="confirm your password"
                  autoComplete="off"
                  type='password'
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          {/*phone number*/}
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className='font-medium text-[#364153] text-[16px]' htmlFor={field.name}>Phone Number*</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="+1 234 567 8900"
                  autoComplete="off"
                  type='tel'
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          {/*terms and conditions*/}
          <div>
            <label className='flex gap-2 items-center'>
              <input type='checkbox' className='border border-[#767676] rounded-[2.5px] h-4 w-4'></input>
              <span className='pl-3 font-medium text-[16px] text-[#364153]'>I agree to the <span className='text-[#16A34A] hover:underline'>Terms of Service</span> and <span className='text-[#16A34A] hover:underline'>Privacy Policy</span> *</span>
            </label>
          </div>
          {/*sign up button*/}
          <button type='submit' className='w-full h-10 mb-6 bg-[#16A34A] shadow-lg rounded-[12px] text-white font-semibold text-[16px] hover:shadow-xl hover:bg-[#15803d] flex items-center justify-center gap-2 cursor-pointer'><MdPersonAddAlt1 className='text-[20px]' />Create My Account</button>
        </form>
        <div className='border-t border-t-[#F3F4F6] pt-10'>
          <p className='text-gray-600 px-32 font-medium text-[16px]'>Already have an account? <Link href='/login' className='text-[#16A34A] hover:text-[#15803d]'>Sign In</Link></p>
        </div>
      </div>
    </div>
  )
}
