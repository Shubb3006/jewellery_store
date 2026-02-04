"use client";

import { useCartStore } from "@/store/useCartStore";
import useProductStore from "@/store/useProductStore";
import { Loader2, ShoppingCart, Heart, Minus, Plus } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { getProduct, product, gettingProduct, gettingCartItems } =
    useProductStore();
  const {
    addToCart,
    isAddingItem,
    cart,
    changeQuantity,
    isChangingQuantity,
    getCart,
  } = useCartStore();

  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (id) getProduct(id);
    getCart();
  }, [id]);

  if (gettingProduct || gettingCartItems) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex justify-center items-center gap-3">
        <h1 className="text-3xl font-bold">404</h1>
        <span>|</span>
        <p>This product could not be found.</p>
      </div>
    );
  }

  async function handleAddingProduct(product) {
    await addToCart(product);
  }

  const handleInc = async (product) => {
    await changeQuantity({ product, action: "inc" });
  };

  const handleDec = async (product) => {
    await changeQuantity({ product, action: "dec" });
  };

  const isOutOfStock = product.stock === 0 || !product.isActive;
  const cartItem = cart.find(
    (item) =>
      item.productId?._id === product._id || item.productId === product._id
  );
  const isMaxStockReached = cartItem && cartItem.quantity >= product.stock;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* IMAGE SECTION */}
      <div>
        {/* Main Image */}
        <div className="border rounded-xl overflow-hidden">
          <img
            loading="lazy"
            draggable={false}
            src={product.images?.[activeImage] || "/placeholder.png"}
            alt={product.name}
            className="w-full h-[300px] sm:h-[420px] object-cover"
          />
        </div>

        {/* Thumbnails */}
        {product.images?.length > 1 && (
          <div className="flex gap-3 mt-4 overflow-x-auto">
            {product.images.map((img, idx) => (
              <img
                loading="lazy"
                draggable={false}
                key={idx}
                src={img}
                onClick={() => setActiveImage(idx)}
                className={`w-16 h-16 object-cover rounded-lg cursor-pointer border ${
                  activeImage === idx ? "border-primary" : "border-transparent"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* PRODUCT INFO */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">{product.name}</h1>

        <p className="text-sm opacity-70">{product.category}</p>

        <p className="text-2xl font-semibold text-primary">₹{product.price}</p>

        {/* STATUS */}
        <div>
          {isOutOfStock && (
            <span className="badge badge-error">Out of Stock</span>
          )}
        </div>

        {/* DESCRIPTION */}
        <p className="text-gray-600 leading-relaxed">{product.description}</p>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          {cartItem ? (
            <div className="px-2 gap-3 flex items-center justify-start gap-3 rounded-lg">
              <button
                onClick={() => handleDec(product)}
                disabled={isChangingQuantity}
                className="btn btn-primary btn-sm"
              >
                <Minus size={16} />
              </button>

              <span className="font-semibold text-base">
                {cartItem.quantity}
              </span>

              <button
                onClick={() => handleInc(product)}
                disabled={isMaxStockReached || isChangingQuantity}
                className="btn btn-primary btn-sm"
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <button
              disabled={isOutOfStock || isAddingItem}
              onClick={() => handleAddingProduct(product)}
              className="btn btn-primary rounded-lg"
            >
              {isAddingItem ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  <ShoppingCart size={16} />
                  Add to Cart
                </>
              )}
            </button>
          )}

          <button className="btn btn-outline flex gap-2">
            <Heart size={18} />
            Wishlist
          </button>
        </div>

        {/* EXTRA INFO */}
        <div className="border-t pt-4 mt-6 text-sm text-gray-500 space-y-1">
          <p>• Free delivery on orders above ₹999</p>
          <p>• 7-day easy return</p>
          <p>• Secure payments</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
