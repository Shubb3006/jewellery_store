
"use client";

import React, { useState, useEffect } from "react";
import { Loader2, Eye } from "lucide-react";
import { useAdminStore } from "@/store/useAdminStore";
import ShowOrderModal from "@/components/modals/ShowOrderModal";

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
    <div className="flex flex-col min-h-screen">
      <h1 className="text-2xl font-bold mb-5 pl-5">All Orders</h1>

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
          <table className="min-w-[800px] w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Order ID
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  User
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Date
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Order Status
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Payment Status
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Payment Method
                </th>
                <th className="px-4 py-2 text-right text-sm font-medium">
                  Total
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allOrders.map((order) => (
                <tr key={order._id}>
                  <td className="px-4 py-2 truncate">{order._id.slice(-6)}</td>
                  <td className="px-4 py-2 truncate max-w-[120px]">
                    {order.userId?.name || order.userId?.email || "Unknown"}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-block px-2 py-1 text-xs sm:text-sm rounded-full font-medium ${
                        orderStatusStyles[order.orderStatus]
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-block px-2 py-1 text-xs sm:text-sm rounded-full font-medium ${
                        paymentStatusStyles[order.paymentStatus]
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-block px-2 py-1 text-xs sm:text-sm rounded-full font-medium ${
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
        <ShowOrderModal
          selectedOrder={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
