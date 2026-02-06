"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Loader2, Minus, Plus, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

const ProductsPage = ({ products }) => {
  const { addToCart, cart, isAddingItem, changeQuantity } = useCartStore();
  const [addingProductId, setAddingProductId] = useState(null);
  const [changingQuantityId, setChangingQuantityId] = useState(null);

  async function handleAddingProduct(product) {
    setAddingProductId(product._id);
    await addToCart(product);
    setAddingProductId(null);
  }

  const handleInc = async (product) => {
    setChangingQuantityId(product._id);
    await changeQuantity({ product, action: "inc" });
    setChangingQuantityId(null);
  };

  const handleDec = async (product) => {
    setChangingQuantityId(product._id);
    await changeQuantity({ product, action: "dec" });
    setChangingQuantityId(null);
  };
  console.log(products);

  return (
    <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((p) => {
        const isUnavailable = !p || p.isActive === false || p.stock === 0;
        const cartItem = cart.find(
          (item) => item.productId?._id === p._id || item.productId === p._id
        );
        const isMaxStockReached = cartItem && cartItem.quantity >= p.stock;
        return (
          <div
            key={p._id}
            className="group relative rounded-xl border border-gray-200 shadow-sm 
      hover:shadow-xl hover:-translate-y-1 
      transition-all duration-300 overflow-hidden
      text-sm"
          >
            {/* CLICKABLE PART */}
            <Link href={`/products/${p._id}`}>
              <div className="relative h-36 sm:h-44 md:h-52 overflow-hidden cursor-pointer">
                <img
                  loading="lazy"
                  draggable={false}
                  src={p.images?.[0]}
                  alt={p.name}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                />

                {isUnavailable && (
                  <span className="absolute top-3 left-3 badge badge-error text-xs">
                    Out of stock
                  </span>
                )}
              </div>

              <div className="p-4">
                <h2 className="text-xs sm:text-sm font-medium line-clamp-2 min-h-[32px] sm:min-h-[40px]">
                  {p.name}
                </h2>

                <p className="text-base sm:text-lg font-bold mt-1 sm:mt-2">
                  ₹{p.price}
                </p>
              </div>
            </Link>

            {/* ACTION AREA (NOT CLICKABLE FOR NAVIGATION) */}
            <div className="px-4 pb-4 flex justify-center">
              {cartItem ? (
                <div className="flex items-center gap-2 border px-1 py-1 rounded-lg">
                  <button
                    onClick={() => handleDec(p)}
                    disabled={changingQuantityId === p._id}
                    className="btn btn-sm"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="font-semibold text-base min-w-[24px] text-center">
                    {cartItem.quantity}
                  </span>

                  <button
                    onClick={() => handleInc(p)}
                    disabled={isMaxStockReached || changingQuantityId === p._id}
                    className={`btn btn-sm`}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              ) : (
                <button
                  disabled={
                    isUnavailable || (isAddingItem && addingProductId === p._id)
                  }
                  onClick={() => handleAddingProduct(p)}
                  className="btn btn-primary btn-sm sm:btn-md w-full rounded-lg"
                >
                  {isAddingItem && addingProductId === p._id ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <>
                      <ShoppingCart size={16} />
                      Add to Cart
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsPage;
