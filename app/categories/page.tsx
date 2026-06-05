"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

// تعريف شكل البيانات اللي جاية من الـ API (Interface)
interface Category {
  _id: string;
  name: string;
  image: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // دالة جلب البيانات من الـ API
  async function getCategories() {
    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
      setCategories(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCategories();
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
      {/* 1. الهيدر الأخضر (الجرين بانر) */}
      <section className="bg-green-600 py-20 px-6 lg:px-20 text-white">
        <div className="container mx-auto">
          <nav className="text-sm mb-4 opacity-80">
            <Link href="/" className="hover:underline">Home</Link> / <span>Categories</span>
          </nav>
          <div className="flex items-center gap-4">
            {/* أيقونة الأقسام البيضاء */}
            <div className="bg-white/20 p-3 rounded-xl">
              <div className="grid grid-cols-2 gap-1 w-6 h-6">
                <div className="bg-white rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">All Categories</h1>
              <p className="mt-2 text-white/90">Browse our wide range of product categories</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. شبكة الكروت الحقيقية من الـ API */}
      <section className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {categories.map((category) => (
            <div 
              key={category._id} 
              className="group cursor-pointer border border-gray-100 rounded-[20px] overflow-hidden hover:shadow-2xl transition-all duration-500 bg-white"
            >
              {/* وعاء الصورة مع الخلفية الرمادية الفاتحة */}
              <div className="bg-[#f0f3f2] aspect-[4/5] flex items-center justify-center p-4 relative overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
              </div>
              
              {/* اسم القسم السفلي */}
              <div className="p-5 text-center border-t border-gray-50">
                <h3 className="font-bold text-[#212529] group-hover:text-[#4FA74F] transition-colors duration-300">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}