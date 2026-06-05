"use client";
import React from "react";
import Link from "next/link";
import { 
  ArrowLeft, ArrowRight, FileText, CheckCircle, UserCheck, 
  CreditCard, Truck, RefreshCw, AlertCircle, Mail, Shield 
} from "lucide-react";

export default function TermsPage() {
  const sections = [
    { id: "1", title: "Acceptance of Terms", icon: <CheckCircle size={40} />, content: ["By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms.", "If you do not agree to these Terms, you must not access or use the Service.", "We reserve the right to modify these Terms at any time."] },
    { id: "2", title: "User Eligibility", icon: <UserCheck size={40} />, content: ["The Service is intended for users who are at least eighteen (18) years of age.", "By using the Service, you represent and warrant that you are of legal age to form a binding contract.", "If you are accessing the Service on behalf of a legal entity, you represent that you have the authority."] },
    { id: "3", title: "Account Registration", icon: <Shield size={40} />, content: ["You may be required to create an account to access certain features of the Service.", "You agree to provide accurate, current, and complete information during registration.", "You are solely responsible for maintaining the confidentiality of your credentials."] },
    { id: "4", title: "Orders and Payments", icon: <CreditCard size={40} />, content: ["All orders placed through the Service are subject to acceptance and availability.", "Prices are subject to change without notice prior to order confirmation.", "Payment must be made in full at the time of purchase through approved methods."] },
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-green-100 selection:text-green-900 overflow-x-hidden">
      
      {/* 1. Header Section - Full Width (زي الصورة بالظبط) */}
      <div className="bg-[#13b443] pt-24 pb-32 px-10 text-white relative">
        <div className="max-w-[1700px] mx-auto px-4">
          <p className="text-[13px] font-medium opacity-80 mb-6 flex gap-2 items-center">
                  <Link href="/" className="hover:underline">Home</Link> /  <span className="font-bold">Terms of Service</span>
          </p>
          <div className="flex items-center gap-8">
            {/* الديف اللي فيه أيقونة الملف */}
            <div className="bg-white/20 p-6 rounded-[30px] backdrop-blur-xl border border-white/20 shadow-2xl">
              <FileText size={48} className="drop-shadow-md" />
            </div>
            <div>
              <h1 className="text-[60px] font-black tracking-tighter leading-none mb-2">Terms of Service</h1>
              <p className="text-xl font-medium opacity-70">Last updated: February 2026</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Container الرئيسي - عريض جداً */}
      <main className="max-w-[1700px] mx-auto px-10 pb-32">
        
        {/* Important Notice - مفرود بعرض الصفحة زي الصورة */}
        <div className="bg-[#fffdf0] border border-[#ffefbc] rounded-[45px] p-12  mb-24 flex gap-10 items-center shadow-2xl shadow-orange-100/40 relative z-20">
          <div className="bg-[#f39c12] p-5 rounded-[22px] text-white shadow-xl shrink-0">
            <AlertCircle size={32} />
          </div>
          <div>
            <h4 className="font-black text-[#856404] text-2xl mb-1 uppercase tracking-tighter">Important Notice</h4>
            <p className="text-xl text-[#856404] font-medium leading-relaxed opacity-90">
              By accessing and using FreshCart, you accept and agree to be bound by the terms and provisions of this agreement. Please read these terms carefully before using our services.
            </p>
          </div>
        </div>

        {/* 3. Sections Grid - كروت ضخمة وعريضة جداً */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 mb-24">
          {sections.map((sec) => (
            <div 
              key={sec.id} 
              className="group bg-white border border-gray-100 rounded-[75px] p-20 min-h-[480px] shadow-sm hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] hover:border-green-100 hover:-translate-y-5 transition-all duration-700 cursor-default flex flex-col justify-center"
            >
               <div className="flex items-center gap-10 mb-14">
                  {/* الأيقونة اللي بتقلب أبيض عند الـ Hover */}
                  <div className="bg-green-50 p-9 rounded-[38px] text-[#13b443] group-hover:bg-[#13b443] group-hover:text-white group-hover:shadow-2xl group-hover:shadow-green-200 transition-all duration-500 shrink-0">
                    {React.cloneElement(sec.icon as React.ReactElement, { size: 45 })}
                  </div>
                  <div>
                    <span className="text-[14px] font-black text-green-600 uppercase tracking-[4px] opacity-40 mb-3 block">Article {sec.id}</span>
                    <h3 className="text-[44px] font-black text-[#1a2b3c] group-hover:text-[#13b443] transition-colors duration-300 tracking-tight leading-none">{sec.title}</h3>
                  </div>
               </div>
               
               <ul className="space-y-10">
                  {sec.content.map((item, index) => (
                    <li key={index} className="flex gap-8 text-[21px] text-gray-500 leading-relaxed items-start">
                      <span className="font-black text-[#13b443] min-w-[48px] h-12 w-12 bg-green-50 rounded-[18px] flex items-center justify-center text-[16px] group-hover:bg-green-100 transition-colors shrink-0">
                        {sec.id}.{index + 1}
                      </span>
                      <span className="group-hover:text-gray-800 transition-colors duration-300 font-medium">{item}</span>
                    </li>
                  ))}
               </ul>
            </div>
          ))}
        </div>

        {/* 4. Footer Actions - Wide Version */}
        <div className="flex flex-col lg:flex-row items-center justify-between border-t border-gray-100 pt-20 gap-10">
          <Link href="/" className="group flex items-center gap-5 text-gray-400 font-black text-xl hover:text-[#1a2b3c] transition-all bg-gray-50 px-12 py-6 rounded-[30px] hover:bg-gray-100">
            <ArrowLeft size={28} className="group-hover:-translate-x-2 transition-transform" /> Back to Home
          </Link>
          <Link href="privacy" className="group flex items-center gap-5 bg-[#13b443] text-white font-black text-2xl px-16 py-8 rounded-[35px] shadow-[0_30px_60px_-15px_rgba(19,180,67,0.4)] hover:bg-green-700 hover:scale-[1.05] active:scale-[0.95] transition-all">
            View Privacy Policy <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

      </main>
    </div>
  );
}