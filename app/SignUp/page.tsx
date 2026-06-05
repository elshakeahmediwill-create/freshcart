"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios"; 
import { Star, Truck, ShieldCheck, User, UserPlus, Check } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); 
  
  // --- States للفورم ---
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    confirmPassword: "",
    phone: "",
  });

  // --- منطق قوة الباسورد ---
  const getStrength = (pass: string) => {
    let strength = 0;
    if (pass.length >= 8) strength += 25;
    if (/[0-9]/.test(pass)) strength += 35;
    if (/[!@#$%^&*]/.test(pass)) strength += 40;
    return strength;
  };

  const strength = getStrength(password);

  const getStatus = () => {
    if (strength < 30) return { label: "Weak", color: "bg-red-400", text: "text-red-400" };
    if (strength < 70) return { label: "Fair", color: "bg-orange-400", text: "text-orange-400" };
    return { label: "Strong", color: "bg-[#13b443]", text: "text-[#13b443]" };
  };

  const status = getStatus();

  // --- دالة التسجيل والربط بالـ API ---
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: password,
        rePassword: formData.confirmPassword,
        phone: formData.phone,
      });

      if (data.message === "success") {
        localStorage.setItem("userToken", data.token);

        toast.success("Account created successfully", {
          duration: 3000,
          position: "top-right",
          style: {
            border: "1px solid #13b443",
            padding: "16px",
            color: "#1a2b3c",
            fontWeight: "bold",
            borderRadius: "12px",
          },
        });

        setFormData({ name: "", email: "", confirmPassword: "", phone: "" });
        setPassword("");

        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed", {
        style: { borderRadius: "12px", fontWeight: "bold" }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white font-sans">
      <Toaster />

      {/* القسم الأيسر - المميزات */}
      <div className="hidden lg:flex flex-col justify-center p-20 bg-gray-50/30 border-r border-gray-50">
        <div className="max-w-md">
          <h1 className="text-[36px] font-black text-[#1a2b3c] mb-3">
            Welcome to <span className="text-[#13b443]">FreshCart</span>
          </h1>
          <p className="text-gray-500 text-[16px] mb-12 leading-relaxed">
            Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.
          </p>

          <div className="space-y-10 mb-16">
            <div className="flex gap-5">
              <div className="w-12 h-12 bg-green-100/50 rounded-2xl flex items-center justify-center shrink-0">
                <Star className="text-[#13b443]" size={24} fill="#13b443" />
              </div>
              <div>
                <h4 className="font-bold text-[#1a2b3c] text-[17px]">Premium Quality</h4>
                <p className="text-[14px] text-gray-400">Premium quality products sourced from trusted suppliers.</p>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="w-12 h-12 bg-green-100/50 rounded-2xl flex items-center justify-center shrink-0">
                <Truck className="text-[#13b443]" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-[#1a2b3c] text-[17px]">Fast Delivery</h4>
                <p className="text-[14px] text-gray-400">Same-day delivery available in most areas</p>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="w-12 h-12 bg-green-100/50 rounded-2xl flex items-center justify-center shrink-0">
                <ShieldCheck className="text-[#13b443]" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-[#1a2b3c] text-[17px]">Secure Shopping</h4>
                <p className="text-[14px] text-gray-400">Your data and payments are completely secure</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[28px] border border-gray-100 shadow-sm relative max-w-[420px]">
             <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center overflow-hidden">
                    <User size={30} className="text-orange-400 mt-2" />
                </div>
                <div>
                    <h5 className="font-bold text-[#1a2b3c]">Sarah Johnson</h5>
                    <div className="flex text-yellow-400 gap-0.5">
                        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                    </div>
                </div>
             </div>
             <p className="text-[15px] italic text-gray-500 leading-relaxed">
               "FreshCart has transformed my shopping experience. The quality is outstanding."
             </p>
          </div>
        </div>
      </div>

      {/* القسم الأيمن - الفورم */}
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-[480px]">
          <div className="text-center mb-10">
            <h2 className="text-[28px] font-black text-[#1a2b3c] mb-2">Create Your Account</h2>
            <p className="text-gray-400 text-[15px]">Start your fresh journey with us today</p>
          </div>

          <form className="space-y-5" onSubmit={handleRegister}>
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-gray-600 ml-1">Name*</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Ali" 
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[14px] focus:border-[#13b443] focus:ring-4 focus:ring-green-50 outline-none transition-all" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-bold text-gray-600 ml-1">Email*</label>
              <input 
                required
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="ali@example.com" 
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[14px] focus:border-[#13b443] focus:ring-4 focus:ring-green-50 outline-none transition-all" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-bold text-gray-600 ml-1">Password*</label>
              <input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="create a strong password" 
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[14px] focus:border-[#13b443] focus:ring-4 focus:ring-green-50 outline-none transition-all" 
              />
              <div className="flex items-center gap-2 mt-2 px-1">
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ease-in-out ${status.color}`} 
                      style={{ width: `${password.length > 0 ? strength : 0}%` }}
                    ></div>
                </div>
                <span className={`text-[11px] font-bold uppercase min-w-[40px] transition-colors ${status.text}`}>
                  {password.length > 0 ? status.label : "None"}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-bold text-gray-600 ml-1">Confirm Password*</label>
              <input 
                required
                type="password" 
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                placeholder="confirm your password" 
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[14px] focus:border-[#13b443] focus:ring-4 focus:ring-green-50 outline-none transition-all" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-bold text-gray-600 ml-1">Phone Number*</label>
              <input 
                required
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="01112223344" 
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[14px] focus:border-[#13b443] focus:ring-4 focus:ring-green-50 outline-none transition-all" 
              />
            </div>

            {/* تم استعادة Keep me signed in هنا */}
            <div className="flex items-center justify-between px-1 mt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center">
                  <input 
                    type="checkbox" 
                    className="peer appearance-none w-5 h-5 border-2 border-gray-200 rounded-md checked:bg-[#13b443] checked:border-[#13b443] transition-all duration-200"
                  />
                  <Check size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 left-0.5 transition-opacity pointer-events-none" />
                </div>
                <span className="text-[14px] text-gray-500 font-medium group-hover:text-[#1a2b3c] transition-colors">
                  Keep me signed in
                </span>
              </label>
            </div>

            <button 
              disabled={isLoading}
              type="submit" 
              className="w-full bg-[#13b443] text-white py-4 rounded-2xl font-black text-[15px] shadow-xl shadow-green-100 hover:bg-green-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4 disabled:bg-gray-300"
            >
              {isLoading ? "Loading..." : <><UserPlus size={20} /> Create My Account</>}
            </button>
          </form>

          <p className="text-center mt-8 text-[14px] text-gray-500 font-medium">
            Already have an account? <Link href="/login" className="text-[#13b443] font-bold hover:underline ml-1">Sign In</Link>
          </p>
        </div>
      </div>
    </main>
  );
}