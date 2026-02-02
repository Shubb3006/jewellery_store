"use client";
import { useCartStore } from "@/store/useCartStore";
import useProductStore from "@/store/useProductStore";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const { getAllProducts, products } = useProductStore();
  const { addToCart, isAddingItem } = useCartStore();
  const [addingProductId, setAddingProductId] = useState(null);

  useEffect(() => {
    getAllProducts();
  }, []);

  async function handleAddingProduct(product) {
    setAddingProductId(product._id);
    await addToCart(product);
    setAddingProductId(null);
  }
  dlckj

  return (
    <div className="min-h-[calc(100vh-60px)] p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => {
          const isUnavailable = !p || p.isActive === false || p.stock === 0;
          return (
            <div key={p._id} className="card bg-base-100 shadow">
              <figure>
                <img src={p.images[0]} alt={p.name} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{p.name}</h2>
                <p>₹{p.price}</p>
                <button
                  disabled={
                    isUnavailable || (isAddingItem && addingProductId === p._id)
                  }
                  className="btn btn-primary"
                  onClick={() => handleAddingProduct(p)}
                >
                  {isAddingItem && addingProductId === p._id ? (
                    <Loader2 className="animate-spin" />
                  ) : isUnavailable ? (
                    "Unavailable"
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
