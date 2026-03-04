"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useProductStore from "@/store/useProductStore";
import ProductsPage from "@/components/Product";
import AllProductsPageSkeleton from "./skeletons/ProductsSkeleton";

export default function ProductSection() {
  const searchParams = useSearchParams();
  const { getAllProducts, products, gettingAllProducts } = useProductStore();

  const activeCategory = searchParams.get("category");
  const activeSort = searchParams.get("sort");

  useEffect(() => {
    getAllProducts(activeCategory, activeSort);
  }, [activeCategory, activeSort]);

  console.log(products);

  if (true) return <AllProductsPageSkeleton />;

  return (
    <main className="flex-1 p-8">
      {products.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          No products available
        </div>
      ) : (
        <ProductsPage products={products} />
      )}
    </main>
  );
}
