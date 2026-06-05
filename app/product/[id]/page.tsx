"use client";
import React, { useEffect, useState, use } from "react";
import { 
  Star, Plus, Minus, Heart, Share2, Zap, 
  ShoppingCart, Truck, RefreshCcw, ShieldCheck, 
  CheckCircle2, BookOpen, ChevronLeft, ChevronRight, Eye, ArrowLeftRight
} from "lucide-react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
interface ProductDetails {
  _id: string;
  title: string;
  description: string;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  images: string[];
  ratingsAverage: number;
  ratingsQuantity: number;
  quantity: number;
  category: { name: string; _id: string };
  subcategory?: { name: string }[];
  brand?: { name: string };
}

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductDetails[]>([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details");
  
  // الحالة الخاصة بمؤشر المنتجات المقترحة (للأسهم)
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.data);
        setSelectedImage(data.data.imageCover);
        setLoading(false);
        return fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${data.data.category._id}`);
      })
      .then((res) => res.json())
      .then((relatedData) => {
        const filtered = relatedData.data.filter((p: ProductDetails) => p._id !== id);
        setRelatedProducts(filtered);
      })
      .catch((err) => console.error(err));
  }, [id]);

  // وظائف الأسهم
  const nextSlide = () => {
    if (currentIndex + 5 < relatedProducts.length) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  if (loading) return <div className="text-center py-20 text-[#0aad0a] font-medium">Loading...</div>;
  if (!product) return <div className="text-center py-20 text-red-500 font-bold">Product Not Found</div>;

  const oldPrice = product.priceAfterDiscount ? product.price : product.price + 200;
  const currentPrice = product.priceAfterDiscount || product.price;
  const discountPercentage = Math.round(((oldPrice - currentPrice) / oldPrice) * 100);
const { addToCart } = useCart();
  return (
    <main className="bg-white min-h-screen pb-20">
      <nav className="container mx-auto px-4 py-4 flex items-center gap-2 text-[13px] text-gray-500 border-b border-gray-50 mb-6">
        <span className="flex items-center gap-1 hover:text-[#0aad0a] cursor-pointer transition-colors">🏠 Home</span>
        <span className="text-gray-300">›</span>
        <span className="hover:text-[#0aad0a] cursor-pointer transition-colors">{product.category.name}</span>
        <span className="text-gray-300">›</span>
        <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.title}</span>
      </nav>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* الصور */}
          <div className="lg:w-[45%] flex flex-col gap-4">
            <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white aspect-[4/5] flex items-center justify-center p-6 shadow-sm">
              <img 
                src={selectedImage} 
                alt={product.title} 
                className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <div className="flex gap-3 overflow-x-auto py-2 no-scrollbar">
              {[product.imageCover, ...product.images].map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-24 h-24 border-2 rounded-xl overflow-hidden flex-shrink-0 p-1.5 transition-all ${selectedImage === img ? 'border-[#0aad0a] bg-green-50/50 shadow-sm' : 'border-gray-100 hover:border-gray-300'}`}
                >
                  <img src={img} className="w-full h-full object-contain" alt={`gallery-${idx}`} />
                </button>
              ))}
            </div>
          </div>

          {/* تفاصيل المنتج */}
          <div className="lg:w-[55%] flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <span className="bg-[#f0f9f0] text-[#0aad0a] text-[11px] px-3 py-1 rounded-full font-bold uppercase tracking-wider border border-[#e0f2e0]">
                {product.category.name}
              </span>
              {product.brand && (
                <span className="bg-gray-50 text-gray-500 text-[11px] px-3 py-1 rounded-full font-bold uppercase tracking-wider border border-gray-100">
                  {product.brand.name}
                </span>
              )}
            </div>

            <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">{product.title}</h1>

            <div className="flex items-center gap-2 mt-[-5px]">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={`${i < Math.floor(product.ratingsAverage) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                ))}
              </div>
              <span className="text-sm text-gray-500 font-medium">({product.ratingsQuantity} verified reviews)</span>
            </div>

            <div className="flex items-center gap-4 py-2">
              <span className="text-4xl font-black text-gray-900">{currentPrice} <span className="text-lg font-bold">EGP</span></span>
              <div className="flex flex-col">
                 <span className="text-gray-400 line-through text-sm leading-none">{oldPrice} EGP</span>
                 <span className="text-red-500 text-[12px] font-bold mt-1">Save {discountPercentage}% OFF</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[#0aad0a] bg-green-50/50 w-fit px-3 py-1.5 rounded-lg border border-green-100">
                <div className={`w-2 h-2 rounded-full ${product.quantity > 0 ? 'bg-[#0aad0a] animate-pulse' : 'bg-red-500'}`}></div>
                <span className="text-xs font-black uppercase tracking-wide">
                  {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
            </div>

            <p className="text-gray-500 text-[15px] leading-relaxed border-t border-gray-100 pt-5">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="mt-4">
              <p className="text-[11px] font-black text-gray-400 mb-3 uppercase tracking-widest">Quantity</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50/30 p-1">
                  <button 
                    disabled={quantity <= 1}
                    onClick={() => setQuantity(q => q - 1)} 
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-white hover:text-[#0aad0a] rounded-lg transition-all disabled:opacity-30"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-black text-gray-800">{quantity}</span>
                  <button 
                    disabled={quantity >= product.quantity}
                    onClick={() => setQuantity(q => q + 1)} 
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-white hover:text-[#0aad0a] rounded-lg transition-all"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className="text-gray-400 text-xs font-bold uppercase">{product.quantity} items left</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-5 border-t border-dashed mt-4">
              <span className="text-gray-500 font-bold uppercase text-xs tracking-widest">Subtotal:</span>
              <span className="text-3xl font-black text-[#0aad0a]">{(currentPrice * quantity).toLocaleString()} <span className="text-sm">EGP</span></span>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <button className="flex-[2] bg-[#0aad0a] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#089008] transition-all shadow-lg shadow-green-100 group active:scale-[0.98]">
                  <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" /> 
                  <span className="text-lg">Add to Cart</span>
                </button>
                <button className="flex-1 bg-[#1a1c2e] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-black transition-all shadow-lg shadow-gray-200 active:scale-[0.98]">
                  <Zap size={18} fill="currentColor" /> Buy Now
                </button>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 flex items-center justify-center gap-2 py-3.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                  <Heart size={18} /> Add to Wishlist
                </button>
                <button className="px-5 border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors">
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4 border-t border-gray-50 pt-8">
              {[
                { icon: <Truck size={20} />, title: "Free Delivery", desc: "For all orders" },
                { icon: <RefreshCcw size={20} />, title: "Easy Return", desc: "Within 30 days" },
                { icon: <ShieldCheck size={20} />, title: "Secure Pay", desc: "100% Protected" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center group cursor-default">
                  <div className="bg-green-50 p-3 rounded-2xl mb-2 group-hover:bg-[#0aad0a] group-hover:rotate-[360deg] transition-all duration-700">
                 {React.cloneElement(item.icon as React.ReactElement<any>, { className: "text-[#0aad0a] group-hover:text-white" })}
                  </div>
                  <p className="text-[10px] font-black text-gray-800 uppercase">{item.title}</p>
                  <p className="text-[9px] text-gray-400 mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Tabs Section --- */}
        <div className="mt-20 border border-gray-100 rounded-3xl overflow-hidden bg-white shadow-sm">
          <div className="flex border-b border-gray-100 bg-[#f9fafb]">
            {[
              { id: "details", label: "Product Details", icon: <BookOpen size={16} /> },
              { id: "reviews", label: `Reviews (${product.ratingsQuantity})`, icon: <Star size={16} /> },
              { id: "shipping", label: "Shipping Policy", icon: <Truck size={16} /> }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-10 py-6 text-sm font-bold flex items-center gap-2 transition-all border-b-2 relative ${
                  activeTab === tab.id 
                  ? "border-[#0aad0a] text-[#0aad0a] bg-white" 
                  : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-10">
            {activeTab === "details" && (
              <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
                <div className="max-w-4xl">
                  <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                    <div className="w-1.5 h-8 bg-[#0aad0a] rounded-full"></div> 
                    Description
                  </h3>
                  <p className="text-gray-600 text-[16px] leading-relaxed italic border-l-4 border-gray-100 pl-6 mb-10">
                    "{product.description}"
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-[#fcfdfc] p-8 rounded-3xl border border-green-50 shadow-sm">
                    <h4 className="font-black text-[11px] text-[#0aad0a] uppercase tracking-[3px] mb-6">Specifications</h4>
                    <div className="space-y-5 text-sm">
                      <div className="flex justify-between items-center border-b border-gray-50 pb-2"><span className="text-gray-400">Category</span><span className="font-bold text-gray-800">{product.category.name}</span></div>
                      <div className="flex justify-between items-center border-b border-gray-50 pb-2"><span className="text-gray-400">Brand</span><span className="font-bold text-gray-800">{product.brand?.name || "Official"}</span></div>
                      <div className="flex justify-between items-center border-b border-gray-50 pb-2"><span className="text-gray-400">Stock Status</span><span className="font-bold text-gray-800">{product.quantity > 0 ? 'Available' : 'Sold Out'}</span></div>
                      <div className="flex justify-between items-center"><span className="text-gray-400">Product ID</span><span className="font-mono text-[11px] bg-gray-100 px-2 py-1 rounded">{product._id}</span></div>
                    </div>
                  </div>
                  <div className="bg-gray-50/30 p-8 rounded-3xl border border-gray-100">
                    <h4 className="font-black text-[11px] text-gray-400 uppercase tracking-[3px] mb-6">Service Quality</h4>
                    <ul className="space-y-4">
                      {["Authentic Guarantee", "Verified Subcategory", "Fast API Response", "Secure Transaction"].map((f, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                          <CheckCircle2 size={18} className="text-[#0aad0a]" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
                <div className="animate-in fade-in duration-500">
                <div className="flex flex-col lg:flex-row gap-20 items-start">
                   <div className="flex flex-col items-center bg-white p-12 rounded-[40px] border-2 border-gray-50 shadow-xl shadow-gray-100/50 min-w-[280px]">
                      <span className="text-8xl font-black text-gray-900 tracking-tighter">{product.ratingsAverage}</span>
                      <div className="flex gap-1.5 my-5">
                        {[...Array(5)].map((_, i) => (
                           <Star key={i} size={24} className={i < Math.floor(product.ratingsAverage) ? "text-yellow-400 fill-yellow-400" : "text-gray-100"} />
                        ))}
                      </div>
                      <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Product Rating</p>
                   </div>
                   <div className="flex-1 w-full space-y-5 py-4">
                      {[
                        { s: 5, p: 92, c: "#0aad0a" },
                        { s: 4, p: 15, c: "#84cc16" },
                        { s: 3, p: 5, c: "#facc15" },
                        { s: 2, p: 2, c: "#f97316" },
                        { s: 1, p: 1, c: "#ef4444" }
                      ].map((item) => (
                        <div key={item.s} className="flex items-center gap-6">
                          <span className="text-xs font-black text-gray-500 w-14 italic">{item.s} Stars</span>
                          <div className="flex-1 h-3 bg-gray-50 rounded-full overflow-hidden shadow-inner">
                             <div className="h-full rounded-full transition-all duration-1000 ease-out shadow-sm" style={{ width: `${item.p}%`, backgroundColor: item.c }}></div>
                          </div>
                          <span className="text-xs font-black text-gray-900 w-10">{item.p}%</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
               <div className="animate-in fade-in duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#f0fdf4] p-8 rounded-2xl border border-green-50">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-[#0aad0a] p-2 rounded-full text-white"><Truck size={20} /></div>
                      <h4 className="font-bold text-gray-900">Shipping Information</h4>
                    </div>
                    <ul className="space-y-4 text-[13px] text-gray-700">
                      <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-[#0aad0a]" /> Free shipping on orders over $50</li>
                      <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-[#0aad0a]" /> Standard delivery: 3-5 business days</li>
                    </ul>
                  </div>
                  <div className="bg-[#f0fdf4] p-8 rounded-2xl border border-green-50">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-[#0aad0a] p-2 rounded-full text-white"><RefreshCcw size={20} /></div>
                      <h4 className="font-bold text-gray-900">Returns & Refunds</h4>
                    </div>
                    <ul className="space-y-4 text-[13px] text-gray-700">
                      <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-[#0aad0a]" /> 30-day hassle-free returns</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* --- You May Also Like Section --- */}
        <section className="mt-24">
          <div className="flex justify-between items-end mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-6 bg-[#0aad0a] rounded-full"></div>
                <h2 className="text-2xl font-black text-gray-900">You May Also <span className="text-[#0aad0a]">Like</span></h2>
              </div>
              <p className="text-gray-400 text-sm font-medium">Based on your interest in {product.category.name}</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-[#0aad0a] hover:text-white hover:border-[#0aad0a] transition-all disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-gray-400"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextSlide}
                disabled={currentIndex + 5 >= relatedProducts.length}
                className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-[#0aad0a] hover:text-white hover:border-[#0aad0a] transition-all disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-gray-400"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {relatedProducts.slice(currentIndex, currentIndex + 5).map((relProduct) => (
              <div key={product._id} className="group bg-white border border-gray-100 rounded-2xl p-4 transition-all hover:shadow-xl hover:shadow-gray-100/50 hover:border-green-100 relative">
                <span className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-md z-10">-37%</span>
                
                {/* Fixed Actions (No motion) */}
                {/* الجزء الجديد */}
<div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                  <button className="w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"><Heart size={14} /></button>
                  <button className="w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center text-gray-400 hover:text-[#0aad0a] transition-colors"><ArrowLeftRight size={14} /></button>
 <Link 
  href={`/product/${relProduct._id}`} // استخدم relProduct وليس product
  className="w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center text-gray-400 hover:text-[#0aad0a] transition-colors"
>
  <Eye size={18} />
</Link>  </div>
                

                <div className="aspect-[3/4] mb-4 overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center p-4">
                  <img src={relProduct.imageCover} alt={relProduct.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{relProduct.category.name}</p>
                  <h3 className="text-sm font-bold text-gray-800 truncate group-hover:text-[#0aad0a] transition-colors">{relProduct.title}</h3>
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-[11px] font-bold text-gray-700">{relProduct.ratingsAverage}</span>
                    <span className="text-[11px] text-gray-400">({relProduct.ratingsQuantity})</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="text-lg font-black text-[#0aad0a]">{relProduct.price} <span className="text-[10px]">EGP</span></span>
                      <p className="text-[10px] text-gray-400 line-through leading-none">{(relProduct.price + 150)} EGP</p>
                    </div>
    <button 
  onClick={addToCart} // السطر ده هو اللي بيخلي الرقم يزيد
  className="bg-[#4FA74F] text-white p-2 rounded-xl hover:bg-green-700 transition-colors shadow-sm active:scale-95"
>
  <Plus size={18} strokeWidth={3} />
</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}