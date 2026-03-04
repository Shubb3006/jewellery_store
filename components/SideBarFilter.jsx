"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SidebarFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");
  const activeSort = searchParams.get("sort");

  const hasFilters = activeCategory || activeSort;

  const categories = ["ring", "watch", "chain", "bracelet"];

  return (
    <aside className="w-64 bg-base-100 border-r px-6 py-8 space-y-10">
      {/* TITLE */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Filters</h2>

        {hasFilters && (
          <button
            onClick={() => router.replace("/products")}
            className="text-xs font-medium text-red-500 hover:underline cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      {/* SORT SECTION */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Sort By
        </h3>

        <select
          value={activeSort || ""}
          className="select"
          onChange={(e) => {
            const params = new URLSearchParams(searchParams.toString());

            if (e.target.value) {
              params.set("sort", e.target.value);
            } else {
              params.delete("sort");
            }

            router.replace(`/products?${params.toString()}`);
          }}
        >
          <option value="">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {/* CATEGORY SECTION */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Categories
        </h3>

        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              //   onClick={() =>
              //     router.push(`/products?category=${cat}&sort=${activeSort}`)
              //   }
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("category", cat);
                router.replace(`/products?${params.toString()}`);
              }}
              className={`text-left px-4 py-2 rounded-xl transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-black text-white shadow-md scale-[1.02]"
                  : "hover:bg-base-200 cursor-pointer"
              }`}
            >
              {cat[0].toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
