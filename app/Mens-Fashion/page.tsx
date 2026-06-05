"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Star, Plus, Heart, Eye, RefreshCw, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext"; // استدعاء سياق المفضلة
export default function MensFashionPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryImage, setCategoryImage] = useState("");

  async function getMensFashion(page = 1) {
    setIsLoading(true);
    try {
      // زودنا الـ limit لـ 100 عشان نضمن إننا نسحب كمية أكبر ونلاقي "Men's Fashion" وسطهم
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=100`);
      
      const filtered = data.data.filter(
        (product: any) => product.category.name === "Men's Fashion"
      );

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
    getMensFashion();
  }, []);
const { addToCart } = useCart();
const { toggleWishlist, wishlistItems } = useWishlist(); // سحب الفانكشن والداتا للمفضلة
  return (
    <main className="bg-gray-50 min-h-screen pb-20">
      <section className="bg-[#0daf28] py-10 px-6 lg:px-20 text-white">
        <div className="container mx-auto">
          <nav className="text-[10px] mb-4 opacity-90 font-medium uppercase tracking-widest">
            <Link href="/" className="hover:underline">Home</Link> / 
            <Link href="/categories" className="hover:underline mx-1">Categories</Link> / 
            <span className="font-bold">Men's Fashion</span>
          </nav>
          
          <div className="flex items-center gap-4">
            <div className="bg-white p-1 rounded-xl shadow-md overflow-hidden w-20 h-20 flex items-center justify-center border-2 border-white/20">
              <img 
                src={categoryImage || "https://ecommerce.routemisr.com/adverts/1680523261623.jpeg"} 
                alt="Men's Fashion" 
                className="w-full h-full object-contain"
                crossOrigin="anonymous"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Men's Fashion</h1>
              <p className="text-sm text-white/90 font-medium">Explore the latest in Men's clothing</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm font-semibold mr-2 uppercase tracking-tighter">Active Filters:</span>
            <span className="bg-[#e8f5e9] text-[#4FA74F] px-4 py-1.5 rounded-full text-xs flex items-center gap-2 border border-[#4FA74F]/10 font-bold shadow-sm">
               Men's Fashion 
               <Link href="/categories">
                <X size={14} className="cursor-pointer hover:text-red-500 transition-colors" />
               </Link>
            </span>
            <Link href="/categories" className="text-[10px] text-gray-400 underline hover:text-red-500 font-bold uppercase tracking-tighter ml-2">
               Clear All
            </Link>
          </div>
          <p className="text-gray-400 text-sm font-bold uppercase tracking-tight">
            {isLoading ? "Loading..." : `Showing ${products.length} products`}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4FA74F]"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {products.map((product: any) => {
              // الحسبة الديناميكية لمعرفة إذا كان منتج ملابس الرجال الحالي مضاف للمفضلة أم لا
              const isFav = wishlistItems?.some((item: any) => item.id === product._id || item._id === product._id);

              return (
                <div key={product._id} className="group bg-white border border-gray-100 rounded-2xl p-4 relative hover:shadow-xl transition-all duration-300 flex flex-col">
                  <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                    <button 
                      onClick={() => toggleWishlist(product)}
                      className={`p-2 shadow-sm rounded-full transition-colors border ${
                        isFav ? "bg-red-50 text-red-600 border-red-100" : "bg-white text-gray-400 hover:text-[#4FA74F] border-gray-50"
                      }`}
                    >
                      <Heart size={16} fill={isFav ? "currentColor" : "none"} />
                    </button>
                    <button className="p-2 bg-white shadow-sm rounded-full text-gray-400 hover:text-[#4FA74F] border border-gray-50 transition-colors"><RefreshCw size={16} /></button>
                         <Link 
      href={`/product/${product._id}`} // تأكد أن المسار يطابق اسم الفولدر عندك (غالباً productdetails أو product)
      className="w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center text-gray-400 hover:text-[#0aad0a] transition-colors"
    >
      <Eye size={18} />
    </Link>
                  </div>
                  

                  <div className="h-44 flex items-center justify-center mb-4 p-2 overflow-hidden">
                    <img 
                      src={product.imageCover.replace("http://", "https://")} 
                      alt={product.title} 
                      className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>

                  <div className="flex flex-col flex-grow text-left">
                    <span className="text-[10px] text-[#4FA74F] font-bold uppercase mb-1 tracking-wider">{product.category.name}</span>
                    <h3 className="text-sm font-bold text-gray-700 line-clamp-2 h-10 mb-2 leading-snug">{product.title}</h3>
                    
                    <div className="flex items-center gap-1 text-yellow-400 mb-4">
                      <Star size={12} fill="currentColor" />
                      <span className="text-[10px] text-gray-400 font-bold">{product.ratingsAverage}</span>
                    </div>

                    <div className="flex justify-between items-center mt-auto border-t pt-3 border-gray-50">
                      <span className="text-[#4FA74F] font-black text-xl">{product.price} <small className="text-[10px] text-gray-400">EGP</small></span>
       <button 
        onClick={()=>addToCart(product)} // السطر ده هو اللي بيخلي الرقم يزيد
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
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
             <p className="text-gray-400 font-bold">No products found in Men's Fashion on this page.</p>
             <button onClick={() => getMensFashion(currentPage + 1)} className="mt-4 text-[#4FA74F] underline font-bold">Try next page</button>
          </div>
        )}

        <div className="flex justify-center items-center gap-3 mt-16">
          <button 
            onClick={() => getMensFashion(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-5 py-2.5 border rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed text-sm font-bold text-gray-500 transition-all shadow-sm"
          >
            <ChevronLeft size={18} /> Previous
          </button>
          
          <span className="font-black text-[#4FA74F] bg-green-50 w-12 h-12 flex items-center justify-center rounded-xl border border-green-100 shadow-inner">
            {currentPage}
          </span>

          <button 
            onClick={() => getMensFashion(currentPage + 1)}
            className="flex items-center gap-2 px-5 py-2.5 border rounded-xl hover:bg-gray-50 text-sm font-bold text-gray-500 transition-all shadow-sm"
          >
            Next <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </main>
  );
}