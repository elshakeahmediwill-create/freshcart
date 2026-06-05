"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Star, Plus, Heart, Eye, RefreshCw, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext"; // استدعاء سياق المفضلة
export default function ElectronicsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  // 1. ضيف State لصورة القسم عشان نجيبها ديناميكياً
  const [categoryImage, setCategoryImage] = useState("");

  async function getElectronics(page = 1) {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=50`);
      
      const filtered = data.data.filter(
        (product: any) => product.category.name === "Electronics"
      );

      // 2. الحركة الذكية: خد رابط الصورة من أول منتج في قسم الإلكترونيات
      if (filtered.length > 0) {
        setCategoryImage(filtered[0].category.image);
      }

      setProducts(filtered);
      setCurrentPage(page);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getElectronics();
  }, []);
// 2. جوه المكون (Component) قبل الـ return
const { addToCart } = useCart();
const { toggleWishlist, wishlistItems } = useWishlist(); // سحب الفانكشن والداتا للمفضلة
  return (
    <main className="bg-gray-50 min-h-screen pb-20">
      {/* 1. الهيدر الأخضر المعدل بالصورة */}
      <section className="bg-[#0daf28] py-10 px-6 lg:px-20 text-white">
        <div className="container mx-auto">
          <nav className="text-xs mb-3 opacity-80 font-medium">
            <Link href="/" className="hover:underline">Home</Link> / 
            <Link href="/categories" className="hover:underline mx-1">Categories</Link> / 
            <span className="font-bold">Electronics</span>
          </nav>
          <div className="flex items-center gap-4">
            {/* وعاء الصورة الأبيض زي اللي عملناه في صفحة الـ Women's Fashion */}
            <div className="bg-white p-1 rounded-xl shadow-md overflow-hidden w-20 h-20 flex items-center justify-center border-2 border-white/20">
              <img 
                src={categoryImage || "https://ecommerce.routemisr.com/adverts/1680523261623.jpeg"} 
                alt="Electronics" 
                className="w-full h-full object-contain"
                crossOrigin="anonymous"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Electronics</h1>
              <p className="text-sm text-white/90">Browse products in Electronics</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
             <span className="bg-[#e8f5e9] text-[#4FA74F] px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-[#4FA74F]/20 font-bold">
               Electronics 
               {/* ربط علامة الـ X بصفحة الأقسام */}
               <Link href="/categories">
                <X size={14} className="cursor-pointer hover:text-red-500 transition-colors" />
               </Link>
             </span>
             {/* إضافة زرار Clear All بجانب الفلتر */}
             <Link href="/categories" className="text-[10px] text-gray-400 underline hover:text-red-500 font-bold uppercase tracking-tighter ml-1">
               Clear All
             </Link>
          </div>
          <p className="text-gray-500 text-sm font-medium tracking-tight">Showing {products.length} products</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product: any) => {
            // الحسبة الديناميكية لمعرفة إذا كان منتج الإلكترونيات الحالي مضاف للمفضلة أم لا
            const isFav = wishlistItems?.some((item: any) => item.id === product._id || item._id === product._id);
            
            return (
              <div key={product._id} className="group bg-white border border-gray-100 rounded-2xl p-4 relative hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                  <button 
                    onClick={() => toggleWishlist(product)}
                    className={`p-2 shadow-sm rounded-full transition-colors border ${
                      isFav ? "bg-red-50 text-red-600 border-red-100" : "bg-white text-gray-400 hover:text-[#a74f4f] border-gray-50"
                    }`}
                  >
                    <Heart size={16} fill={isFav ? "currentColor" : "none"} />
                  </button>
                  <button className="p-2 bg-white shadow-sm rounded-full text-gray-400 hover:text-[#4FA74F] border border-gray-50"><RefreshCw size={16} /></button>
                
                       <Link 
    href={`/product/${product._id}`} // تأكد أن المسار يطابق اسم الفولدر عندك (غالباً productdetails أو product)
    className="w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center text-gray-400 hover:text-[#0aad0a] transition-colors"
  >
    <Eye size={18} />
  </Link>

                </div>
                

                <div className="h-44 flex items-center justify-center mb-4 p-2">
                  <img 
                    src={product.imageCover.replace("http://", "https://")} 
                    alt={product.title} 
                    className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>

                <div className="flex flex-col flex-grow">
                  <span className="text-[10px] text-[#4FA74F] font-bold uppercase mb-1">{product.category.name}</span>
                  <h3 className="text-sm font-bold text-gray-700 line-clamp-2 h-10 mb-2 leading-snug">{product.title}</h3>
                  
                  <div className="flex items-center gap-1 text-yellow-400 mb-4">
                    <Star size={12} fill="currentColor" />
                    <span className="text-[10px] text-gray-400">{product.ratingsAverage}</span>
                  </div>

                  <div className="flex justify-between items-center mt-auto border-t pt-3 border-gray-50">
                    <span className="text-[#4FA74F] font-extrabold text-lg">{product.price} <small className="text-[10px]">EGP</small></span>
     <button 
  onClick={() => addToCart(product)}
  className="bg-[#4FA74F] text-white p-2 rounded-xl hover:bg-green-700 transition-colors shadow-sm active:scale-95"
  >
    <Plus size={18} strokeWidth={3} />
  </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center items-center gap-4 mt-16">
          <button 
            onClick={() => getElectronics(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-4 py-2 border rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-bold text-gray-500"
          >
            <ChevronLeft size={18} /> Previous
          </button>
          
          <span className="font-bold text-[#4FA74F] bg-green-50 w-10 h-10 flex items-center justify-center rounded-xl border border-green-100 shadow-sm">
            {currentPage}
          </span>

          <button 
            onClick={() => getElectronics(currentPage + 1)}
            className="flex items-center gap-1 px-4 py-2 border rounded-xl hover:bg-gray-50 transition-all font-bold text-gray-500"
          >
            Next <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </main>
  );
}