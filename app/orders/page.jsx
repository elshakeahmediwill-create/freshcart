"use client"; // ضروري جداً لأنك بتستخدم مكتبات فيها تفاعل أو أيقونات

import React from 'react';
import { Package, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function OrdersPage() {
  // هنا مش محتاجين نختبر activeTab لأننا جوه صفحة الـ orders فعلاً
  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-50 p-10 min-h-[550px] flex flex-col animate-in fade-in duration-500">
      {/* 1. Header */}
      <div className="mb-12">
        <h2 className="text-[22px] font-black text-[#1a2b3c]">My Orders</h2>
        <p className="text-gray-400 text-[14px] font-medium mt-1">
          Track and manage your previous orders
        </p>
      </div>

      {/* 2. Empty State (مطابق للصورة اللي بعتها) */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-10">
        <div className="w-24 h-24 bg-[#f8f9fa] rounded-[2rem] flex items-center justify-center mb-6">
          <Package size={42} className="text-[#adb5bd]" strokeWidth={1.5} />
        </div>
        
        <h3 className="text-[20px] font-black text-[#1a2b3c] mb-2">
          No orders yet
        </h3>
        <p className="text-gray-400 text-[15px] font-medium text-center max-w-[280px] mb-8 leading-relaxed">
          When you place orders, they'll appear here so you can track them.
        </p>

        {/* زرار Shopping */}
        <Link href="/">
          <button className="bg-[#13b443] text-white px-10 py-4 rounded-2xl font-bold text-[16px] flex items-center gap-3 shadow-lg shadow-green-100 hover:bg-[#11a03c] transition-all active:scale-95">
            <ShoppingBag size={20} strokeWidth={2.5} />
            Start Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}