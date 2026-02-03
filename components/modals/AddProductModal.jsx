"use client";
import React, { useState } from "react";
import { useAdminStore } from "@/store/useAdminStore";
import { Loader2 } from "lucide-react";

const AddProductModal = ({ onClose }) => {
  const { isAddingProduct, addProduct } = useAdminStore();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const success = await addProduct(formData);
    if (success) onClose();
  }

  return (
    <>
      <div className={`modal modal-open`}>
        <div
          className="modal-backdrop backdrop-blur-sm bg-black/40"
          onClick={onClose}
        />
        <div className="modal-box">
          <h2 className="text-2xl font-bold text-center text-primary">
            Edit Product
          </h2>

          <form onSubmit={(e) => handleSubmit(e)} className="card-body gap-4">
            <input
              className="input input-bordered"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter the name of the product"
            />

            <input
              className="input input-bordered"
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: Number(e.target.value) })
              }
              placeholder="Enter the Price of the product"
            />

            <input
              className="input input-bordered"
              type="number"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: Number(e.target.value) })
              }
              placeholder="Enter the Stock of the product"
            />

            <input
              className="input input-bordered"
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              placeholder="Enter the Category of the product"
            />

            <input
              className="input input-bordered"
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter the description of the product"
            />

            <div className="modal-action">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isAddingProduct}
              >
                {isAddingProduct ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Save"
                )}
              </button>
              <button type="button" className="btn btn-ghost" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProductModal;
