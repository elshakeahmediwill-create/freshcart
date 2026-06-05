"use client";
import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link"; // استيراد اللينك مهم جداً

interface Category {
  _id: string;
  name: string;
  image: string;
}

const CategorySlider = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("https://ecommerce.routemisr.com/api/v1/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data.slice(0, 10));
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return (
    <section className="container mx-auto px-4 py-12">
      
      {/* --- الجزء الأول: العنوان --- */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span className="w-1.5 h-8 bg-green-600 rounded-full inline-block"></span>
          Shop By Category
        </h2>
        
        <button className="text-gray-500 hover:text-green-600 font-medium flex items-center gap-1 transition-colors group">
          View All Categories 
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      
      {/* --- الجزء الثاني: شبكة الدوائر --- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-10 gap-x-4 mb-20">
        {categories.map((cat) => (
          // التعديل هنا: المسار بقى /categorie/ وليس /categories/
          <Link 
            href={`/categorie/${cat._id}`} 
            key={cat._id} 
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden bg-[#F8F9FA] flex items-center justify-center border border-transparent group-hover:border-green-500 transition-all duration-300 shadow-sm">
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-20 h-20 md:w-24 md:h-24 object-contain group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-gray-600 group-hover:text-green-600 transition-colors text-center">
              {cat.name}
            </h3>
          </Link>
        ))}
      </div>

      {/* --- الجزء الثالث: البانرات كما هي --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* البانر الأخضر */}
        <div className="relative rounded-2xl overflow-hidden h-[300px] bg-gradient-to-br from-green-600 via-green-500 to-green-700 p-8 md:p-12 flex flex-col justify-center shadow-lg group">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
            <span className="text-white/90 text-sm font-bold tracking-wide uppercase">Deal of the Day</span>
          </div>
          <h3 className="text-white text-3xl md:text-4xl font-extrabold mb-2 leading-tight">
            Fresh Organic Fruits
          </h3>
          <p className="text-white/80 text-lg mb-6">Get up to 40% off on selected organic fruits</p>
          <div className="flex items-baseline gap-2 mb-8">
            <span className="text-white text-4xl font-black">40% OFF</span>
            <span className="text-white/70 text-sm font-medium">Use code: <span className="text-white font-bold">ORGANIC40</span></span>
          </div>
          <Link href="/shop" className="bg-white/20 backdrop-blur-sm border border-white/30 text-white w-fit px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-white hover:text-green-600 transition-all">
            Shop Now <ArrowRight size={20} />
          </Link>
        </div>

        {/* البانر البرتقالي */}
        <div className="relative rounded-2xl overflow-hidden h-[300px] bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 p-8 md:p-12 flex flex-col justify-center shadow-lg group">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></span>
            <span className="text-white/90 text-sm font-bold tracking-wide uppercase">New Arrivals</span>
          </div>
          <h3 className="text-white text-3xl md:text-4xl font-extrabold mb-2 leading-tight">
            Exotic Vegetables
          </h3>
          <p className="text-white/80 text-lg mb-6">Discover our latest collection of premium vegetables</p>
          <div className="flex items-baseline gap-2 mb-8">
            <span className="text-white text-4xl font-black">25% OFF</span>
            <span className="text-white/70 text-sm font-medium">Use code: <span className="text-white font-bold">FRESH25</span></span>
          </div>
          <Link href="/shop" className="bg-white/20 backdrop-blur-sm border border-white/30 text-white w-fit px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-white hover:text-orange-600 transition-all">
            Explore Now <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySlider;