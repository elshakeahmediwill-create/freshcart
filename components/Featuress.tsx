"use client";
import React from "react";
import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";

const Featuress = () => {
  const footerFeatures = [
    { icon: <Truck size={24} />, title: "Free Shipping", desc: "On orders over 500 EGP" },
    { icon: <RotateCcw size={24} />, title: "Easy Returns", desc: "14-day return policy" },
    { icon: <ShieldCheck size={24} />, title: "Secure Payment", desc: "100% secure checkout" },
    { icon: <Headphones size={24} />, title: "24/7 Support", desc: "Contact us anytime" },
  ];

  return (
    <section className="bg-white py-10 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerFeatures.map((feature, index) => (
            <div key={index} className="flex items-center gap-4 group cursor-default">
              <div className="w-14 h-14 rounded-full bg-[#f0f3f2] text-[#4FA74F] flex items-center justify-center transition-transform group-hover:scale-110">
                {feature.icon}
              </div>
              <div className="flex flex-col">
                <h4 className="text-[16px] font-bold text-[#212529] leading-tight">{feature.title}</h4>
                <p className="text-[13px] text-gray-500 mt-1">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featuress;