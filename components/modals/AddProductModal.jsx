"use client";
import React, { useState } from "react";
import { useAdminStore } from "@/store/useAdminStore";
import { Loader2, Plus } from "lucide-react";
import toast from "react-hot-toast";

const AddProductModal = ({ onClose }) => {
  const { isAddingProduct, addProduct, uploadImages } = useAdminStore();
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
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
    if (images.length === 0)
      return toast.error("At least one image is required");

    try {
      const imageUrls = await uploadImages(images);
      const success = await addProduct({ ...formData, images: imageUrls });
      if (success) onClose();
    } catch (err) {
      toast.error("Failed to add product");
    }
  }

  return (
    <>
      <div className="modal modal-open">
        <div
          className="modal-backdrop backdrop-blur-sm bg-black/40"
          onClick={onClose}
        />

        <div className="modal-box max-w-3xl p-6">
          {/* Header */}
          <h2 className="text-2xl font-bold text-center mb-6">Add Product</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Inputs grid */}
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
              placeholder="Product Description"
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            {/* Image upload */}
            <div className="space-y-2">
              <label
                htmlFor="product-images"
                className="flex flex-col items-center justify-center
          h-36 border-2 border-dashed rounded-lg cursor-pointer
          hover:border-primary transition bg-base-100"
              >
                <Plus className="w-8 h-8 text-gray-400" />
                <span className="text-sm text-gray-500 mt-1">
                  Click to upload images (max 8)
                </span>
              </label>

              <input
                id="product-images"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {
                  const files = [...e.target.files];
                  if (files.length > 8) {
                    toast.error("Max 8 images allowed");
                    return;
                  }
                  setImages(files);
                  e.target.value = "";
                }}
              />

              {images.length > 0 && (
                <p className="text-xs text-gray-500">
                  {images.length} image(s) selected
                </p>
              )}
            </div>

            {/* Image previews */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {images.map((file, index) => (
                  <div
                    key={index}
                    className="relative h-24 rounded-lg overflow-hidden border"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setImages((prev) => prev.filter((_, i) => i !== index))
                      }
                      className="absolute top-1 right-1
                bg-black/70 text-white rounded-full
                w-5 h-5 text-xs flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <button type="button" className="btn btn-ghost" onClick={onClose}>
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isAddingProduct}
              >
                {isAddingProduct ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Save Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProductModal;
