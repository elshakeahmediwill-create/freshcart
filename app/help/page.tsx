"use client"; // أهم سطر: عشان نشغل الكود اللي إنت صممته كـ Client Component ونخفي الـ RunTime Error في Turbopack

import React from "react";
import Link from "next/link";
// تأكد إنShopping Cart, Heart, Search موجودة في الـ Imports دي في الـ layout بتاعك
import { ShoppingCart, Heart, Search, Phone, Mail, User, Headset } from "lucide-react";

export default function HelpPage() {
  return (
    // نفس الخلفية والأيقونات الخفيفة اللي في الـ 404
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white relative overflow-hidden font-sans">
      
      {/* الأيقونات الديكورية الخفيفة في الخلفية */}
      <div className="absolute top-20 left-10 opacity-10 rotate-12 pointer-events-none">
        <ShoppingCart size={120} className="text-[#13b443]" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-10 -rotate-12 pointer-events-none">
        <ShoppingCart size={120} className="text-[#13b443]" />
      </div>

      {/* بوكس الأيقونة والـ 404 (نفس التصميم بالظبط) */}
      <div className="relative mb-8 z-10 scale-90 md:scale-100">
        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 relative">
          <ShoppingCart size={80} className="text-[#13b443]" strokeWidth={1.5} />
          {/* دائرة الـ badge (كتبت فيها Help بدل 404 عشان دي صفحة مساعدة حقيقية) */}
          <div className="absolute -top-3 -right-3 bg-[#13b443] text-white text-[11px] font-black px-3.5 py-1.5 rounded-full shadow-lg border-4 border-white">
            HELP
          </div>
        </div>
        
        {/* تصميم النقاط الأخضر */}
        <div className="flex justify-center gap-2 mt-4 opacity-50">
          <div className="w-1.5 h-1.5 rounded-full bg-[#13b443]"></div>
          <div className="w-4 h-1.5 rounded-full bg-[#13b443]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#13b443]"></div>
        </div>
      </div>

      {/* النصوص (نفس اللي في الـ 404) */}
      <h1 className="text-[36px] md:text-[42px] font-black text-[#1a2b3c] leading-tight mb-4 z-10 relative">
        Oops! Nothing Here
      </h1>
      <p className="text-gray-500 max-w-lg text-[15px] md:text-[16px] mb-12 leading-relaxed z-10 relative">
        Looks like this page went out of stock! Don&apos;t worry, there&apos;s plenty more fresh content to explore.
      </p>

      {/* الأزرار (نفس اللي في الـ 404) */}
      <div className="flex flex-col sm:flex-row gap-4 mb-16 relative z-10">
        <Link 
          href="/" 
          className="bg-[#13b443] text-white px-8 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-all shadow-md active:scale-95 whitespace-nowrap"
        >
          {/* تأكد إن أيقونة الـ Home موجودة في الـ Imports دي في الـ layout بتاعك */}
          <User size={18} />
          Go to Homepage
        </Link>
        <button 
          onClick={() => window.history.back()}
          className="bg-white text-gray-700 border border-gray-200 px-8 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all active:scale-95 shadow-sm whitespace-nowrap"
        >
          {/* تأكد إن أيقونة الـ ArrowLeft موجودة في الـ Imports دي في الـ layout بتاعك */}
          <User size={18} />
          Go Back
        </button>
      </div>

      {/* قسم الوجهات الشائعة (نفس اللي في الـ 404) */}
      <div className="w-full max-w-2xl bg-gray-50/50 border border-gray-100 p-8 rounded-[32px] relative z-10">
        <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[2px] mb-6">
          Popular Destinations
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { name: "All Products", href: "/shop" },
            { name: "Categories", href: "/categories" },
            { name: "Today's Deals", href: "/deals" },
            { name: "Contact Us", href: "/contact" }
          ].map((link, i) => (
            <Link 
              key={i} 
              href={link.href}
              className="bg-white border border-gray-100 px-5 py-2.5 rounded-xl text-[13px] font-bold text-gray-600 hover:text-[#13b443] hover:border-[#13b443] transition-all shadow-sm"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

    </main>
  );
}