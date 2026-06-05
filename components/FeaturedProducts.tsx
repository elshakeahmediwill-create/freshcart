"use client";
import React, { useEffect, useState } from "react";
import { Star, Plus, Heart, Eye, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useCart } from "../app/context/CartContext";
import { useWishlist } from "../app/context/WishlistContext"; // تأكد من المسار الصح

interface Product {
  id: string; 
  title: string;
  imageCover: string;
  category: { name: string };
  price: number;
  ratingsAverage: number;
}

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toggleWishlist, wishlistItems } = useWishlist();
  // ✅ Tالتعديل هنا: نقلنا الـ Hook قبل أي return أو if condition
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("https://ecommerce.routemisr.com/api/v1/products?limit=50")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  // لو الـ loading اشتغل، ريأكت هيكون قرا الـ useCart خلاص ومش هيطلع error
  if (loading) return <div className="text-center py-20 text-[#4FA74F] font-bold">Loading...</div>;

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-2 mb-10 border-l-4 border-[#4FA74F] pl-3">
        <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product) => {
          // الحسبة الصح للـ isFav لكل منتج جوه الـ map عشان العداد يعد فوراً والـ Error يختفي
          const isFav = wishlistItems?.some((item: any) => item.id === product.id || item._id === product.id);

          return (
            <div 
              key={product.id} 
              className="relative bg-white border border-transparent rounded-lg p-4 transition-all duration-300 hover:border-[#4FA74F] hover:shadow-xl group overflow-hidden"
            >
              {/* أيقونات ثابتة */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                <button 
                  onClick={() => toggleWishlist(product)} 
                  className="text-gray-600 hover:text-red-600 transition-colors p-2"
                >
                  {/* لو المنتج مضاف للمفضلة، القلب هيتلون بالأحمر الكامل fill */}
                  <Heart size={18} className={isFav ? "fill-red-600 text-red-600" : ""} />
                </button>
                
                <button className="text-gray-600 hover:text-green-600 transition-colors p-2">
                  <RefreshCw size={18} />
                </button>
                
                <Link 
                  href={`/product/${product.id}`} // تأكد لو الـ API بيستخدم id أو _id
                  className="text-gray-600 hover:text-green-600 transition-colors p-2"
                >
                  <Eye size={18} />
                </Link>
              </div>

              <div className="h-48 w-full mb-3">
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-[#4FA74F] font-medium uppercase">
                  {product.category.name}
                </span>
                <h3 className="text-[14px] font-bold text-gray-800 truncate">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>

                <div className="flex justify-between items-center mt-2">
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-gray-900">{product.price} EGP</span>
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-[11px] text-gray-500">{product.ratingsAverage}</span>
                    </div>
                  </div>
                  
                  {/* داخل الـ map بتاع المنتجات عند زرار الـ + */}
                  <button 
                    onClick={() => addToCart(product)} // نبعت الـ product كامل هنا
                    className="bg-[#4FA74F] text-white p-2 rounded-xl hover:bg-green-700"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedProducts;