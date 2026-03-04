// "use client";

// import { Menu, X } from "lucide-react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useState } from "react";

// export default function SidebarFilters() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const activeCategory = searchParams.get("category");
//   const activeSort = searchParams.get("sort");

//   const [isOpen, setIsOpen] = useState(false);

//   const hasFilters = activeCategory || activeSort;

//   const categories = ["ring", "watch", "chain", "bracelet"];

//   return (
//     <>
//       <div className="md:hidden">
//         <button
//           onClick={() => setIsOpen(true)}
//           className="p-2 rounded-lg hover:bg-base-100 transition"
//         >
//           <Menu size={22} />
//         </button>
//       </div>
//       <div
//         className={`fixed inset-0 z-50 transition-all duration-300 ${
//           isOpen ? "block" : "hidden"
//         }`}
//       >
//         <div
//           onClick={() => setIsOpen(false)}
//           className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
//             isOpen ? "opacity-100" : "opacity-0"
//           }`}
//         />
//         <div
//           className={`absolute left-0 top-0 h-full w-72 bg-base-100 shadow-xl p-6 space-y-8 transform transition-transform duration-300 ${
//             isOpen ? "translate-x-0" : "-translate-x-full"
//           }`}
//         >
//           <div className="flex justify-between items-center">
//             <h2 className="text-xl font-bold">Filters</h2>
//             <button onClick={() => setIsOpen(false)}>
//               <X size={22} />
//             </button>
//           </div>
//           <div className="space-y-3">
//             <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
//               Sort By
//             </h3>

//             <select
//               value={activeSort || ""}
//               className="select w-full"
//               onChange={(e) => {
//                 const params = new URLSearchParams(searchParams.toString());

//                 if (e.target.value) {
//                   params.set("sort", e.target.value);
//                 } else {
//                   params.delete("sort");
//                 }

//                 router.replace(`/products?${params.toString()}`);
//                 setIsOpen(false);
//               }}
//             >
//               <option value="">Default</option>
//               <option value="price-asc">Price: Low to High</option>
//               <option value="price-desc">Price: High to Low</option>
//               <option value="newest">Newest</option>
//             </select>
//           </div>

//           <div>
//             <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
//               Categories
//             </h3>

//             <div className="flex flex-col gap-2">
//               {categories.map((cat) => (
//                 <button
//                   key={cat}
//                   onClick={() => {
//                     const params = new URLSearchParams(searchParams.toString());
//                     params.set("category", cat);
//                     router.replace(`/products?${params.toString()}`);
//                     setIsOpen(false);
//                   }}
//                   className={`text-left px-4 py-2 rounded-xl transition-all duration-200 ${
//                     activeCategory === cat
//                       ? "bg-black text-white shadow-md"
//                       : "hover:bg-base-200"
//                   }`}
//                 >
//                   {cat[0].toUpperCase() + cat.slice(1)}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       <aside className="hidden md:block md:w-50 lg:w-64 bg-base-100 border-r px-6 py-8 space-y-10">
//         {/* TITLE */}
//         <div className="flex items-center justify-between">
//           <h2 className="text-2xl font-bold tracking-tight">Filters</h2>

//           {hasFilters && (
//             <button
//               onClick={() => router.replace("/products")}
//               className="text-xs font-medium text-red-500 hover:underline cursor-pointer"
//             >
//               Clear
//             </button>
//           )}
//         </div>

//         {/* SORT SECTION */}
//         <div className="space-y-3">
//           <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
//             Sort By
//           </h3>

//           <select
//             value={activeSort || ""}
//             className="select"
//             onChange={(e) => {
//               const params = new URLSearchParams(searchParams.toString());

//               if (e.target.value) {
//                 params.set("sort", e.target.value);
//               } else {
//                 params.delete("sort");
//               }

//               router.replace(`/products?${params.toString()}`);
//             }}
//           >
//             <option value="">Default</option>
//             <option value="price-asc">Price: Low to High</option>
//             <option value="price-desc">Price: High to Low</option>
//             <option value="newest">Newest</option>
//           </select>
//         </div>

//         {/* CATEGORY SECTION */}
//         <div className="space-y-3">
//           <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
//             Categories
//           </h3>

