import { getAllCategories } from '@/service/Categories'
import { Cat } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default async function ShopByCategory() {
    const Categories = await getAllCategories()
    return (
        <div className='w-full'>
            <div className='grid grid-cols-2 md:grid-cols-6 gap-4'>
                {Categories.map(item => <Link key={item._id} className='bg-white shadow rounded-[8px] p-4 flex flex-col items-center gap-3 hover:shadow-md' href="/categories">
                   
                        <img src={item.image} alt={item.name} className='w-20 h-20 rounded-full mx-auto object-cover' />
                        <h3 className='font-medium text-[#364153]'>{item.name}</h3>
                    

                </Link>
                )}
            </div>

        </div>
    )
}
