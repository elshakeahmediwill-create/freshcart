"use client";
import React from "react";
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, CreditCard, Truck, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartPage() {
 
  const { cartItems, cartCount, addToCart, decreaseQuantity, removeFromCart, clearCart } = useCart();

  // حساب المجموع الفرعي
  const subtotal = cartItems.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);

  // 1. تصميم السلة فارغة (زي ما هو بدون تغيير)
  if (cartCount === 0) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
        <div className="w-28 h-28 bg-[#f8f9fa] rounded-full flex items-center justify-center mb-8">
          <ShoppingBag size={48} className="text-[#d1d5db]" strokeWidth={1.2} />
        </div>
        <h2 className="text-2xl font-black text-[#1a1c2e] mb-3">Your cart is empty</h2>
        <p className="text-gray-400 text-sm max-w-[350px] mb-10 leading-relaxed">
          Looks like you haven't added anything to your cart yet. <br />
          Start exploring our products!
        </p>
        <Link href="/" className="bg-[#1a9046] hover:bg-[#157338] text-white px-10 py-4 rounded-xl font-bold flex items-center gap-3 transition-all active:scale-95 shadow-lg shadow-green-100/50 mb-16">
          Start Shopping <ArrowRight size={20} />
        </Link>
        <div className="w-full max-w-md pt-10 border-t border-gray-50">
          <p className="text-[11px] font-black text-[#cbd5e1] uppercase tracking-[3px] mb-8">Popular Categories</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Electronics', 'Fashion', 'Home', 'Beauty'].map((cat) => (
              <span key={cat} className="px-6 py-2.5 bg-[#f8f9fa] text-[#64748b] text-[12px] font-bold rounded-full border border-transparent italic">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </main>
    );
  }
return (
    <main className="min-h-screen bg-[#f9fbf9] py-12 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <p className="text-gray-600 mb-6">
          You have <span className="text-[#1a9046] font-bold">{cartCount} items</span> in your cart
        </p>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* العمود الأيسر: قائمة المنتجات */}
          <div className="flex-1">
            <div className="space-y-4">
   {cartItems.map((item: any, index: number) => {
  // ✅ السطر السحري: توحيد المعرف (ID) لضمان عدم حدوث Error
  const itemId = item._id || item.id || `item-${index}`;

  return (
    <div 
      key={itemId} 
      className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-6 relative min-h-[180px]"
    >
      {/* صورة المنتج */}
      <div className="w-32 h-32 bg-[#f8f9fa] rounded-2xl p-2 flex-shrink-0">
        <img 
          src={item.imageCover || item.image || '/placeholder.png'} 
          alt={item.title} 
          className="w-full h-full object-contain" 
        />
      </div>

      {/* تفاصيل المنتج */}
      <div className="flex-1 text-center sm:text-left pr-0 sm:pr-[160px]">
        <h3 className="text-lg font-bold text-[#1a1c2e] mb-1 line-clamp-1">
          {item.title}
        </h3>
        <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
          <span className="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-bold uppercase">
            {item.category?.name || 'Category'}
          </span>
          <span className="text-[10px] text-gray-400 font-medium tracking-tight italic">
            {/* ✅ حماية الـ Slice باستخدام المعرف الموحد */}
            SKU: {String(itemId).slice(0, 6)}
          </span>
        </div>

        <p className="text-[#1a9046] font-black text-xl mb-4">{item.price} EGP</p>

        <div className="flex items-center justify-center sm:justify-start gap-0 border border-gray-100 w-fit rounded-lg overflow-hidden bg-white mx-auto sm:mx-0">
       <button 
  className={`p-2 border-r transition-colors ${
    item.quantity <= 1 
    ? "text-gray-200 cursor-not-allowed" // لو الكمية 1 الزرار يبقى باهت
    : "text-gray-400 hover:bg-gray-50"
  }`}
  onClick={() => decreaseQuantity(item.id)} // بنبعت الـ id بتاع المنتج للدالة
  disabled={item.quantity <= 1} // بيوقف الزرار لو الكمية 1
>
  <Minus size={16} />
</button>
          <span className="px-5 py-2 font-bold text-[#1a1c2e]">{item.quantity}</span>
          <button 
            onClick={() => addToCart(item)} 
            className="p-2 bg-[#1a9046] text-white hover:bg-green-700 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* زرار الحذف والـ Total */}
      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4 sm:absolute top-6 right-6 w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-0">
        <button
          onClick={() => removeFromCart(itemId)}
          className="text-red-400 hover:text-red-600 p-2 bg-red-50 rounded-lg transition-colors order-2 sm:order-1"
        >
          <Trash2 size={20} />
        </button>

        <div className="text-left sm:text-right order-1 sm:order-2 sm:mt-2">
          <p className="text-[10px] text-gray-300 uppercase font-bold italic mb-0 hidden sm:block leading-none">Total</p>
          <p className="text-xl font-black text-[#1a1c2e] leading-tight">
            {(Number(item.price) || 0) * (Number(item.quantity) || 1)} EGP
          </p>
        </div>
      </div>
    </div>
  );
})}
            </div>

            {/* صف الأزرار (Continue & Clear) - موجود هنا تحت المنتجات مباشرة */}
            <div className="flex justify-between items-center pt-8 px-2">
              <Link href="/" className="text-[#1a9046] font-bold flex items-center gap-2 hover:underline">
                ← Continue Shopping
              </Link>
              <button onClick={clearCart} className="text-gray-400 font-bold flex items-center gap-2 hover:text-red-500 transition-colors">
                <Trash2 size={18} /> Clear all items
              </button>
            </div>
          </div>

          {/* العمود الأيمن: ملخص الطلب */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-white rounded-[32px] overflow-hidden shadow-xl border border-gray-50">
              <div className="bg-[#1a9046] p-6 flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg text-white">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg leading-none">Order Summary</h3>
                  <p className="text-white/70 text-xs mt-1">{cartCount} items</p>
                </div>
              </div>

              <div className="p-8">
                <div className="bg-[#f0f9f1] p-4 rounded-2xl flex items-center gap-4 mb-8">
                  <div className="bg-white p-2 rounded-xl text-[#1a9046]">
                    <Truck size={20} />
                  </div>
                  <p className="text-sm font-bold text-[#1a9046]">Free Shipping!</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Subtotal</span>
                    <span className="text-[#1a1c2e]">{subtotal} EGP</span>
                  </div>
                  <div className="flex justify-between text-[#1a9046] font-bold">
                    <span>Shipping</span>
                    <span>FREE</span>
                  </div>
                  <div className="h-[1px] bg-dashed border-t border-dashed border-gray-200 my-2"></div>
                  <div className="flex justify-between items-end pt-2">
                    <span className="text-xl font-bold text-[#1a1c2e]">Total</span>
                    <p className="text-3xl font-black text-[#1a1c2e]">{subtotal} EGP</p>
                  </div>
                </div>

               <Link href="/checkout" className="w-full">
  <button className="w-full bg-[#1a9046] hover:bg-[#157338] text-white py-5 rounded-[20px] font-black flex items-center justify-center gap-3 shadow-lg transition-all mb-6">
    <ShieldCheck size={20} /> Secure Checkout
  </button>
</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )}; <ShieldCheck size={20} />