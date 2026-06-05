"use client";
import React from "react";
import ProductCard from "../ProductCard/ProductCard";

const ProductGrid = ({ products }) => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* شريط المعلومات العلوي */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-sm text-gray-500">
            Showing <span className="font-bold text-gray-800">{products.length}</span> products
          </p>
          {/* هنا ممكن تضيف Select للـ Sorting مستقبلاً */}
        </div>

        {/* الشبكة */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((item) => (
<ProductCard key={item._id || item.id} product={item} />          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;