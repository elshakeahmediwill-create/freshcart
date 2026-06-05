"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, Truck, Headphones, LogIn } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // --- States للفورم ---
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // --- دالة تسجيل الدخول ---
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", formData);

      if (data.message === "success") {
        // 1. تخزين التوكن والبيانات (تم إضافة تخزين الإيميل ليكون ديناميكي)
        localStorage.setItem("userToken", data.token);
        
        if (data.user) {
          localStorage.setItem("userName", data.user.name);
          localStorage.setItem("userEmail", data.user.email); // السطر المضاف لربط البريد بالمنيو
        }

        // 2. إظهار رسالة النجاح
        toast.success("Welcome Back! Redirecting...", {
          duration: 2000,
          position: "top-center",
          style: {
            border: "1px solid #13b443",
            padding: "16px",
            color: "#1a2b3c",
            fontWeight: "bold",
            borderRadius: "15px",
          },
        });

        // 3. التحويل لصفحة الهوم بعد ثانيتين
        setTimeout(() => {
          router.push("/"); 
        }, 2000);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid email or password", {
        style: { borderRadius: "12px", fontWeight: "bold" }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      <Toaster /> 
      
      {/* القسم الأيسر: الصورة والمميزات */}
      <div className="hidden lg:flex flex-col items-center justify-center p-12 bg-gray-50/50 relative overflow-hidden">
        <div className="absolute top-10 left-10 opacity-5 rotate-12">
            <Truck size={120} className="text-[#13b443]" />
        </div>

        <div className="relative w-full max-w-md text-center">
          <div className="w-full flex-grow overflow-hidden rounded-3xl mb-6 shadow-2xl shadow-green-100">
            <img 
              src="/signin-image.png" 
              alt="FreshCart Banner" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <h2 className="text-[28px] font-black text-[#1a2b3c] mb-4 leading-tight">
            FreshCart - Your One-Stop Shop for <span className="text-[#13b443]">Fresh Products</span>
          </h2>
          
          <div className="flex items-center justify-center gap-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider">
            <div className="flex items-center gap-1.5 underline decoration-[#13b443] decoration-2 underline-offset-4">
              <Truck size={16} className="text-[#13b443]" /> Free Delivery
            </div>
            <div className="flex items-center gap-1.5 underline decoration-[#13b443] decoration-2 underline-offset-4">
              <ShieldCheck size={16} className="text-[#13b443]" /> Secure Payment
            </div>
          </div>
        </div>
      </div>

      {/* القسم الأيمن: الفورم */}
      <div className="flex items-center justify-center p-6 lg:p-20">
        <div className="w-full max-w-[440px]">
          <div className="flex flex-col items-center mb-8">
              <div className="bg-[#13b443] text-white px-4 py-1 rounded-lg font-black italic text-xl mb-4 shadow-lg shadow-green-100">
                FreshCart
              </div>
              <h2 className="text-[28px] font-black text-[#1a2b3c]">Welcome Back!</h2>
              <p className="text-gray-400 text-[14px] mt-1 font-medium text-center">Sign in to continue your fresh shopping experience</p>
          </div>

          <form className="space-y-5" onSubmit={handleSignIn}>
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[12px] font-black text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-[#13b443] transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Enter your email" 
                  className="w-full bg-gray-50/30 border border-gray-200 rounded-2xl pl-12 pr-4 py-3.5 text-[14px] font-medium outline-none focus:bg-white focus:border-[#13b443] focus:ring-4 focus:ring-green-50 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[12px] font-black text-gray-400 uppercase tracking-wider">Password</label>
                <Link href="#" className="text-[12px] font-bold text-[#13b443] hover:underline">Forgot?</Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-[#13b443] transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  required
                  type={showPassword ? "text" : "password"} 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="Enter your password" 
                  className="w-full bg-gray-50/30 border border-gray-200 rounded-2xl pl-12 pr-12 py-3.5 text-[14px] font-medium outline-none focus:bg-white focus:border-[#13b443] focus:ring-4 focus:ring-green-50 transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-300 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2.5 ml-1">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded-lg border-gray-200 text-[#13b443] focus:ring-[#13b443] cursor-pointer" />
              <label htmlFor="remember" className="text-[13px] font-bold text-gray-400 cursor-pointer hover:text-gray-600 transition-colors">Keep me signed in</label>
            </div>

            <button 
              disabled={isLoading}
              type="submit"
              className="w-full bg-[#13b443] text-white py-4 rounded-2xl font-black text-[15px] shadow-xl shadow-green-100 hover:bg-green-700 active:scale-[0.97] transition-all mt-4 flex items-center justify-center gap-2 disabled:bg-gray-300"
            >
              {isLoading ? "Checking..." : <><LogIn size={20} /> Sign In</>}
            </button>
          </form>

          <p className="text-center mt-10 text-[14px] text-gray-500 font-medium">
            New to FreshCart?{" "}
            <Link href="/SignUp" className="text-[#13b443] font-bold hover:underline">
              Create an account
            </Link>
          </p>

          <div className="mt-12 flex items-center justify-center gap-8 border-t border-gray-50 pt-8">
            <div className="flex flex-col items-center">
                <span className="text-[11px] font-black text-gray-300 uppercase tracking-widest">SSL Secured</span>
                <ShieldCheck size={16} className="text-gray-200 mt-1" />
            </div>
            <div className="w-px h-8 bg-gray-100"></div>
            <div className="flex flex-col items-center text-[#13b443] font-black text-[12px]">
                ★ 4.9 RATING
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}