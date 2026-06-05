"use client";
import { createContext, useContext, useState, ReactNode } from "react";

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const addToCart = (product: any) => {
    setCartItems((prevItems) => {
      // توحيد المعرف: لو جاي _id من الـ Shop أو id من الهوم
      const productId = product._id || product.id;

      const exists = prevItems.find((item) => (item._id === productId || item.id === productId));

      if (exists) {
        return prevItems.map((item) =>
          (item._id === productId || item.id === productId)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // تنظيف المنتج وتثبيت المعرف كـ id عشان صفحة السلة تفهمه
      const cleanProduct = {
        ...product,
        id: productId, 
        quantity: 1,
        price: Number(product.price) || 0,
        imageCover: product.imageCover || product.image,
      };

      return [...prevItems, cleanProduct];
    });
  };

  // --- الدالة الجديدة المطلوبة ---
 const decreaseQuantity = (productId: string) => {
  setCartItems((prevItems) =>
    prevItems.map((item) =>
      // بنقارن بالـ id، ولو الكمية أكبر من 1 بننقص
      (item.id === productId || item._id === productId) && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
  );
};

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId && item._id !== productId));
  };

  const clearCart = () => setCartItems([]);
  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);

return (
  <CartContext.Provider value={{ cartItems, cartCount, addToCart, decreaseQuantity, removeFromCart, clearCart }}>
    {children}
  </CartContext.Provider>
);
}

export const useCart = () => useContext(CartContext);