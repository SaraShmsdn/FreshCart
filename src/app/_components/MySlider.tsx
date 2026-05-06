"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import localFont from "next/font/local";


const exo = localFont({
    src: "../../assets/fonts/Exo.ttf",
});

interface MySliderPropsType {
    listOfImages: string[],
    spaceBetween?: number,
    slidesPreView?: number
}

export default function MySlider({ listOfImages, spaceBetween = 10, slidesPreView = 3 }: MySliderPropsType) {
    return (
        <Swiper className={`w-full ${exo.className}  
        [&_.swiper-button-next]:w-12!
        [&_.swiper-button-next]:h-12!
        [&_.swiper-button-next]:right-4!
      [&_.swiper-button-next]:bg-white/90
        [&_.swiper-button-next]:rounded-full!
      [&_.swiper-button-next]:text-green-500!
        [&_.swiper-button-prev]:w-12!
        [&_.swiper-button-prev]:h-12!
        [&_.swiper-button-prev]:left-4!
      [&_.swiper-button-prev]:bg-white/90
        [&_.swiper-button-prev]:rounded-full!
      [&_.swiper-button-prev]:text-green-500!
        [&_.swiper-button-prev]: text-green-600!
        [&_.swiper-navigation-icon]:w-2!
        [&_.swiper-button-prev]:hover:bg-white!
        [&_.swiper-button-prev]:hover:text-green-600!
        [&_.swiper-button-prev]:hover:w-13!
        [&_.swiper-button-prev]:hover:h-13!
        [&_.swiper-button-next]:hover:w-13!
        [&_.swiper-button-next]:hover:h-13!
        [&_.swiper-button-next]:hover:bg-white!
        [&_.swiper-button-next]:hover:text-green-600!`}
            spaceBetween={spaceBetween}
            slidesPerView={slidesPreView}
            modules={[Navigation, Pagination]}
            loop
            navigation
            pagination={{
                clickable: true, bulletActiveClass: "w-8! opacity-100! rounded-2xl!", bulletClass: "swiper-pagination-bullet w-3! h-3! bg-white! opacity-50!"
            }}
        //   onSlideChange={() => console.log('slide change')}
        //   onSwiper={(swiper) => console.log(swiper)}
        >
            {listOfImages.map((image) => <SwiperSlide >
                <div style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" }} className='w-full h-100 flex items-center justify-center'>
                    <div id='overlay' className='bg-linear-to-r from-[#00C950E5] to-[#05DF7280] w-full h-full p-4 py-20 text-white'>
                        <div className='h-full content-center px-16 '>
                            <h2 className='font-bold mb-4 max-w-96 text-3xl'>Fresh Products Delivered
                                to your Door</h2>
                            <p style={{ opacity: 1, transform: "none" }}>Get 20% off your first order</p>
                            <div className='mt-4 gap-2 opacity-97 flex'>
                                <a className='rounded-[8px] px-6 py-2 border border-white bg-white cursor-pointer text-[#00C950] font-semibold hover:scale-105'>Shop Now</a>
                                <a className='rounded-[8px] px-6 py-2 border border-white text-white cursor-pointer font-semibold hover:scale-105'>View Deals</a>
                            </div>
                        </div>
                    </div>
                </div>

            </SwiperSlide>)}
        </Swiper>
    );
};