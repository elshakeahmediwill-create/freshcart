"use client";
import React from "react";
import Link from "next/link";
// استيراد الأيقونات بناءً على الصور
import { 
  Shield, Database, Eye, Lock, Share2, 
  UserCheck, Cookie, Clock, Mail, 
  ArrowLeft, ArrowRight 
} from "lucide-react";

export default function PrivacyPage() {
  const sections = [
    { 
      id: "1", 
      title: "Information We Collect", 
      icon: <Database size={40} />, 
      content: [
        "Personal Data: Name, email address, phone number, and shipping address.",
        "Payment Data: Credit card information processed securely through our payment providers.",
        "Technical Data: IP address, browser type, device information, and access times.",
        "Usage Data: Pages viewed, products browsed, and actions taken within our platform."
      ] 
    },
    { 
      id: "2", 
      title: "How We Use Your Information", 
      icon: <Eye size={40} />, 
      content: [
        "To process and fulfill your orders.",
        "To send order confirmations and shipping updates.",
        "To provide customer support and respond to inquiries.",
        "To improve our products, services, and user experience.",
        "To send promotional communications (with your consent)."
      ] 
    },
    { 
      id: "3", 
      title: "Data Protection", 
      icon: <Lock size={40} />, 
      content: [
        "We implement industry-standard encryption (SSL/TLS) for all data transfers.",
        "Payment information is processed by PCI-compliant payment providers.",
        "We conduct regular security audits and vulnerability assessments.",
        "Access to personal data is restricted to authorized personnel only."
      ] 
    },
    { 
      id: "4", 
      title: "Information Sharing", 
      icon: <Share2 size={40} />, 
      content: [
        "We do not sell, trade, or rent your personal information to third parties.",
        "We may share data with trusted service providers who assist in our operations.",
        "We may disclose information when required by law or to protect our rights."
      ] 
    },
    { 
      id: "5", 
      title: "Your Rights", 
      icon: <UserCheck size={40} />, 
      content: [
        "Access: Request a copy of your personal data.",
        "Rectification: Request correction of inaccurate data.",
        "Erasure: Request deletion of your personal data.",
        "Portability: Request your data in a portable format.",
        "Opt-out: Unsubscribe from marketing communications at any time."
      ] 
    },
    { 
      id: "6", 
      title: "Cookies", 
      icon: <Cookie size={40} />, 
      content: [
        "We use cookies to enhance your browsing experience and remember preferences.",
        "You can control cookie settings through your browser preferences.",
        "Disabling cookies may affect the functionality of certain features."
      ] 
    },
    { 
      id: "7", 
      title: "Data Retention", 
      icon: <Clock size={40} />, 
      content: [
        "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Account data is deleted within 30 days of account closure upon request."
      ] 
    },
    { 
      id: "8", 
      title: "Contact Us", 
      icon: <Mail size={40} />, 
      content: [
        "For questions about this Privacy Policy or to exercise your rights, contact our Data Protection Officer at privacy@freshcart.com"
      ] 
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-green-100">
      {/* Green Header */}
      <div className="bg-[#13b443] pt-24 pb-32 px-10 text-white relative">
        <div className="max-w-[1700px] mx-auto px-4">
          <p className="text-[13px] font-medium opacity-80 mb-6 flex gap-2">Home <span className="opacity-40">/</span> Privacy Policy</p>
          <div className="flex items-center gap-8">
            <div className="bg-white/20 p-6 rounded-[30px] backdrop-blur-xl border border-white/20">
              <Shield size={48} />
            </div>
            <div>
              <h1 className="text-[60px] font-black tracking-tighter leading-none mb-2">Privacy Policy</h1>
              <p className="text-xl font-medium opacity-70">Last updated: February 2026</p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-[1700px] mx-auto px-10 pb-32">
        {/* Your Privacy Matters Box - مع المسافة المطلوبة mt-10 */}
        <div className="bg-[#f0fff4] border border-[#c6f6d5] rounded-[45px] p-12 mt-10 mb-24 flex gap-10 items-center shadow-xl">
          <div className="bg-[#13b443] p-5 rounded-[22px] text-white shadow-lg shrink-0">
            <Shield size={32} />
          </div>
          <div>
            <h4 className="font-black text-[#1c4532] text-2xl mb-1 uppercase tracking-tighter">Your Privacy Matters</h4>
            <p className="text-xl text-[#1c4532] font-medium leading-relaxed opacity-90">
              This Privacy Policy describes how FreshCart collects, uses, and protects your personal information when you use our services. We are committed to ensuring that your privacy is protected.
            </p>
          </div>
        </div>

        {/* Grid of Articles */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 mb-24">
          {sections.map((sec) => (
            <div key={sec.id} className="group bg-white border border-gray-100 rounded-[75px] p-20 min-h-[420px] shadow-sm hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] hover:-translate-y-5 transition-all duration-700 flex flex-col justify-start">
               <div className="flex items-center gap-10 mb-14">
                  <div className="bg-green-50 p-9 rounded-[38px] text-[#13b443] group-hover:bg-[#13b443] group-hover:text-white transition-all duration-500">
                    {sec.icon}
                  </div>
                  <div>
                    <span className="text-[14px] font-black text-green-600 uppercase tracking-[4px] opacity-40 mb-3 block">Article {sec.id}</span>
                    <h3 className="text-[44px] font-black text-[#1a2b3c] tracking-tight">{sec.title}</h3>
                  </div>
               </div>
               <ul className="space-y-10">
                  {sec.content.map((item, index) => (
                    <li key={index} className="flex gap-8 text-[21px] text-gray-500 leading-relaxed items-start">
                      {/* ترقيم النقطة 1.1, 5.1 إلخ */}
                      <span className="font-black text-[#13b443] min-w-[48px] h-12 w-12 bg-green-50 rounded-[18px] flex items-center justify-center text-[16px]">
                        {sec.id}.{index + 1}
                      </span>
                      <span className={`group-hover:text-gray-800 transition-colors font-medium ${sec.id === "8" && item.includes('@') ? 'text-green-600 underline' : ''}`}>
                        {item}
                      </span>
                    </li>
                  ))}
               </ul>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col lg:flex-row items-center justify-between border-t border-gray-100 pt-20 gap-10">
          <Link href="/" className="group flex items-center gap-5 text-gray-400 font-black text-xl hover:text-[#1a2b3c] transition-all bg-gray-50 px-12 py-4 rounded-[30px]">
             <ArrowLeft size={28} /> Back to Home
          </Link>
          <Link href="/terms" className="group flex items-center gap-5 bg-[#13b443] text-white font-black text-2xl px-16 py-8 rounded-[35px] shadow-2xl hover:scale-[1.05] transition-all">
            View Terms of Service <ArrowRight size={28} />
          </Link>
        </div>
      </main>
    </div>
  );
}