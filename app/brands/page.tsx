"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Brand {
  _id: string;
  name: string;
  image: string;
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getBrands() {
    try {
      // نداء الـ API الخاص بالماركات
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
      setBrands(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching brands:", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4FA74F]"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* 1. هيدر الماركات (بنفس ستايل الكاتيجوريز للتناسق) */}
      <section className="bg-purple-600 py-20 px-6 lg:px-20 text-white">
        <div className="container mx-auto">
          <nav className="text-sm mb-4 opacity-80">
            <Link href="/" className="hover:underline">Home</Link> / <span>Brands</span>
          </nav>
          <div className="flex items-center gap-4">
            {/* أيقونة الماركات (شكل شارة أو براند) */}
            <div className="bg-white/20 p-3 rounded-xl">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
               </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Our Brands</h1>
              <p className="mt-2 text-white/90">Shop by your favorite international brands</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. شبكة الماركات */}
      <section className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {brands.map((brand) => (
            <div 
              key={brand._id} 
              className="group cursor-pointer border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-bs-purple-600 transition-all duration-300 bg-white"
            >
              {/* وعاء اللوجو */}
              <div className="p-4 flex items-center justify-center aspect-video sm:aspect-square">
                <img 
                  src={brand.image} 
                  alt={brand.name}
                  className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              
              {/* اسم الماركة */}
              <div className="p-3 text-center bg-gray-50 group-hover:bg-[#4FA74F]/10 transition-colors">
                <h3 className="text-sm font-semibold text-gray-700 group-hover:text-purple-600">
                  {brand.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}