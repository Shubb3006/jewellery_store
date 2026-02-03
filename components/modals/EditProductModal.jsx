"use client";
import React, { useState } from "react";
import { useAdminStore } from "@/store/useAdminStore";
import { Loader2 } from "lucide-react";

const EditProductModal = ({ product, onClose }) => {
  const { editProduct, isEditngProduct } = useAdminStore();
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    category: product.category,
    stock: product.stock,
    isActive: product.isActive,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const success = await editProduct(product._id, formData);
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
            />

            <input
              className="input input-bordered"
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: Number(e.target.value) })
              }
            />

            <input
              className="input input-bordered"
              type="number"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: Number(e.target.value) })
              }
            />

            <input
              className="input input-bordered"
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />

            <select
              className="select select-bordered"
              value={formData.isActive}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  isActive: e.target.value === "true",
                })
              }
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>

            <div className="modal-action">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isEditngProduct}
              >
                {isEditngProduct ? (
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

export default EditProductModal;
