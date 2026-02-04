"use client";
import React, { useState } from "react";
import { useAdminStore } from "@/store/useAdminStore";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const EditProductModal = ({ product, onClose }) => {
  const { editProduct, isEditngProduct } = useAdminStore();

  const [formData, setFormData] = useState({
    name: product.name || "",
    price: product.price || 0,
    category: product.category || "",
    stock: product.stock || 0,
    isActive: product.isActive,
    description: product.description || "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name.trim()) return toast.error("Name is required");
    if (!formData.price || formData.price <= 0)
      return toast.error("Valid price required");
    if (!formData.description.trim())
      return toast.error("Description is required");
    if (!formData.stock || formData.stock <= 0)
      return toast.error("Stock is required");
   

    const success = await editProduct(product._id, formData);
    if (success) onClose();
  }

  return (
    <div className="modal modal-open">
      <div
        className="modal-backdrop backdrop-blur-sm bg-black/40"
        onClick={onClose}
      />

      <div className="modal-box max-w-3xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Product</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="input input-bordered w-full"
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <input
              className="input input-bordered w-full"
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: Number(e.target.value) })
              }
            />

            <input
              className="input input-bordered w-full"
              type="number"
              placeholder="Stock"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: Number(e.target.value) })
              }
            />

            <input
              className="input input-bordered w-full"
              placeholder="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
          </div>

          {/* Description */}
          <textarea
            className="textarea textarea-bordered w-full"
            rows={3}
            placeholder="Product Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          {/* Status */}
          <select
            className="select select-bordered w-full"
            value={formData.isActive ? "true" : "false"}
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

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isEditngProduct}
            >
              {isEditngProduct ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
