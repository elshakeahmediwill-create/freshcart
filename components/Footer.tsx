import React from "react";
// 1. استيراد الأيقونات الجديدة من react-icons
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const MainFooter = () => {
  return (
    <footer className="bg-[#0d141d] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* العمود الأول: اللوجو والمعلومات */}
          <div className="lg:col-span-1">
            <div className="bg-white inline-block px-3 py-1 rounded-lg mb-6">
               <h2 className="text-[#4FA74F] font-bold text-2xl flex items-center gap-2">
                 <span className="text-3xl">🛒</span> FreshCart
               </h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices.
            </p>
            
            {/* 2. تعديل الأيقونات هنا */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <FaPhoneAlt className="text-[#4FA74F]" size={14} />
                <span>+1 (800) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <FaEnvelope className="text-[#4FA74F]" size={14} />
                <span>support@freshcart.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <FaMapMarkerAlt className="text-[#4FA74F]" size={14} />
                <span>123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>
            
            {/* 3. تعديل السوشيال ميديا هنا */}
            <div className="flex gap-4 mt-8">
              {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#4FA74F] transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* باقي الأعمدة (Shop, Account, Support, Legal) تظل كما هي */}
          <div>
            <h4 className="font-bold text-lg mb-6">Shop</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">All Products</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Categories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Brands</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Electronics</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Men's Fashion</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Women's Fashion</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Account</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">My Account</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Order History</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Wishlist</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shopping Cart</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sign In</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Create Account</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Legal</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">
            © 2026 FreshCart. All rights reserved.
          </p>
          <div className="flex items-center gap-6 opacity-50">
             <span className="text-xs">Visa</span>
             <span className="text-xs">Mastercard</span>
             <span className="text-xs">PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;