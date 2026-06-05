"use client";

import { useWishlist } from ".././app/context/WishlistContext"; 
import { Heart } from "lucide-react"; 
import { useEffect, useState } from "react";

export default function WishlistBadge() {
  // بنسحب المصفوفة والعدد المظبوط من الـ Context
  const { displayCount, wishlistCount, wishlistItems } = useWishlist();
  const [hasToken, setHasToken] = useState(false);

  // للتأكد إن المستخدم مسجل دخول قبل ما نعرض العداد الأحمر
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setHasToken(!!token);
  }, []);

  return (
    <button className="relative text-gray-600 hover:text-red-600 transition-colors p-2 flex items-center justify-center">
      {/* أيقونة القلب: لو في منتجات في المفضلة هتتلون أحمر في الـ Navbar */}
      <Heart size={22} className={hasToken && wishlistCount > 0 ? "fill-red-600 text-red-600" : ""} />
      
      {/* العداد الأحمر الذكي: بيقرأ طول المصفوفة (wishlistItems) مباشرة عشان يعد فوراً */}
      {hasToken && wishlistCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-md animate-bounce-once">
          {displayCount}
        </span>
      )}
    </button>
  );
}