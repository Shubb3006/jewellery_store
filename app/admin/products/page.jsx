"use client";
import { useAdminStore } from "@/store/useAdminStore";
import useProductStore from "@/store/useProductStore";
import React, { useEffect, useState } from "react";
import EditProductModal from "@/components/modals/EditProductModal";
import AddProductModal from "@/components/modals/AddProductModal";

const page = () => {
  const [editProduct, setEditProduct] = useState(null);
  const [addproduct, setAddproduct] = useState(false);
  const { products, gettingAllProducts, getAllProducts } = useProductStore();
  const { deleteProduct } = useAdminStore();
  useEffect(() => {
    getAllProducts();
  }, []);
  console.log(products);

  async function handleEdit(product) {
    setEditProduct(product);
  }
  async function handleDel(productId) {
    await deleteProduct(productId);
  }
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>

        <button
          className="bg-black text-white px-4 py-2 rounded hover:opacity-90"
          onClick={() => setAddproduct(true)}
        >
          + Add Product
        </button>
      </div>
      <div className="overflow-x-auto rounded shadow">
        <table className="w-full text-left">
          <thead className="text-sm uppercase">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Description</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Category</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.description}</td>
                <td className="p-3">{product.price}</td>
                <td className="p-3">{product.stock}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-2 rounded-full text-sm font-semibold ${
                      product.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="p-3 text-right space-x-3">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-error"
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

      {editProduct && (
        <EditProductModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
        />
      )}
      {addproduct && <AddProductModal onClose={() => setAddproduct(false)} />}
    </div>
  );
};

export default page;
