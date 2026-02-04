"use client";

import { useCartStore } from "@/store/useCartStore";
import useProductStore from "@/store/useProductStore";
import { Loader2, Minus, Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const { getAllProducts, products, gettingAllProducts } = useProductStore();
  const { addToCart, getCart, cart, isAddingItem, changeQuantity } =
    useCartStore();
  const [addingProductId, setAddingProductId] = useState(null);
  const [changingQuantityId, setChangingQuantityId] = useState(null);

  useEffect(() => {
    async function gettCart() {
      await getCart();
    }
    gettCart();
    getAllProducts();
  }, []);

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

  const featuedProducts = products.filter((p) => p.featured === true);
  console.log(featuedProducts);
  console.log(products);
  console.log(cart);

  return (
    <div className="min-h-[calc(100vh-64px)]">
      {/* HERO SECTION */}
      <section className="bg-base-200 py-20 px-6 text-center">
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

        {gettingAllProducts ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <Loader2 className="animate-spin" size={32} />
          </div>
        ) : featuedProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuedProducts.map((p) => {
              const isUnavailable = !p || p.isActive === false || p.stock === 0;
              const cartItem = cart.find(
                (item) =>
                  item.productId?._id === p._id || item.productId === p._id
              );

              return (
                <div
                  key={p._id}
                  className="group relative rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* CLICKABLE PART */}
                  <Link href={`/products/${p._id}`}>
                    <div className="relative h-52 overflow-hidden cursor-pointer">
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
                      <h2 className="text-sm font-medium line-clamp-2 min-h-[40px]">
                        {p.name}
                      </h2>

                      <p className="text-xl font-bold mt-2">₹{p.price}</p>
                    </div>
                  </Link>

                  {/* ACTION AREA (NOT CLICKABLE FOR NAVIGATION) */}
                  <div className="px-4 pb-4">
                    {cartItem ? (
                      <div className="flex items-center justify-between rounded-lg px-3 py-1">
                        <button
                          onClick={() => handleDec(p)}
                          disabled={changingQuantityId === p._id}
                          className="btn btn-primary btn-sm"
                        >
                          <Minus size={16} />
                        </button>

                        <span className="font-semibold text-base">
                          {cartItem.quantity}
                        </span>

                        <button
                          onClick={() => handleInc(p)}
                          disabled={changingQuantityId === p._id}
                          className="btn btn-primary btn-sm"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    ) : (
                      <button
                        disabled={
                          isUnavailable ||
                          (isAddingItem && addingProductId === p._id)
                        }
                        onClick={() => handleAddingProduct(p)}
                        className="btn btn-primary w-full rounded-lg"
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
        )}
      </section>
    </div>
  );
}
