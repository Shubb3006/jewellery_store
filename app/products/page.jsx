"use client";

import ProductsPage from "@/components/Product";
import ProductsSkeleton from "@/components/skeletons/ProductsSkeleton";
import { useCartStore } from "@/store/useCartStore";
import useProductStore from "@/store/useProductStore";
import { useEffect } from "react";

export default function Home() {
  const { getAllProducts, products, gettingAllProducts } = useProductStore();
  const { gettingCartItems, getCart } = useCartStore();

  useEffect(() => {
    getCart();
    getAllProducts();
  }, []);


  if (gettingAllProducts || gettingCartItems) return <ProductsSkeleton />;

  return (
    <div className="min-h-[calc(100vh-64px)]">
      {/* PRODUCTS SECTION */}
      <section className="p-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">All Products</h2>
        {!gettingAllProducts && products.length === 0 ? (
          <p className="text-center text-gray-500">No products available</p>
        ) : (
          <ProductsPage products={products} />
        )}
      </section>
    </div>
  );
}
