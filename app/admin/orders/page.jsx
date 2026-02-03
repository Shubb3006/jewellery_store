"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2, Eye, Users, Box, Home, LogOut } from "lucide-react";
import { useAdminStore } from "@/store/useAdminStore";

const orderStatusStyles = {
  PLACED: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  SHIPPED: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const paymentStatusStyles = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PAID: "bg-green-100 text-green-700",
  FAILED: "bg-red-100 text-red-700",
};

const paymentMethodStyles = {
  COD: "bg-gray-100 text-gray-700",
  ONLINE: "bg-indigo-100 text-indigo-700",
};

export default function AdminDashboard() {
  const { allOrders, getAllOrders, gettingOrders } = useAdminStore();
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">All Orders</h1>

        {gettingOrders ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <Loader2 className="animate-spin w-8 h-8" />
          </div>
        ) : allOrders.length === 0 ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <p className="text-xl font-semibold">No orders found</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Order ID</th>
                  <th className="px-4 py-2 text-left">User</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Order Status</th>
                  <th className="px-4 py-2 text-left">Payment Status</th>
                  <th className="px-4 py-2 text-left">Payment Method</th>
                  <th className="px-4 py-2 text-right">Total</th>
                  <th className="px-4 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {allOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{order._id.slice(-6)}</td>
                    <td className="px-4 py-2">
                      {order.userId?.name || order.userId?.email || "Unknown"}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-block px-2 py-1 text-sm rounded-full font-medium ${
                          orderStatusStyles[order.orderStatus]
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-block px-2 py-1 text-sm rounded-full font-medium ${
                          paymentStatusStyles[order.paymentStatus]
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-block px-2 py-1 text-sm rounded-full font-medium ${
                          paymentMethodStyles[order.paymentMethod]
                        }`}
                      >
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-right font-semibold">
                      ₹{order.totalAmount}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="btn btn-sm btn-outline flex items-center gap-1"
                      >
                        <Eye size={16} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 overflow-y-auto max-h-[80vh] relative">
              <h2 className="text-xl font-bold mb-4">Order Details</h2>
              <button
                className="btn btn-sm btn-error absolute top-4 right-4"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>

              <div className="space-y-4">
                {selectedOrder.items.map((item) => (
                  <div key={item._id} className="flex gap-4 border-b pb-2">
                    <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden">
                      <img
                        src={item.product?.images?.[0] || "/placeholder.png"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-500">
                        Price: ₹{item.priceAtOrder}
                      </p>
                    </div>
                    <div className="font-semibold">
                      ₹{item.priceAtOrder * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t pt-4 flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Delivery Address: {selectedOrder.address}
                </p>
                <p className="text-lg font-bold">
                  Total: ₹{selectedOrder.totalAmount}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
