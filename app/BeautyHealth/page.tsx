"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Star, Plus, Heart, Eye, RefreshCw, X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext";
export default function BeautyHealthPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryImage, setCategoryImage] = useState("");

  async function getBeautyProducts(page = 1) {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=100`);
      const filtered = data.data.filter((product: any) => 
        product.category.name.includes("Beauty") || product.category.name.includes("Health")
      );

      if (filtered.length > 0) {
        setCategoryImage(filtered[0].category.image);
      }
      setProducts(filtered);
      setCurrentPage(page);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getBeautyProducts();
  }, []);
// 2. جوه المكون (Component) قبل الـ return
const { addToCart } = useCart();
  return (
    <main className="bg-gray-50 min-h-screen pb-20 font-sans">
      {/* --- الهيدر المعدل ليكون نفس الصورة بالظبط --- */}
      <section className="bg-gradient-to-r from-[#13b443] to-[#27d05a] py-12 px-6 lg:px-20 text-white">
        <div className="container mx-auto">
          {/* الـ Breadcrumbs بنفس تنسيق الصورة */}
          <nav className="flex items-center gap-1 text-[13px] mb-6 opacity-90 font-medium">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-1">/</span>
            <Link href="/categories" className="hover:underline">Categories</Link>
            <span className="mx-1">/</span>
            <span className="font-bold">Beauty & Health</span>
          </nav>
          
          <div className="flex items-center gap-5">
            {/* المربع اللي جواه الأيقونة زي الصورة */}
            <div className="bg-[#56d97d] p-4 rounded-[20px] shadow-lg flex items-center justify-center w-20 h-20">
              <Sparkles size={40} className="text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold tracking-tight mb-1">Beauty & Health</h1>
              <p className="text-lg text-white/90">Browse products in Beauty & Health</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-8">
        {/* شريط الفلاتر النشطة (Active Filters) */}
        <div className="flex justify-between items-center mb-8 border-b pb-6 border-gray-100">
          <div className="flex items-center gap-3">
            <span className="text-gray-500 text-sm font-bold flex items-center gap-1">
               <X size={16} className="text-gray-400 rotate-45" /> Active Filters:
            </span>
            <span className="bg-[#e8f5e9] text-[#13b443] px-4 py-1.5 rounded-full text-xs flex items-center gap-2 border border-[#13b443]/10 font-bold shadow-sm">
               Beauty & Health 
               <Link href="/categories">
                <X size={14} className="cursor-pointer hover:text-red-500 transition-colors" />
               </Link>
            </span>
            <Link href="/categories" className="text-xs text-gray-400 underline hover:text-[#13b443] font-bold ml-2">
               Clear all
            </Link>
          </div>
          <p className="text-gray-400 text-sm font-bold">
            Showing {products.length} products
          </p>
        </div>

        {/* شبكة المنتجات */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#13b443]"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {products.map((product: any) => (
              <div key={product._id} className="group bg-white border border-gray-100 rounded-2xl p-4 relative hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                  <button className="p-2 bg-white shadow-sm rounded-full text-gray-400 hover:text-[#13b443] border border-gray-50 transition-colors"><Heart size={16} /></button>
                  <button className="p-2 bg-white shadow-sm rounded-full text-gray-400 hover:text-[#13b443] border border-gray-50 transition-colors"><RefreshCw size={16} /></button>
                    <Link 
  href={`/product/${product._id}`} // تأكد أن المسار يطابق اسم الفولدر عندك (غالباً productdetails أو product)
  className="w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center text-gray-400 hover:text-[#0aad0a] transition-colors"
>
  <Eye size={18} />
</Link>
                </div>
              
                {/* ... باقي الكود الخاص بـ Card المنتج كما هو لضمان الوظيفة ... */}
                <div className="h-44 flex items-center justify-center mb-4 p-2 overflow-hidden">
                  <img src={product.imageCover.replace("http://", "https://")} alt={product.title} className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex flex-col flex-grow text-left">
                  <span className="text-[10px] text-[#13b443] font-bold uppercase mb-1 tracking-wider">{product.category.name}</span>
                  <h3 className="text-sm font-bold text-gray-700 line-clamp-2 h-10 mb-2 leading-snug">{product.title}</h3>
                  <div className="flex items-center gap-1 text-yellow-400 mb-4">
                    <Star size={12} fill="currentColor" />
                    <span className="text-[10px] text-gray-400 font-bold">{product.ratingsAverage}</span>
                  </div>
                  <div className="flex justify-between items-center mt-auto border-t pt-3 border-gray-50">
                    <span className="text-[#13b443] font-black text-xl">{product.price} <small className="text-[10px] text-gray-400">EGP</small></span>
                    <button 
  onClick={addToCart} // السطر ده هو اللي بيخلي الرقم يزيد
  className="bg-[#4FA74F] text-white p-2 rounded-xl hover:bg-green-700 transition-colors shadow-sm active:scale-95"
>
  <Plus size={18} strokeWidth={3} />
</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* رسالة No Products Found بنفس ستايل الصورة */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="bg-gray-100 p-6 rounded-full mb-6">
               <X size={48} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Products Found</h2>
            <p className="text-gray-500 mb-8">No products match your current filters.</p>
            <Link href="/shop" className="bg-[#13b443] text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg">
               View All Products
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}