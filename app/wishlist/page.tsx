"use client";
import React from "react";
import Link from "next/link";
import { Heart, ArrowRight, Star, Trash2, ShoppingCart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function WishlistPage() {
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <main className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        
        {/* العناوين الرئيسية للصفحة */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">My Wishlist</h1>
          <p className="text-sm text-gray-500">Manage your favorite items and find them easily</p>
        </div>

        {/* حالة أن المفضلة فارغة - تصميم مطابق تماماً للصورة المرفقة image_7dd3e3.png */}
        {!wishlistItems || wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center mt-20 max-w-sm mx-auto">
            {/* مربع الأيقونة العلوي الرمادي الفاتح */}
            <div className="bg-[#f8fafc] border border-gray-100 p-5 rounded-2xl mb-6 shadow-sm">
              <Heart size={32} className="text-slate-400" />
            </div>

            {/* نصوص الحالة الفارغة */}
            <h2 className="text-xl font-bold text-[#0f172a] mb-2">Your wishlist is empty</h2>
            <p className="text-sm text-slate-500 leading-relaxed mb-8">
              Browse products and save your favorites here. Sign in to sync your wishlist across devices.
            </p>

            {/* أزرار التحكم والروابط */}
            <div className="w-full space-y-3">
              <Link 
                href="/categories" 
                className="w-full bg-[#10b981] hover:bg-[#059669] text-white py-3.5 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-sm shadow-[#10b981]/20 active:scale-[0.99]"
              >
                Browse Products <ArrowRight size={18} />
              </Link>
              
              <Link 
                href="/login" 
                className="w-full bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-slate-700 py-3.5 px-6 rounded-xl font-semibold transition-all flex items-center justify-center shadow-sm active:scale-[0.99]"
              >
                Sign In
              </Link>
            </div>
          </div>
        ) : (
          
          /* في حالة وجود منتجات في المفضلة، يتم عرض الكروت بشكل منظم واحترافي */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((product: any) => (
              <div 
                key={product._id} 
                className="group bg-white border border-gray-100 rounded-2xl p-4 relative hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* زر الحذف السريع من المفضلة */}
                <div className="absolute top-4 right-4 z-10">
                  <button 
                    onClick={() => toggleWishlist(product)}
                    className="p-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-full transition-colors border border-red-100/50"
                    title="Remove from wishlist"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* صورة المنتج */}
                <div className="h-44 flex items-center justify-center mb-4 p-2 overflow-hidden">
                  <img 
                    src={product.imageCover?.replace("http://", "https://")} 
                    alt={product.title} 
                    className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>

                {/* تفاصيل المنتج */}
                <div className="flex flex-col flex-grow text-left">
                  <span className="text-[10px] text-[#4FA74F] font-bold uppercase mb-1 tracking-wider">
                    {product.category?.name}
                  </span>
                  <Link href={`/product/${product._id}`}>
                    <h3 className="text-sm font-bold text-gray-700 line-clamp-2 h-10 mb-2 leading-snug hover:text-[#4FA74F] transition-colors">
                      {product.title}
                    </h3>
                  </Link>
                  
                  {/* التقييم */}
                  <div className="flex items-center gap-1 text-yellow-400 mb-4">
                    <Star size={12} fill="currentColor" />
                    <span className="text-[10px] text-gray-400 font-bold">{product.ratingsAverage}</span>
                  </div>

                  {/* السعر وزر الإضافة للعربة */}
                  <div className="flex justify-between items-center mt-auto border-t pt-3 border-gray-50">
                    <span className="text-[#4FA74F] font-black text-xl">
                      {product.price} <small className="text-[10px] text-gray-400">EGP</small>
                    </span>
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-[#4FA74F] text-white py-2 px-3 rounded-xl hover:bg-green-700 transition-colors shadow-sm active:scale-95 text-xs font-bold flex items-center gap-1.5"
                    >
                      <ShoppingCart size={14} /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}