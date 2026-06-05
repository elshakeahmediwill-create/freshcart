import React from "react";
import Link from "next/link"; // استيراد اللينك للتنقل
import { ArrowLeft } from "lucide-react"; // أيقونة سهم للجمالية

// دالة جلب بيانات القسم الرئيسي
async function getCategoryDetails(id) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
    if (!res.ok) return null;
    const response = await res.json();
    return response.data;
  } catch (error) {
    console.error("Error in Category API:", error);
    return null;
  }
}

// دالة جلب الأقسام الفرعية التابعة لهذا القسم
async function getSubCategories(id) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
    if (!res.ok) return [];
    const response = await res.json();
    return response.data || [];
  } catch (error) {
    console.error("Error in SubCategory API:", error);
    return [];
  }
}

// الـ Component الرئيسي لصفحة القسم
export default async function CategoryPage({ params }) {
  // فك الـ Promise الخاص بـ params (ضروري لـ Next.js 15)
  const resolvedParams = await params;
  const id = resolvedParams.id;

  // طباعة الـ ID للتأكد في الـ Terminal
  console.log("Current Category ID:", id);

  const category = await getCategoryDetails(id);
  const subCategories = await getSubCategories(id);

  // عرض صفحة خطأ بسيطة في حال عدم العثور على القسم
  if (!category) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-red-500">Category Not Found!</h1>
        <p className="text-gray-500 mt-2">The ID we received is: <span className="font-mono bg-gray-100 p-1">{id}</span></p>
        <p className="text-sm text-gray-400 mt-4">Check if folder name is [id] and not id</p>
        <Link href="/" className="mt-6 text-green-600 font-bold hover:underline flex items-center gap-2">
           <ArrowLeft size={20} /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* البانر الأخضر العلوي */}
      <div className="bg-[#13b443] py-14 px-10 text-white shadow-inner">
        <div className="container mx-auto">
            <div className="flex gap-1 text-sm mb-4 opacity-80">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <Link href="/categories" className="hover:underline">Categorie</Link>
              <span>/ {category.name}</span>
            </div>
          
          <div className="flex items-center gap-6">
            <div className="bg-white p-3 rounded-2xl shadow-xl w-24 h-24 flex items-center justify-center">
               <img src={category.image} alt={category.name} className="max-h-full object-contain" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">{category.name}</h1>
              <p className="opacity-90 text-lg mt-1 font-medium">Explore all available subcategories</p>
            </div>
          </div>
        </div>
      </div>

      {/* عرض الأقسام الفرعية */}
      <div className="container mx-auto px-6 py-12">
        
        {/* زرار العودة للأقسام الرئيسية */}
        <Link 
          href="/categories" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#13b443] font-semibold mb-8 transition-colors group"
        >
          <div className="p-2 rounded-full bg-white shadow-sm border border-gray-100 group-hover:bg-green-50 transition-colors">
            <ArrowLeft size={18} />
          </div>
          Back to Categories
        </Link>

        <div className="flex items-center gap-3 mb-10 border-b pb-6">
           <div className="w-2 h-8 bg-[#13b443] rounded-full"></div>
           <h2 className="text-2xl font-black text-slate-800">
             {subCategories.length} Subcategories Found
           </h2>
        </div>

        {subCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {subCategories.map((sub) => (
              /* تحويل الكرت بالكامل إلى Link ينقلك لصفحة المنتجات */
              <Link 
                href={`/products?subcategory=${sub._id}`} 
                key={sub._id} 
                className="bg-white p-8 rounded-[2.5rem] border border-gray-100 hover:border-green-500 transition-all duration-300 group shadow-sm hover:shadow-xl cursor-pointer flex flex-col items-start"
              >
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-500 transition-colors duration-300">
                  <svg className="w-8 h-8 text-green-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-gray-800 group-hover:text-green-600">
                  {sub.name}
                </h3>
                <p className="text-gray-400 text-sm mt-2">Browse Items</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-gray-200">
            <p className="text-gray-400 text-xl font-medium">No subcategories found for this section.</p>
          </div>
        )}
      </div>
    </main>
  );
}