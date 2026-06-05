"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const CategoryDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  // الخمسة زراير اللي في الصورة بالظبط
  const categories = [
    { name: "All Categories", path: "/categories" },
    { name: "Electronics", path: "/electronics" },
   { name: "Women's Fashion", path: "/womens-fashion" },
    { name: "Men's Fashion", path: "/Mens-Fashion" },
    { name: "Beauty & Health", path: "/BeautyHealth" },
  ];

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* زرار الـ Categories الرئيسي */}
      <button className="flex items-center gap-1 hover:text-green-600 transition-colors py-2 outline-none">
        Categories
        <ChevronDown size={14} className={`mt-0.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* القائمة المنسدلة */}
      <div className={`
        absolute left-0 top-full w-52 bg-white border border-gray-100 rounded-xl shadow-xl z-[999] 
        transition-all duration-300 origin-top
        ${isOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}
      `}>
        <div className="py-2">
          {categories.map((cat, index) => (
            <Link
              key={index}
              href={cat.path}
              className={`block px-6 py-2.5 text-sm transition-colors border-b border-gray-50 last:border-0
                ${cat.name === "All Categories" ? "font-bold text-gray-700" : "text-gray-600"}
                hover:bg-gray-50 hover:text-green-600
              `}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryDropdown;