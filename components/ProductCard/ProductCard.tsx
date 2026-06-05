"use client";
import React from "react";
import { FaStar, FaRegHeart, FaHeart, FaEye, FaExchangeAlt, FaPlus, FaMinus } from "react-icons/fa"; // أضفنا FaMinus و FaHeart
import Link from "next/link";
import { useCart } from "../../app/context/CartContext";
import { useWishlist } from "../../app/context/WishlistContext";
const ProductCard = ({ product }: any) => {
  // 1. استدعاء الدالات من الـ Context
  const { addToCart, decreaseQuantity, cartItems } = useCart();
const { toggleWishlist, wishlistItems } = useWishlist();
  // 2. معرفة إذا كان المنتج في السلة وكميته كام
  const currentItem = cartItems.find((item: any) => item.id === (product._id || product.id));
  const quantity = currentItem ? currentItem.quantity : 0;

  // الحسبة الخاصة بالـ Wishlist لمعرفة إن كان المنتج مضافاً أم لا
  const isFav = wishlistItems?.some((item: any) => item.id === (product._id || product.id) || item._id === (product._id || product.id));

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-[#4FA74F] hover:-translate-y-2 cursor-pointer">
      
      {/* 1. بادج الخصم */}
      {product.priceAfterDiscount && (
        <span className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded z-10">
          Sale
        </span>
      )}

      {/* 2. أدوات التفاعل */}
      <div className="absolute right-4 top-4 flex flex-col gap-2 z-20">
        <button 
          onClick={(e) => {
            e.stopPropagation(); // يمنع فتح صفحة المنتج عند الضغط على القلب
            toggleWishlist(product);
          }} 
          className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-colors ${
            isFav ? "bg-red-50 text-red-600 border border-red-100" : "bg-white border border-gray-100 text-gray-400 hover:bg-red-600 hover:text-white"
          }`}
        >
          {isFav ? <FaHeart size={14} /> : <FaRegHeart size={14} />}
        </button>
        <button className="w-8 h-8 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#4FA74F] hover:text-white shadow-sm transition-colors">
          <FaExchangeAlt size={14} />
        </button>
        <Link 
          href={`/product/${product._id || product.id}`} 
          className="w-8 h-8 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#4FA74F] hover:text-white shadow-sm transition-colors"
        >
          <FaEye size={18} />
        </Link>
      </div>

      {/* 3. صورة المنتج */}
      <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-[#f8f9fa] flex items-center justify-center">
        <img 
          src={product.imageCover} 
          alt={product.title} 
          className="w-full h-full object-contain mix-blend-multiply"
        />
      </div>

      {/* 4. تفاصيل المنتج */}
      <div className="space-y-1">
        <span className="text-[11px] text-[#4FA74F] font-bold uppercase">
          {product.category?.name}
        </span>
        
        <h3 className="text-sm font-bold text-gray-800 line-clamp-1">
          {product.title}
        </h3>
        
        {/* التقييم */}
        <div className="flex items-center gap-1">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={10} className={i < Math.floor(product.ratingsAverage) ? "fill-current" : "text-gray-200"} />
            ))}
          </div>
          <span className="text-[10px] text-gray-400">({product.ratingsAverage})</span>
        </div>

        {/* السعر والتحكم في الكمية */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex flex-col">
            <span className="text-gray-900 font-bold text-sm">{product.price} EGP</span>
            {product.priceAfterDiscount && (
              <span className="text-gray-400 line-through text-[10px]">{product.priceAfterDiscount} EGP</span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {/* زرار الناقص: يظهر فقط لو المنتج في السلة، ويكون disabled لو الكمية 1 */}
            {quantity > 0 && (
              <>
               <button 
onClick={(e) => { 
    e.stopPropagation(); // عشان ما يفتحش صفحة المنتج وأنت بتنقص
    // بنبعت الـ _id لو موجود، ولو مش موجود نبعت الـ id
    decreaseQuantity(product._id || product.id); 
  }}
  disabled={quantity <= 1}
  className={`p-2 rounded-xl ${quantity <= 1 ? "opacity-50 cursor-not-allowed" : "bg-red-100 text-red-600"}`}
>
  <FaMinus size={14} />
</button>
                <span className="text-sm font-bold text-gray-700 min-w-[20px] text-center">{quantity}</span>
              </>
            )}

            {/* زرار الزائد */}
            <button 
              onClick={(e) => { e.stopPropagation(); addToCart(product); }}
              className="bg-[#4FA74F] text-white p-2 rounded-xl hover:bg-green-700 transition-colors shadow-sm active:scale-95"
            >
              <FaPlus size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;