"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Headset, Mail, MapPin, Phone, Clock, Send, HelpCircle, ChevronRight, CheckCircle2 } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function ContactPage() {
  // --- Logic الإرسال وتصفير الفورم ---
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    // محاكاة عملية الإرسال
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
      
      const form = e.target as HTMLFormElement;
      form.reset();

      // إخفاء الرسالة بعد 5 ثواني
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 2000);
  };

  return (
    <main className="bg-white min-h-screen pb-20 font-sans">
      {/* 1. الهيدر الأخضر */}
      <section className="bg-[#13b443] py-12 px-6 lg:px-20 text-white">
        <div className="container mx-auto">
          <nav className="text-[12px] mb-4 opacity-80 font-medium">
            <Link href="/" className="hover:underline">Home</Link> / 
            <span className="ml-1">Contact Us</span>
          </nav>
          
          <div className="flex items-center gap-4">
            <div className="bg-[#56d97d] p-3 rounded-2xl shadow-sm flex items-center justify-center w-14 h-14">
              <Headset size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-[32px] font-bold leading-tight">Contact Us</h1>
              <p className="text-[13px] text-white/90">We'd love to hear from you. Get in touch with our team.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 lg:px-20 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 2. العمود الأيسر (بيانات التواصل) */}
          <div className="lg:col-span-4 space-y-4">
            {[
              { icon: Phone, title: "Phone", sub: "Mon-Fri from 8am to 6pm", detail: "+1 (800) 123-4567" },
              { icon: Mail, title: "Email", sub: "We'll respond within 24 hours", detail: "support@freshcart.com" },
              { icon: MapPin, title: "Office", sub: "123 Commerce Street, New York, NY 10001, United States", detail: "" },
              { icon: Clock, title: "Business Hours", sub: "Monday - Friday: 8am - 6pm, Saturday: 9am - 4pm, Sunday: Closed", detail: "" }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                <div className="bg-[#f0f9f1] p-2.5 rounded-xl text-[#13b443]">
                  <item.icon size={20} />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-gray-800">{item.title}</h3>
                  <p className="text-[12px] text-gray-400 mt-0.5 leading-relaxed">{item.sub}</p>
                  {item.detail && <p className="text-[#13b443] text-[13px] font-bold mt-1">{item.detail}</p>}
                </div>
              </div>
            ))}

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-[15px] font-bold text-gray-800 mb-4">Follow Us</h3>
              <div className="flex gap-2">
                {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
                  <button key={i} className="w-9 h-9 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#13b443] hover:text-white transition-all">
                    <Icon size={16} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. العمود الأيمن (الفورم والبانر) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-8 rounded-[24px] border border-gray-50 shadow-sm relative overflow-hidden">
              
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-[#f0f9f1] p-2 rounded-lg text-[#13b443]">
                  <Headset size={18} />
                </div>
                <div>
                  <h2 className="text-[18px] font-bold text-gray-800">Send us a Message</h2>
                  <p className="text-[12px] text-gray-400">Fill out the form and we'll get back to you</p>
                </div>
              </div>

              {/* رسالة النجاح */}
              {isSuccess && (
                <div className="mb-6 p-4 bg-[#f0fdf4] border border-[#dcfce7] rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <CheckCircle2 className="text-[#13b443]" size={20} />
                  <div>
                    <p className="text-[#13b443] text-[14px] font-bold">Message sent successfully!</p>
                    <p className="text-[#13b443]/80 text-[12px]">We'll get back to you as soon as possible.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase ml-1">Full Name</label>
                  <input required type="text" placeholder="John Doe" className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] outline-none focus:border-[#13b443]" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase ml-1">Email Address</label>
                  <input required type="email" placeholder="john@example.com" className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] outline-none focus:border-[#13b443]" />
                </div>
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase ml-1">Subject</label>
                  <select required className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] outline-none focus:border-[#13b443] text-gray-500 appearance-none cursor-pointer">
                    <option value="">Select a subject</option>
                    <option>General Inquiry</option>
                    <option>Order Support</option>
                    <option>Shipping Question</option>
                    <option>Returns & Refunds</option>
                    <option>Product Information</option>
                    <option>Feedback & Suggestions</option>
                    <option>other</option>
                  </select>
                </div>
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase ml-1">Message</label>
                  <textarea required rows={4} placeholder="How can we help you?" className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] outline-none focus:border-[#13b443] resize-none"></textarea>
                </div>
                
                <button 
                  disabled={isSending}
                  type="submit" 
                  className={`bg-[#13b443] text-white px-6 py-3 rounded-lg font-bold text-[14px] flex items-center gap-2 w-fit transition-all ${isSending ? 'opacity-70 cursor-not-allowed' : 'hover:bg-green-700 active:scale-95'}`}
                >
                  {isSending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* البانر المعدل - Visit Help Center */}
            <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-2xl p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white p-3 rounded-xl shadow-sm text-[#13b443]">
                  <HelpCircle size={24} />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-gray-800">Looking for quick answers?</h3>
                  <p className="text-[12px] text-gray-500">Check out our Help Center for frequently asked questions about orders, shipping, and more.</p>
                </div>
              </div>
              
           <Link 
                href="/help" 
                className="text-[#13b443] text-[13px] font-bold flex items-center gap-1 hover:underline whitespace-nowrap"
              >
                Visit Help Center <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}