"use client"; 
import './globals.css'
import { ReactNode, useEffect, useState } from 'react'
import Footer from "../components/Footer";
import Featuress from "../components/Featuress";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation"; 
import CategoryDropdown from "../components/CategoryDropdown"; 
import { WishlistProvider, useWishlist } from "./context/WishlistContext";
// 1. استيراد الـ Context والـ Hook (تأكد من إنشاء ملف الـ Context أولاً)
import { CartProvider, useCart } from "./context/CartContext"; 
import WishlistBadge from "../components/WishlistBadge";
import { 
  ShoppingCart, 
  Heart, 
  Search, 
  Phone, 
  
  User, 
  Ambulance, 
  Gift, 
  Headset,
  LogOut,
  
  Package,
  MapPin,
  Settings
} from "lucide-react";

// تم إنشاء هذا المكون الداخلي عشان نقدر نستخدم useCart جوه الـ Layout
function LayoutBody({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname(); 
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
const { displayCount, wishlistCount } = useWishlist();
  // 2. سحب رقم السلة من الـ Context
  const { cartCount } = useCart();
// --- ضيف السطور دي هنا ---
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const checkAuth = () => {
    const token = localStorage.getItem("userToken");
    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");
    
    setUserToken(token);
    setUserName(name || "User");
    setUserEmail(email || "No Email Provided");
  };

  useEffect(() => {
    checkAuth();
  }, [pathname]); 

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setUserToken(null);
    setUserName(null);
    setUserEmail(null);
    setIsMenuOpen(false);
    router.push("/login");
  };

  return (
    <>
      <header className=" bg-white ">
        {/* Top Bar */}
  <div className="text-sm py-2 flex justify-between items-center container mx-auto px-4">
          <div className="flex items-center gap-4 text-gray-600 ">
            <span className="flex items-center gap-1"> 
              <Ambulance className="text-green-600" size={16}/> Free Shipping on Orders 500 EGP
            </span>
            <span className="flex items-center gap-1"> 
              <Gift className="text-green-600" size={16}/> New Arrivals Daily
            </span>
          </div>

          <div className="flex gap-4 items-center text-gray-600 ">
            <span className="flex items-center gap-1 hover:text-green-600 cursor-pointer"> <Phone size={16} /> +1 (800) 123-4567</span>
            
            {!userToken ? (
              <>
                <Link href="/login" className="flex items-center gap-1 hover:text-green-600">
                  <User size={16} /> Sign in
                </Link>
                <Link href="/SignUp" className="flex items-center gap-1 hover:text-green-600">
                  <User size={16} /> Sign Up
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-green-600 font-bold uppercase tracking-tighter">
                  <User size={16} /> {userName}
                </span>
                <button onClick={handleLogout} className="flex items-center gap-1 hover:text-red-600 text-gray-400 font-medium transition-colors">
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Navbar */}
<div className={`bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between z-[1000] transition-all duration-300 ${isScrolled ? 'fixed top-0 left-0 w-full shadow-md' : 'relative'}`}>          <Link href="/" className="flex items-center gap-2">
            <ShoppingCart size={30} className="text-green-600" style={{ transform: "scaleX(-1)" }} />
            <h1 className="text-2xl font-bold">FreshCart</h1>
          </Link>

          <div className="flex-1 mx-6">
            <div className="flex border rounded-lg overflow-hidden focus-within:border-green-600 transition-all">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-2 outline-none"
              />
              <button className="bg-green-600 text-white px-4 flex items-center justify-center">
                <Search size={18} />
              </button>
            </div>
          </div>

          <div className="px-6 py-2 flex gap-6 items-center">
            <Link className='hover:text-green-600 font-medium' href="/">Home</Link>
            <Link className='hover:text-green-600 font-medium' href="/shop">Shop</Link>
            <CategoryDropdown /> 
            <Link className='hover:text-green-600 font-medium' href="/brands">Brands</Link>
            <Link href="/contact" className="flex items-center gap-1 hover:text-[#13b443] transition-colors font-medium">
              <Headset size={16}/> 24/7 Help
            </Link>
          </div>

          <div className="flex items-center gap-5">
  <div className="relative">
  {/* تغليف الأيقونة بالرابط للانتقال لصفحة المفضلة */}
  <Link href="/wishlist" className="block">
    <Heart className="cursor-pointer hover:text-green-600" />
  </Link>
  
  {/* 👇 استبدلنا الرقم الثابت (2) بالـ displayCount الديناميك عشان يعد أول ما تضغط */}
  {userToken && wishlistCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold pointer-events-none">
      {displayCount}
    </span>
  )}
</div>
            
            {/* تغليف الأيقونة بالرابط */}
<Link href="/cart" className="relative group flex items-center">
  <ShoppingCart className="cursor-pointer hover:text-green-600 transition-colors " />
  
  {/* رقم السلة اللي إنت عملته */}
  {userToken && (
    <span className="absolute -top-2 -right-2 bg-green-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm">
      {cartCount}
    </span>
  )}
</Link>

            {!userToken ? (
              <Link href="/login">
                <button className="bg-[#13b443] text-white px-6 py-2.5 rounded-xl font-bold text-[14px] shadow-lg shadow-green-100 hover:bg-green-700 transition-all">
                  Sign In
                </button>
              </Link>
            ) : (
              <div className="relative">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border ${isMenuOpen ? 'bg-green-50 border-green-200 text-green-600' : 'bg-gray-100 border-gray-100 text-gray-500'}`}
                >
                  <User size={20} />
                </button>

                {isMenuOpen && (
                  <div className="absolute top-full right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-50 z-[999] overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                      <p className="text-sm font-black text-gray-800 uppercase tracking-tighter">{userName}</p>
                      <p className="text-[11px] text-gray-400 font-medium truncate">{userEmail}</p>
                    </div>
                    
                    <div className="p-2 space-y-1">
                      <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-xl transition-all group">
                        <User size={18} className="text-gray-400 group-hover:text-green-600" /> My Profile
                      </Link>
                      <Link href="/orders" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-xl transition-all group">
                        <Package size={18} className="text-gray-400 group-hover:text-green-600" /> My Orders
                      </Link>
                     {/* شيلنا شرط الـ userToken من هنا عشان ميعملش بلوك للـ State */}
<Link href="/wishlist" className="relative group flex items-center">
  <WishlistBadge />
</Link>
                      <Link href="/addresses" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-xl transition-all group">
                        <MapPin size={18} className="text-gray-400 group-hover:text-green-600" /> Addresses
                      </Link>
                      <Link href="/settings" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-xl transition-all group">
                        <Settings size={18} className="text-gray-400 group-hover:text-green-600" /> Settings
                      </Link>
                    </div>

                    <div className="mt-2 pt-2 border-t border-gray-50 px-2">
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <LogOut size={18} /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
{/* ضيف السطر ده هنا */}
      {isScrolled && <div className="h-[80px]"></div>}

      <main className=" p-3 mt-[80px]">
        {children}
      </main>
      <Featuress />
      <Footer/>
    </>
  );
}

// 4. الـ RootLayout الأصلي بنغلفه بالـ Provider
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <CartProvider>
          {/* حطينا المشترك هنا عشان يغذي كل الأجزاء اللي جوه */}
          <WishlistProvider> 
            <LayoutBody>{children}</LayoutBody>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  )
}