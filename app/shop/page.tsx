// app/shop/page.tsx
"use client"; // ضروري عشان بنستخدم Hooks زي useEffect

import React, { useState, useEffect } from "react";
import AllProductsHeader from "../../components/AllProductsHeader/AllProductsHeader";
import ProductGrid from "../../components/ProductGrid/ProductGrid";

import axios from "axios";
import Link from "next/link";
export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // نستخدم الـ API الخاص بـ Route للهواتف أو المنتجات
        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
        setProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* 1. الهيدر الأخضر بالتدرج والوصف */}
      <AllProductsHeader />

      {/* 2. شبكة المنتجات اللي فيها الـ 40 منتج */}
      {loading ? (
        <div className="flex justify-center items-center py-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4FA74F]"></div>
        </div>
      ) : (
        <div className="container mx-auto">
             <ProductGrid products={products} />
        </div>
        
      )}
      
    </main>
  );
}