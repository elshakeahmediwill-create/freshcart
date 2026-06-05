"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { LayoutGrid, Filter, X, ArrowLeft } from "lucide-react";
import Link from "next/link";

function ProductsContent() {
  const searchParams = useSearchParams();
  const subcategoryId = searchParams.get("subcategory");
  
  const [products, setProducts] = useState([]);
  const [subcategoryName, setSubcategoryName] = useState(""); // تخزين اسم القسم الفرعي
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (subcategoryId) {
      setLoading(true);
      
      // 1. جلب اسم القسم الفرعي عشان نعرضه في العنوان
      fetch(`https://ecommerce.routemisr.com/api/v1/subcategories/${subcategoryId}`)
        .then(res => res.json())
        .then(data => {
          if (data.data) setSubcategoryName(data.data.name);
        });

      // 2. جلب المنتجات التابعة لهذا القسم
      fetch(`https://ecommerce.routemisr.com/api/v1/products?subcategory[in]=${subcategoryId}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [subcategoryId]);

  return (
    <main className="min-h-screen bg-white">
      {/* البانر العلوي - الآن يعرض اسم القسم الديناميكي */}
      <div className="bg-[#13b443] py-12 px-10 text-white">
        <div className="container mx-auto">
          <Link href="/">Home /</Link>
          <Link href="/categories">Categories </Link>

          <span className="text-sm opacity-80 mb-2">/  {subcategoryName || "Loading..."}</span>
          <div className="flex items-center gap-4">
             <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                <LayoutGrid size={32} />
             </div>
             {/* هنا بيعرض الاسم اللي أنت ضغطت عليه */}
             <h1 className="text-4xl font-black">{subcategoryName || "Products"}</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* منطقة الفلتر النشط */}
        <div className="flex items-center gap-4 mb-8 text-sm">
          <span className="flex items-center gap-1 text-gray-500 font-bold">
            <Filter size={16} /> Active Filters:
          </span>
          {subcategoryName && (
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full border border-green-200">
               {subcategoryName}
               <X size={14} className="cursor-pointer" />
            </div>
          )}
          <button className="text-gray-400 underline ml-2">Clear all</button>
        </div>

        <p className="mb-10 text-gray-600 font-medium font-mono">Showing {products.length} products</p>

        {loading ? (
          <div className="text-center py-20 font-bold text-gray-400">Loading Products...</div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-gray-100 p-6 rounded-full mb-6">
               <LayoutGrid size={48} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-black text-gray-800">No Products Found</h2>
            <p className="text-gray-500 mt-2 mb-8">No products match your current filters in {subcategoryName}.</p>
            <Link href="/shop" className="bg-[#13b443] text-white px-8 py-3 rounded-xl font-bold hover:bg-green-600 transition-all">
               View All Categories
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product._id} className="group border border-gray-100 p-4 rounded-[2rem] hover:shadow-2xl transition-all duration-300 bg-white">
                 <div className="overflow-hidden rounded-2xl bg-gray-50 mb-4 h-60 flex items-center justify-center">
                    <img src={product.imageCover} alt={product.title} className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                 </div>
                 <h3 className="font-bold text-gray-800 mt-2 truncate px-2">{product.title}</h3>
                 <div className="flex justify-between items-center mt-4 px-2">
                    <p className="text-[#13b443] font-black text-lg">{product.price} EGP</p>
                    <button className="bg-gray-900 text-white p-2 rounded-lg hover:bg-[#13b443] transition-colors">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                    </button>
                 </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

// استخدام Suspense ضروري عند استخدام useSearchParams في Next.js
export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}