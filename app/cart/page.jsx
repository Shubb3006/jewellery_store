"use client";

import { useCartStore } from "@/store/useCartStore";
import { useEffect, useMemo, useState } from "react";
import { Loader2, Minus, Plus } from "lucide-react";
import { useCheckoutStore } from "@/store/useCheckOutStore";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

const Page = () => {
  const router = useRouter();
  const {
    cart,
    gettingCartItems,
    getCart,
    changeQuantity,
    isChangingQuantity,
    deleteItem,
    isDeleting,
  } = useCartStore();

  const { checkOut, isCheckingOut } = useCheckoutStore();
  const { authUser } = useAuthStore();

  const [changingQuantityId, setChangingQuantityId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    getCart();
  }, [authUser]);

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

  const handleDelete = async (product) => {
    setDeletingId(product._id);
    await deleteItem(product);
    setDeletingId(null);
  };

  const handleCheckOut = async () => {
    const success = await checkOut();
    if (success) router.push("/orders");
  };

  if (gettingCartItems) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  const { totalQuantity, totalAmount } = useMemo(() => {
    return cart.reduce(
      (acc, i) => {
        acc.totalQuantity += i.quantity;
        acc.totalAmount += (i.productId?.price || 0) * i.quantity;
        return acc;
      },
      { totalQuantity: 0, totalAmount: 0 }
    );
  }, [cart]);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* CART ITEMS */}
      <div className="md:col-span-2 space-y-4">
        <h1 className="text-2xl font-bold">Your Cart 🛒</h1>

        {cart.length === 0 ? (
          <div className="bg-base-200 p-6 rounded-xl text-center">
            <p className="text-lg">Your cart is empty</p>
          </div>
        ) : (
          cart.map((item) => {
            const product = item.productId;

            const isUnavailable =
              item.unavailable ||
              !product ||
              product.isActive === false ||
              product.stock === 0;

            const outOfStock = item.quantity > product?.stock;

            return (
              <div
                key={product?._id || item._id}
                className={`card bg-base-100 shadow-md p-4 flex flex-col sm:flex-row gap-4 ${
                  isUnavailable ? "opacity-60 border border-error" : ""
                } ${outOfStock ? "border border-error" : ""}`}
              >
                {/* IMAGE */}
                <img
                  src={product?.images?.[0] || "/placeholder.png"}
                  alt={product?.name || "Product"}
                  className="w-full sm:w-24 h-40 sm:h-24 object-cover rounded-lg"
                />

                {/* INFO */}
                <div className="flex-1">
                  <h2 className="font-semibold text-lg">
                    {product?.name || "Deleted Product"}
                  </h2>

                  {product && (
                    <p className="text-sm opacity-70">₹{product.price} each</p>
                  )}

                  {isUnavailable && (
                    <p className="text-error text-sm mt-1">
                      Product unavailable. Please remove it.
                    </p>
                  )}

                  {outOfStock && (
                    <p className="text-error text-sm mt-1">
                      Please decrease the quantity.
                    </p>
                  )}

                  {/* QUANTITY */}
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => handleDec(product)}
                      disabled={
                        isUnavailable ||
                        (isChangingQuantity &&
                          changingQuantityId === product._id)
                      }
                    >
                      <Minus size={16} />
                    </button>

                    <span className="font-medium">{item.quantity}</span>

                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => handleInc(product)}
                      disabled={
                        isUnavailable ||
                        outOfStock ||
                        (isChangingQuantity &&
                          changingQuantityId === product._id)
                      }
                    >
                      <Plus size={16} />
                    </button>

                    <button
                      className="btn btn-sm btn-error btn-outline"
                      disabled={isDeleting && deletingId === product?._id}
                      onClick={() => handleDelete(product)}
                    >
                      {isDeleting && deletingId === product?._id ? (
                        <Loader2 className="animate-spin w-4 h-4" />
                      ) : (
                        "Delete"
                      )}
                    </button>

                    {isChangingQuantity &&
                      changingQuantityId === product._id && (
                        <Loader2 className="animate-spin w-4 h-4" />
                      )}
                  </div>
                </div>

                {/* PRICE */}
                {!isUnavailable && (
                  <div className="text-left sm:text-right mt-2 sm:mt-0">
                    <p className="font-bold text-lg">
                      ₹{product.price * item.quantity}
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* SUMMARY */}
      <div className="card bg-base-100 shadow-lg p-6 h-fit sm:sticky sm:top-24">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        <div className="flex justify-between mb-2">
          <span>Total Items</span>
          <span>{totalQuantity}</span>
        </div>

        <div className="flex justify-between mb-4">
          <span>Total Price</span>
          <span className="font-bold">₹{totalAmount}</span>
        </div>

        <button
          className="btn btn-primary w-full"
          onClick={handleCheckOut}
          disabled={isCheckingOut}
        >
          {isCheckingOut ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Proceed to Checkout"
          )}
        </button>
      </div>
    </div>
  );
};

export default Page;
