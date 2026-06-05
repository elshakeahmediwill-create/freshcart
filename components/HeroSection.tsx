"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// شيلنا Autoplay من هنا عشان ملوش لزمة دلوقتي
import { Pagination, Navigation } from "swiper/modules";
import Link from "next/link";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HeroSection = () => {
  const slidesData = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=2070&auto=format&fit=crop",
      title: "Fresh Products Delivered to your Door",
      subtitle: "Get 20% off your first order",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop",
      title: "Vegetables & Fruits at Best Prices",
      subtitle: "Free Shipping on Orders Over 500 EGP",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?q=80&w=2070&auto=format&fit=crop",
      title: "Quality Grocery at your Fingertips",
      subtitle: "Shop our daily fresh items",
    },
  ];

  return (
    <section className="w-full">
      <Swiper
        // 1. شيلنا مديول Autoplay من المصفوفة
        modules={[Pagination, Navigation]}
        // 2. حذفنا سطر الـ autoplay بالكامل
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className="w-full h-[350px] md:h-[500px]" 
      >
        {slidesData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <img 
                src={slide.image} 
                className="w-full h-full object-cover" 
                alt={slide.title} 
              />
              
              <div className="absolute inset-0 bg-green-500/80 z-10"></div>
              
              <div className="absolute inset-0 flex flex-col justify-center z-20">
                <div className="container mx-auto px-6 md:px-12 text-white">
                    <span className="bg-yellow-400 text-black w-fit px-4 py-1.5 rounded-full text-xs font-bold mb-6 inline-block shadow-sm">
                      Exclusive Offer
                    </span>
                    <h1 className="text-4xl md:text-7xl font-extrabold mb-5 leading-tight max-w-2xl">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 opacity-95 max-w-lg font-medium">
                      {slide.subtitle}
                    </p>
                    <div className="flex gap-4">
                      <Link href="/shop" className="bg-white text-green-600 px-10 py-4 rounded-xl font-bold transition-all shadow-lg hover:scale-105">
                        Shop Now
                      </Link>
                      <Link href="/help" className="bg-white/20 backdrop-blur-md border border-white/50 text-white px-10 py-4 rounded-xl font-bold hover:bg-white/30 transition-all">
                        View Deals
                      </Link>
                    </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;