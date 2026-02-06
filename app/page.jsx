"use client";

import ProductsPage from "@/components/Product";
import ProductsSkeleton from "@/components/skeletons/ProductsSkeleton";
import { useCartStore } from "@/store/useCartStore";
import useProductStore from "@/store/useProductStore";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const { getAllProducts, products, gettingAllProducts } = useProductStore();
  const { gettingCartItems, getCart } = useCartStore();

  useEffect(() => {
    getCart();
    getAllProducts();
  }, []);

  if (gettingAllProducts || gettingCartItems) return <ProductsSkeleton />;

  const featuedProducts = products.filter((p) => p.featured === true);

  return (
    <div className="min-h-[calc(100vh-64px)] ">
      {/* HERO SECTION */}
      <section className="bg-base-200 py-20 px-6 text-center ">
        <h1 className="text-4xl md:text-5xl font-bold">
          Shop Smart. Shop Fast.
        </h1>
        <p className="mt-4 text-gray-500 max-w-xl mx-auto">
          Discover quality products at the best prices. Delivered right to your
          doorstep.
        </p>
        <Link href="/products" className="btn btn-primary mt-6">
          <ShoppingCart size={18} />
          Start Shopping
        </Link>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="p-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>

        {!gettingAllProducts && featuedProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products available</p>
        ) : (
          <ProductsPage products={featuedProducts} />
        )}
      </section>
    </div>
  );
}
