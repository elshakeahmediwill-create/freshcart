"use client";
import { createContext, useContext, useState, ReactNode } from "react";

const WishlistContext = createContext<any>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);

  // دالة إضافة المنتج للمفضلة أو حذفه لو ضغط عليه تاني (Toggle)
  const toggleWishlist = (product: any) => {
    setWishlistItems((prevItems) => {
      const productId = product._id || product.id;
      const exists = prevItems.find((item) => item.id === productId || item._id === productId);

      if (exists) {
        // لو المنتج موجود أصلاً، احذفه (شيل القلب)
        return prevItems.filter((item) => item.id !== productId && item._id !== productId);
      } else {
        // لو مش موجود، ضيفه
        const cleanProduct = {
          ...product,
          id: productId,
          imageCover: product.imageCover || product.image,
        };
        return [...prevItems, cleanProduct];
      }
    });
  };

  // دالة للحذف المباشر (مثلاً من جوة صفحة الـ Wishlist نفسها)
  const removeFromWishlist = (productId: string) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== productId && item._id !== productId));
  };

  // --- الحسبة الذكية اللي طلبتها للـ العداد والـ +9 ---
  const wishlistCount = wishlistItems.length; // عدد المنتجات في المفضلة
  const displayCount = wishlistCount > 9 ? "9+" : wishlistCount; // الشرط بتاعك

  return (
    <WishlistContext.Provider value={{ wishlistItems, wishlistCount, displayCount, toggleWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);