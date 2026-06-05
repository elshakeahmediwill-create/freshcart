"use client";
import React, { useState } from "react";
import Link from "next/link";
import { 
  User, MapPin, Settings, ChevronRight, Plus, X, Pencil, 
  Trash2, Phone, Building2, Save, CheckCircle2, Lock, Eye, EyeOff 
} from "lucide-react";

export default function MyAccountPage() {
  // --- 1. الحالات (States) ---
  const [activeTab, setActiveTab] = useState("addresses"); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [addresses, setAddresses] = useState([]); 
  const [isSaved, setIsSaved] = useState(false);
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });

  const [formData, setFormData] = useState({
    name: "",
    fullAddress: "",
    phone: "",
    city: ""
  });

  // بيانات الملف الشخصي
  const [profileData, setProfileData] = useState({
    fullName: "AHMED EISHIKA",
    email: "ahmed@example.com",
    phone: "01012345678"
  });

  // بيانات تغيير كلمة المرور
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // --- 2. الوظائف (Functions) ---

  const handleSaveSettings = (e) => {
    e.preventDefault();
    console.log("Saving Profile Data:", profileData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    console.log("Password Change Requested:", passwordData);
    // هنا ممكن تضيف Logic التأكد من تطابق الكلمتين
    alert("Password change request sent!");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ name: "", fullAddress: "", phone: "", city: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (address) => {
    setEditingId(address.id);
    setFormData(address);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleSubmitAddress = (e) => {
    e.preventDefault();
    if (editingId) {
      setAddresses(addresses.map(addr => addr.id === editingId ? { ...formData, id: editingId } : addr));
    } else {
      setAddresses([...addresses, { ...formData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] relative">
      {/* 1. البانر الأخضر */}
      <div className="bg-[#13b443] py-16 px-6 lg:px-20 text-white transition-all duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="text-[11px] font-bold opacity-70 mb-5 flex gap-1 uppercase tracking-wider">
              <Link href="/" className="hover:underline">Home</Link> <span>/</span> <span>My Account</span>
          </div>
          <div className="flex items-center gap-5">
            <div className="bg-white/20 p-4 rounded-2xl border border-white/10">
              <User size={36} className="text-white" strokeWidth={2.5} />
            </div>
            <div>
              {/* الربط المباشر مع profileData.fullName */}
              <h1 className="text-3xl font-black tracking-tight uppercase transition-all">
                {profileData.fullName || "User Name"}
              </h1>
              <p className="text-green-50 opacity-80 text-[14px] font-medium mt-1">
                {activeTab === 'addresses' ? "Manage your addresses" : "Manage your account settings"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-20 mt-10 grid grid-cols-1 lg:grid-cols-4 gap-8 pb-20">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-5 sticky top-10">
            <h3 className="px-4 py-3 text-[11px] font-black text-gray-300 uppercase tracking-[0.2em] mb-2">My Account</h3>
            <nav className="space-y-1">
              <button 
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all border ${activeTab === 'addresses' ? 'bg-[#f0fdf4] text-[#13b443] font-bold border-green-50' : 'text-gray-500 hover:bg-gray-50 font-bold border-transparent'}`}
              >
                <div className="flex items-center gap-3"><MapPin size={20} /> My Addresses</div>
                <ChevronRight size={16} className={activeTab === 'addresses' ? "opacity-40" : "opacity-0"} />
              </button>

              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all border ${activeTab === 'settings' ? 'bg-[#f0fdf4] text-[#13b443] font-bold border-green-50' : 'text-gray-500 hover:bg-gray-50 font-bold border-transparent'}`}
              >
                <div className="flex items-center gap-3"><Settings size={20} /> Settings</div>
                <ChevronRight size={16} className={activeTab === 'settings' ? "opacity-40" : "opacity-0"} />
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          {activeTab === 'addresses' ? (
            /* --- قسم العناوين --- */
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 min-h-[550px] relative animate-in fade-in duration-500">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h2 className="text-xl font-black text-[#1a2b3c]">My Addresses</h2>
                  <p className="text-gray-400 text-[14px] font-medium mt-1">Manage your saved delivery addresses</p>
                </div>
                <button onClick={openAddModal} className="bg-[#13b443] text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-green-600 shadow-md transition-all">
                  <Plus size={18} strokeWidth={3} /> Add Address
                </button>
              </div>

              {addresses.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <MapPin size={36} className="text-gray-200" />
                  </div>
                  <h3 className="text-lg font-black text-[#1a2b3c] mb-2">No Addresses Yet</h3>
                  <button onClick={openAddModal} className="bg-[#13b443] text-white px-8 py-3.5 rounded-2xl font-black text-[15px] flex items-center gap-2 shadow-xl shadow-green-100 hover:scale-105 transition-all">
                    <Plus size={20} strokeWidth={3} /> Add Your First Address
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {addresses.map((addr) => (
                    <div key={addr.id} className="p-6 border border-gray-100 rounded-[2rem] bg-white hover:border-green-100 transition-all flex justify-between items-center shadow-sm">
                      <div className="flex gap-4 items-start">
                        <div className="bg-[#f0fdf4] p-3 rounded-2xl mt-1">
                          <MapPin size={22} className="text-[#13b443]" />
                        </div>
                        <div>
                          <h4 className="font-black text-[#1a2b3c] text-lg">{addr.name}</h4>
                          <p className="text-gray-400 text-sm mb-3 font-medium">{addr.fullAddress}</p>
                          <div className="flex items-center gap-4">
                            <span className="text-[13px] font-bold text-gray-500 flex items-center gap-1.5"><Phone size={14} className="text-gray-300" /> {addr.phone}</span>
                            <span className="text-[13px] font-bold text-gray-500 flex items-center gap-1.5"><Building2 size={14} className="text-gray-300" /> {addr.city}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => openEditModal(addr)} className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:bg-[#f0fdf4] hover:text-[#13b443] transition-all"><Pencil size={18} /></button>
                        <button onClick={() => handleDelete(addr.id)} className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all"><Trash2 size={18} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* --- قسم الإعدادات --- */
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div>
                <h2 className="text-xl font-black text-[#1a2b3c]">Account Settings</h2>
                <p className="text-gray-400 text-[14px] font-medium mt-1">Update your profile information and change password</p>
              </div>

              {/* 1. معلومات الملف الشخصي */}
              <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8">
                <div className="flex items-center gap-4 mb-8">
                   <div className="bg-[#f0fdf4] p-3 rounded-2xl text-[#13b443]">
                      <User size={24} />
                   </div>
                   <div>
                      <h3 className="font-black text-[#1a2b3c]">Profile Information</h3>
                      <p className="text-gray-400 text-xs font-medium">Update your personal details</p>
                   </div>
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[13px] font-bold text-gray-400 mb-2 ml-1">Full Name</label>
                      <input 
                        required
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-green-200 text-sm font-bold text-[#1a2b3c]" 
                        value={profileData.fullName} 
                        onChange={(e) => setProfileData({...profileData, fullName: e.target.value})} 
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold text-gray-400 mb-2 ml-1">Email Address</label>
                      <input 
                        required
                        type="email"
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-green-200 text-sm font-bold text-[#1a2b3c]" 
                        value={profileData.email} 
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})} 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-gray-400 mb-2 ml-1">Phone Number</label>
                    <input 
                      required
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-green-200 text-sm font-bold text-[#1a2b3c]" 
                      value={profileData.phone} 
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})} 
                    />
                  </div>
                  
                  <div className="flex items-center gap-4 pt-2">
                    <button 
                      type="submit" 
                      className={`px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-2 transition-all shadow-lg ${isSaved ? 'bg-gray-800 text-white shadow-gray-200' : 'bg-[#13b443] text-white shadow-green-100 hover:bg-green-600'}`}
                    >
                      {isSaved ? <CheckCircle2 size={18} /> : <Save size={18} />}
                      {isSaved ? "Saved Successfully!" : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>

              {/* 2. قسم تغيير كلمة المرور الجديد */}
              <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8">
                <div className="flex items-center gap-4 mb-8">
                   <div className="bg-orange-50 p-3 rounded-2xl text-orange-500">
                      <Lock size={24} />
                   </div>
                   <div>
                      <h3 className="font-black text-[#1a2b3c]">Change Password</h3>
                      <p className="text-gray-400 text-xs font-medium">Update your account password</p>
                   </div>
                </div>

                <form onSubmit={handleChangePassword} className="space-y-6">
                  {/* Current Password */}
                  <div className="relative">
                    <label className="block text-[13px] font-bold text-gray-400 mb-2 ml-1">Current Password</label>
                    <input 
                      type={showPasswords.current ? "text" : "password"}
                      placeholder="Enter your current password"
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-orange-100 text-sm font-bold" 
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    />
                    <button type="button" onClick={() => togglePasswordVisibility('current')} className="absolute right-6 top-[52px] text-gray-300">
                      {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* New Password */}
                    <div className="relative">
                      <label className="block text-[13px] font-bold text-gray-400 mb-2 ml-1">New Password</label>
                      <input 
                        type={showPasswords.new ? "text" : "password"}
                        placeholder="Must be at least 6 characters"
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-orange-100 text-sm font-bold" 
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      />
                      <button type="button" onClick={() => togglePasswordVisibility('new')} className="absolute right-6 top-[52px] text-gray-300">
                        {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                      <label className="block text-[13px] font-bold text-gray-400 mb-2 ml-1">Confirm New Password</label>
                      <input 
                        type={showPasswords.confirm ? "text" : "password"}
                        placeholder="Confirm your new password"
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-orange-100 text-sm font-bold" 
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      />
                      <button type="button" onClick={() => togglePasswordVisibility('confirm')} className="absolute right-6 top-[52px] text-gray-300">
                        {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all"
                  >
                    <Lock size={18} /> Change Password
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* الـ Modal للعناوين */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black text-[#1a2b3c]">{editingId ? "Edit Address" : "Add New Address"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-50 p-2 rounded-full text-gray-400"><X size={20}/></button>
            </div>
            <form onSubmit={handleSubmitAddress} className="space-y-5">
              <div>
                <label className="block text-[13px] font-bold text-gray-400 mb-2 ml-1">Address Name</label>
                <input required className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none text-sm font-bold" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-gray-400 mb-2 ml-1">Full Address</label>
                <textarea required className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none min-h-[100px] resize-none text-sm font-bold" value={formData.fullAddress} onChange={(e) => setFormData({...formData, fullAddress: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-gray-400 mb-2 ml-1">Phone Number</label>
                  <input required className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none text-sm font-bold" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-400 mb-2 ml-1">City</label>
                  <input required className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none text-sm font-bold" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 rounded-2xl font-black text-gray-400 bg-gray-50 text-sm">Cancel</button>
                <button type="submit" className="flex-1 py-4 rounded-2xl font-black text-white bg-[#13b443] text-sm">Save Address</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}