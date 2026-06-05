"use client";
import React from "react";
import Link from "next/link"; // الـ Link بتاع Next.js
import { BsGrid3X3GapFill } from "react-icons/bs"; // أيقونة الشبكة من react-icons

const AllProductsHeader = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#4FA74F] to-[#6bc36b] py-12 px-4">
      <div className="container mx-auto relative z-10">
        
        {/* 1. الـ Breadcrumb - تم تعديل 'to' إلى 'href' */}
        <nav className="flex items-center gap-2 text-white/80 text-sm mb-6 font-medium">
          <Link 
            href="/" 
            className="hover:text-white transition-colors duration-200"
          >
            Home
          </Link>
          <span className="opacity-60">/</span>
          <span className="text-white">All Products</span>
        </nav>

        {/* 2. العنوان والأيقونة */}
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm shadow-inner">
            <BsGrid3X3GapFill className="text-white" size={30} />
          </div>
          
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              All Products
            </h1>
            <p className="text-white/90 mt-2 font-medium text-sm md:text-base">
              Explore our complete product collection
            </p>
          </div>
        </div>

      </div>

      {/* 3. الدوائر الخلفية للتصميم */}
      <div className="absolute top-[-20%] right-[-5%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] left-[10%] w-32 h-32 bg-black/5 rounded-full blur-2xl"></div>
    </section>
  );
};

export default AllProductsHeader;