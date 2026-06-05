"use client";
import React, { useState } from "react";
import { Mail, Send, CheckCircle2, Apple, Play } from "lucide-react";
// استدعاء المكون اللي أنت عملته

const FooterNewsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState(false);

  const handleSubscribe = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailRegex.test(email)) {
      setError(false);
      setIsSubscribed(true);

      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 5000); 
    } else {
      setError(true);
      setIsSubscribed(false);
    }
  };

  return (
    <section className="bg-[#f8f9fa] pt-10 pb-16">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col lg:flex-row gap-6 mb-16 items-stretch">
          
          {/* كارت الـ Newsletter */}
          <div className="flex-1 bg-white rounded-[20px] p-10 relative overflow-hidden shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="bg-[#4FA74F] p-2.5 rounded-xl text-white">
                <Mail size={22} />
              </div>
              <div>
                <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-0.5">Newsletter</span>
                <span className="text-[11px] text-gray-500 font-medium">50,000+ subscribers</span>
              </div>
            </div>

            <h2 className="text-[38px] font-bold text-[#212529] leading-[1.2] mb-4 relative z-10 max-w-2xl">
              Get the Freshest Updates <span className="text-[#4FA74F]">Delivered Free</span>
            </h2>
            <p className="text-[#5c6c75] text-lg mb-8 relative z-10 max-w-xl">Weekly recipes, seasonal offers & exclusive member perks.</p>

            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row gap-0 max-w-xl shadow-sm rounded-xl overflow-hidden bg-[#f0f3f2] border border-gray-200">
                <input 
                  type="email" 
                  value={email}
                  disabled={isSubscribed}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address" 
                  className={`flex-1 px-6 py-4 bg-transparent outline-none text-gray-700 transition-opacity ${isSubscribed ? 'opacity-50' : 'opacity-100'}`}
                />
                
                <button 
                  onClick={handleSubscribe}
                  disabled={isSubscribed}
                  className={`px-8 py-4 font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSubscribed ? "bg-[#4FA74F] text-white" : "bg-[#4FA74F] hover:bg-[#3d8b3d] text-white"
                  }`}
                >
                  {isSubscribed ? (
                    <><CheckCircle2 size={18} /> You're In!</>
                  ) : (
                    <>Subscribe <Send size={16} /></>
                  )}
                </button>
              </div>
              {error && <p className="text-[11px] text-red-500 mt-1 pl-6">Please enter a valid email.</p>}
            </div>
          </div>

          {/* كارت الموبايل */}
          <div className="w-full lg:w-[420px] bg-[#323c43] rounded-[20px] p-10 text-white flex flex-col justify-between relative overflow-hidden shadow-xl">
             <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <div className="bg-[#4FA74F] w-1.5 h-4 rounded-full"></div>
                  <span className="text-[#4FA74F] text-[10px] font-black uppercase tracking-widest">Mobile App</span>
                </div>
                <h3 className="text-[28px] font-bold mb-3 tracking-tight">Shop Faster on Our App</h3>
                <div className="space-y-3 mt-8">
                  <button className="w-full flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-all">
                    <Apple size={28} />
                    <div className="text-left">
                      <p className="text-[9px] text-gray-400 uppercase font-bold">Download on the</p>
                      <p className="text-[17px] font-bold leading-none">App Store</p>
                    </div>
                  </button>
                  <button className="w-full flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-all">
                    <Play size={28} />
                    <div className="text-left">
                      <p className="text-[9px] text-gray-400 uppercase font-bold">Get it on</p>
                      <p className="text-[17px] font-bold leading-none">Google Play</p>
                    </div>
                  </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterNewsletter;