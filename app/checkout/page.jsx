"use client";
import React from "react";
import {  useState } from 'react'

import { useCart } from "../context/CartContext";
import Link from "next/link";
// شيلنا City وحطينا مكانها Building2 و Landmark
import { 
    Shield, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Home, 
  Building2, 
  ArrowLeft, 
  ShoppingBag, 
  Truck, 
  RotateCcw,
  CreditCard, // ضفنا دي
  Banknote,   // ضفنا دي عشان الكاش
  Check       // ضفنا دي عشان علامة الصح
} from "lucide-react";
const CheckoutPage = () => {
  const { cartItems, cartCount } = useCart();
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
const [paymentMethod, setPaymentMethod] = useState("online"); // افتراضياً هنخليها أونلاين
  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-10">
      <div className="container mx-auto px-4 py-6">
        
        {/* Breadcrumbs & Header */}
        <nav className="text-xs text-gray-400 mb-4 flex gap-2">
          <span>Home</span> / <span>Cart</span> / <span className="text-gray-800">Checkout</span>
        </nav>

        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-[#1a9046] p-2 rounded-lg text-white">
                <ShoppingBag size={24} />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Complete Your Order</h1>
            </div>
            <p className="text-sm text-gray-500">Review your items and complete your purchase</p>
          </div>
          <Link href="/cart" className="text-[#1a9046] flex items-center gap-1 text-sm font-bold hover:underline">
            <ArrowLeft size={16} /> Back to Cart
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* الجزء الأيسر: Shipping Address */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="bg-[#1a9046] p-4 flex items-center gap-2 text-white">
                <Home size={20} />
                <h2 className="font-bold">Shipping Address</h2>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Alert Box */}
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3 text-blue-700 text-sm">
                  <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center shrink-0">i</div>
                  <p><strong>Delivery Information:</strong> Please ensure your address is accurate for smooth delivery.</p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {/* City */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">City *</label>
                    <div className="relative">
                      <Building2  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input type="text" placeholder="e.g. Cairo, Alexandria, Giza" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#1a9046] outline-none transition-all" />
                    </div>
                  </div>

                  {/* Street Address */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Street Address *</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-4 text-gray-400" size={18} />
                      <textarea rows={3} placeholder="Street name, building number, floor, apartment..." className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#1a9046] outline-none transition-all resize-none"></textarea>
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input type="text" placeholder="01xxxxxxxxx" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#1a9046] outline-none transition-all" />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-gray-400">Egyptian numbers only</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>





{/* قسم طرق الدفع - يوضع تحت قسم العنوان */}
<div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mt-6">
  <div className="bg-[#1a9046] p-4 flex items-center gap-2 text-white">
    <CreditCard size={20} />
    <h2 className="font-bold">Payment Method</h2>
  </div>

  <div className="p-6 space-y-4">
    <p className="text-sm text-gray-500 mb-2">Choose how you'd like to pay</p>

    {/* الخيار الأول: الدفع عند الاستلام */}
    <div 
      onClick={() => setPaymentMethod("cash")} 
      className={`group relative border-2 rounded-2xl p-5 flex items-center justify-between transition-all cursor-pointer ${
        paymentMethod === "cash" 
        ? "border-[#1a9046] bg-green-50/10" 
        : "border-gray-100 bg-gray-50/30 hover:border-gray-200"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl shadow-sm transition-colors ${
          paymentMethod === "cash" ? "bg-[#1a9046] text-white" : "bg-white text-gray-400"
        }`}>
          <Banknote size={24} />
        </div>
        <div>
          <h3 className={`font-bold text-sm ${paymentMethod === "cash" ? "text-[#1a9046]" : "text-gray-800"}`}>
            Cash on Delivery
          </h3>
          <p className="text-xs text-gray-400">Pay when your order arrives at your doorstep</p>
        </div>
      </div>
      <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
        paymentMethod === "cash" ? "bg-[#1a9046] text-white" : "border-2 border-gray-200"
      }`}>
        {paymentMethod === "cash" && <Check size={14} strokeWidth={4} />}
      </div>
    </div>

    {/* الخيار الثاني: الدفع أونلاين */}
    <div 
      onClick={() => setPaymentMethod("online")} 
      className={`group relative border-2 rounded-2xl p-5 flex items-center justify-between transition-all cursor-pointer ${
        paymentMethod === "online" 
        ? "border-[#1a9046] bg-green-50/10" 
        : "border-gray-100 bg-gray-50/30 hover:border-gray-200"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl shadow-md transition-all ${
          paymentMethod === "online" 
          ? "bg-gradient-to-br from-emerald-400 to-blue-500 text-white" 
          : "bg-white text-gray-400"
        }`}>
          <CreditCard size={24} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className={`font-bold text-sm ${paymentMethod === "online" ? "text-[#1a9046]" : "text-gray-800"}`}>
              Pay Online
            </h3>
            {paymentMethod === "online" && (
              <span className="bg-[#1a9046] text-white text-[8px] px-1.5 py-0.5 rounded uppercase font-black">Stripe</span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">Secure payment with Credit/Debit Card via Stripe</p>
          <div className="flex gap-2 mt-2">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-2 opacity-60" alt="Visa" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-3 opacity-60" alt="Mastercard" />
          </div>
        </div>
      </div>
      <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
        paymentMethod === "online" ? "bg-[#1a9046] text-white" : "border-2 border-gray-200"
      }`}>
        {paymentMethod === "online" && <Check size={14} strokeWidth={4} />}
      </div>
    </div>

    {/* ملاحظة التشفير */}
    <div className="bg-emerald-50/50 p-4 rounded-xl flex items-center gap-3 border border-emerald-100/50">
      <ShieldCheck className="text-emerald-600" size={18} />
      <div>
        <h4 className="text-[11px] font-bold text-emerald-800">Secure & Encrypted</h4>
        <p className="text-[10px] text-emerald-600/70">Your payment info is protected with 256-bit SSL encryption</p>
      </div>
    </div>
  </div>
</div>





          </div>
          {/* الجزء الأيمن: Order Summary */}
          <div className="lg:sticky lg:top-6 space-y-6 self-start">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="bg-[#1a9046] p-4 flex justify-between items-center text-white">
                <div className="flex items-center gap-2 font-bold">
                  <ShoppingBag size={20} /> Order Summary
                </div>
                <span className="text-xs bg-white/20 px-2 py-1 rounded">{cartCount} Items</span>
              </div>

              <div className="p-6">
                {/* Product List */}
                <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center border-b border-gray-50 pb-4 last:border-0">
                      <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center p-2">
                        <img src={item.imageCover} alt="" className="max-w-full max-h-full object-contain" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-gray-800 line-clamp-1">{item.title}</h4>
                        <p className="text-[10px] text-gray-400">{item.quantity} × {item.price} EGP</p>
                      </div>
                      <div className="font-bold text-xs text-gray-800">{(item.price * item.quantity).toLocaleString()}</div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3 border-t pt-4">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span className="font-bold">{subtotal.toLocaleString()} EGP</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Shipping</span>
                    <span className="text-[#1a9046] font-bold uppercase">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-black text-gray-800 pt-2">
                    <span>Total</span>
                    <span className="text-[#1a9046]">{subtotal.toLocaleString()} EGP</span>
                  </div>
                </div>

               {/* الزرار الديناميكي الذي يتغير حسب طريقة الدفع */}
<button className="w-full bg-[#1a9046] text-white py-4 rounded-xl font-bold mt-6 flex items-center justify-center gap-2 hover:bg-[#157338] transition-all shadow-lg active:scale-95">
  {paymentMethod === "cash" ? (
    <>
      <ShoppingBag size={18} />
      <span>Place Order</span>
    </>
  ) : (
    <>
      <Shield size={18} />
      <span>Proceed to Payment</span>
    </>
  )}
</button>
                {/* Trust Badges */}
                <div className="flex justify-between mt-6 pt-6 border-t border-gray-50">
                   <div className="flex flex-col items-center gap-1">
                      <ShieldCheck className="text-green-500" size={16} />
                      <span className="text-[9px] font-bold text-gray-500 uppercase">Secure</span>
                   </div>
                   <div className="flex flex-col items-center gap-1">
                      <Truck className="text-blue-500" size={16} />
                      <span className="text-[9px] font-bold text-gray-500 uppercase">Fast Delivery</span>
                   </div>
                   <div className="flex flex-col items-center gap-1">
                      <RotateCcw className="text-orange-500" size={16} />
                      <span className="text-[9px] font-bold text-gray-500 uppercase">Easy Returns</span>
                   </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;