//           <div className="flex flex-col gap-2">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 //   onClick={() =>
//                 //     router.push(`/products?category=${cat}&sort=${activeSort}`)
//                 //   }
//                 onClick={() => {
//                   const params = new URLSearchParams(searchParams.toString());
//                   params.set("category", cat);
//                   router.replace(`/products?${params.toString()}`);
//                 }}
//                 className={`text-left px-4 py-2 rounded-xl transition-all duration-200 ${
//                   activeCategory === cat
//                     ? "bg-black text-white shadow-md scale-[1.02]"
//                     : "hover:bg-base-200 cursor-pointer"
//                 }`}
//               >
//                 {cat[0].toUpperCase() + cat.slice(1)}
//               </button>
//             ))}
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }

"use client";

import { Menu, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SidebarFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category");
  const activeSort = searchParams.get("sort");

  const [isOpen, setIsOpen] = useState(false);

  const hasFilters = activeCategory || activeSort;

  const categories = ["ring", "watch", "chain", "bracelet"];

  // 🔥 Prevent background scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // 🔥 Reusable param updater
  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set(key, value);
    else params.delete(key);

    router.replace(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    router.replace("/products");
    setIsOpen(false);
  };

  return (
    <>
      {/* ================= MOBILE BUTTON ================= */}
      <div className="md:hidden relative p-4 border-b">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-lg hover:bg-base-100 transition"
        >
          <Menu size={22} />
        </button>

        {/* Optional Filter Count Badge */}
        {hasFilters && (
          <span className="absolute top-3 left-8 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {(activeCategory ? 1 : 0) + (activeSort ? 1 : 0)}
          </span>
        )}
      </div>

      {/* ================= MOBILE DRAWER ================= */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-black/40 transition-opacity duration-300"
        />

        {/* Sliding Panel */}
        <div
          className={`absolute left-0 top-0 h-full w-72 bg-base-100 shadow-xl p-6 space-y-8 transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Filters</h2>
            <button onClick={() => setIsOpen(false)}>
              <X size={22} />
            </button>
          </div> */}
          <div className="flex items-center justify-between">
  <h2 className="text-xl font-bold">Filters</h2>

  <div className="flex items-center gap-3">
    {hasFilters && (
      <button
        onClick={clearFilters}
        className="text-xs font-medium text-red-500 hover:underline"
      >
        Clear
      </button>
    )}

    <button onClick={() => setIsOpen(false)}>
      <X size={22} />
    </button>
  </div>
</div>

          <FilterContent
            activeCategory={activeCategory}
            activeSort={activeSort}
            categories={categories}
            updateParam={updateParam}
            clearFilters={clearFilters}
            hasFilters={hasFilters}
            closeDrawer={() => setIsOpen(false)}
            mobile
          />
        </div>
      </div>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden md:block md:w-56 lg:w-64 bg-base-100 border-r px-6 py-8 space-y-10">
        <FilterContent
          activeCategory={activeCategory}
          activeSort={activeSort}
          categories={categories}
          updateParam={updateParam}
          clearFilters={clearFilters}
          hasFilters={hasFilters}
        />
      </aside>
    </>
  );
}

/* ================= REUSABLE FILTER CONTENT ================= */

function FilterContent({
  activeCategory,
  activeSort,
  categories,
  updateParam,
  clearFilters,
  hasFilters,
  closeDrawer,
  mobile,
}) {
  return (
    <>
      {/* Header (Desktop Only) */}
      {!mobile && (
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Filters</h2>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-xs font-medium text-red-500 hover:underline"
            >
              Clear
            </button>
          )}
        </div>
      )}

      {/* Sort Section */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Sort By
        </h3>

        <select
          value={activeSort || ""}
          className="select w-full"
          onChange={(e) => {
            updateParam("sort", e.target.value);
            if (mobile && closeDrawer) closeDrawer();
          }}
        >
          <option value="">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {/* Category Section */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Categories
        </h3>

        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                updateParam("category", cat);
                if (mobile && closeDrawer) closeDrawer();
              }}
              className={`text-left px-4 py-2 rounded-xl transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-black text-white shadow-md"
                  : "hover:bg-base-200"
              }`}
            >
              {cat[0].toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
