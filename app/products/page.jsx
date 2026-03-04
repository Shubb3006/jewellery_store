// "use client";

// import ProductsPage from "@/components/Product";
// import ProductsSkeleton from "@/components/skeletons/ProductsSkeleton";
// import { useCartStore } from "@/store/useCartStore";
// import useProductStore from "@/store/useProductStore";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect } from "react";

// export default function Home() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const { getAllProducts, products, gettingAllProducts } = useProductStore();
//   const { gettingCartItems, getCart } = useCartStore();

//   const activeCategory = searchParams.get("category");
//   const activeSort = searchParams.get("sort");
//   const categories = ["ring", "watch", "chain", "bracelet"];

//   useEffect(() => {
//     getCart();
//     getAllProducts(activeCategory, activeSort);
//   }, [activeCategory, activeSort]);

//   if (gettingAllProducts || gettingCartItems) return <ProductsSkeleton />;

//   return (
//     <div className="min-h-[calc(100vh-64px)] bg-base-100 flex">
//       {/* SIDEBAR */}
//       <aside className="w-64 bg-base-100 shadow-sm p-6 border-r">
//         <h2 className="text-xl font-semibold mb-6">Filters</h2>

//         <h3 className="text-sm font-medium mb-3 uppercase tracking-wide">
//           Categories
//         </h3>

//         <div className="space-y-2">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() =>
//                 router.push(`/products?category=${cat}&sort=${activeSort}`)
//               }
//               className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
//                 activeCategory === cat
//                   ? "bg-black shadow-md"
//                   : "hover:bg-base-100"
//               }`}
//             >
//               {cat.charAt(0).toUpperCase() + cat.slice(1)}
//             </button>
//           ))}
//         </div>

//         <button
//           onClick={() => router.push(`/products`)}
//           className="mt-6 text-sm"
//         >
//           Clear Filter
//         </button>
//       </aside>

//       {/* MAIN SECTION */}
//       <main className="flex-1 p-8">
//         {/* TOP BAR */}
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold">
//               {activeCategory
//                 ? `${
//                     activeCategory.charAt(0).toUpperCase() +
//                     activeCategory.slice(1)
//                   } Collection`
//                 : "All Products"}
//             </h1>
//             <p className="text-gray-500 mt-1">
//               {products.length} Products Found
//             </p>
//           </div>

//           <select
//             onChange={(e) =>
//               router.push(
//                 `/products?category=${activeCategory || ""}&sort=${
//                   e.target.value
//                 }`
//               )
//             }
//             className="border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
//           >
//             <option value="">Sort By</option>
//             <option value="price-asc">Price: Low to High</option>
//             <option value="price-desc">Price: High to Low</option>
//             <option value="newest">Newest</option>
//           </select>
//         </div>

//         {/* PRODUCT GRID */}
        // {products.length === 0 ? (
        //   <div className="text-center text-gray-500 mt-20">
        //     No products available
        //   </div>
        // ) : (
        //   <ProductsPage products={products} />
        // )}
//       </main>
//     </div>
//   );
// }

import ProductSection from "@/components/AllProductPage";
import SidebarFilters from "@/components/SideBarFilter";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-base-100 flex">
      <SidebarFilters />
      <ProductSection />
    </div>
  );
}
