"use client";

import { useAdminStore } from "@/store/useAdminStore";
import useProductStore from "@/store/useProductStore";
import React, { useEffect, useState } from "react";
import EditProductModal from "@/components/modals/EditProductModal";
import AddProductModal from "@/components/modals/AddProductModal";
import { Loader2 } from "lucide-react";

const page = () => {
  const [editProduct, setEditProduct] = useState(null);
  const [addProduct, setAddProduct] = useState(false);
  const { products, gettingAllProducts, getAllProducts } = useProductStore();
  const { deleteProduct, changeAvailability } = useAdminStore();

  useEffect(() => {
    getAllProducts();
  }, []);

  async function handleEdit(product) {
    setEditProduct(product);
  }

  async function handleDel(productId) {
    await deleteProduct(productId);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold ml-10 ">Products</h1>
        <button className="btn btn-primary" onClick={() => setAddProduct(true)}>
          + Add Product
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow ">
        {gettingAllProducts ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <Loader2 className="animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <p className="text-xl font-semibold">No Products found</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Description
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Price
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Stock
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Category
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-4 py-2 text-right text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="px-4 py-2">{product.name}</td>
                    <td className="px-4 py-2">{product.description}</td>
                    <td className="px-4 py-2">₹{product.price}</td>
                    <td className="px-4 py-2">{product.stock}</td>
                    <td className="px-4 py-2">{product.category}</td>
                    <td className="px-4 py-2">
                      <div
                        className={`inline-block rounded-full px-2 py-1 ${
                          product.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        <select
                          className="bg-transparent outline-none"
                          value={product.isActive}
                          onChange={(e) =>
                            changeAvailability(product._id, e.target.value)
                          }
                        >
                          <option value="true">Available</option>
                          <option value="false">Unavailable</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-right flex gap-2 justify-end">
                      <button
                        className="btn btn-sm btn-outline btn-primary"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline btn-error"
                        onClick={() => handleDel(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      {editProduct && (
        <EditProductModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
        />
      )}
      {addProduct && <AddProductModal onClose={() => setAddProduct(false)} />}
    </div>
  );
};

export default page;
