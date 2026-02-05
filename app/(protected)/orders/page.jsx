"use client";

import { useEffect } from "react";
import { useOrderStore } from "@/store/useOrderStore";
import { Loader2 } from "lucide-react";

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
const OrdersPage = () => {
  const { orders, gettingOrders, getOrders } = useOrderStore();

  useEffect(() => {
    getOrders();
  }, []);

  {gettingOrders && <Loader2 className="animate-spin w-6 h-6" />;}

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-xl font-semibold">No orders yet 🛒</p>
        <p className="text-gray-500 mt-2">
          Looks like you haven’t placed any orders.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="border rounded-lg p-5 shadow-sm">
            {/* Order Header */}
            <div className="flex flex-wrap justify-between gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-medium">{order._id}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Order Date</p>
                <p className="font-medium">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Order Status</p>
                <span
                  className={`inline-block px-3 py-1 text-sm rounded-full font-medium ${
                    orderStatusStyles[order.orderStatus]
                  }`}
                >
                  {order.orderStatus}
                </span>
              </div>

              <div>
                <p className="text-sm text-gray-500">Payment Status</p>
                <span
                  className={`inline-block px-3 py-1 text-sm rounded-full font-medium ${
                    paymentStatusStyles[order.paymentStatus]
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <span
                  className={`inline-block px-3 py-1 text-sm rounded-full font-medium ${
                    paymentMethodStyles[order.paymentMethod]
                  }`}
                >
                  {order.paymentMethod}
                </span>
              </div>
            </div>

            {/* Items */}
            <div className="divide-y">
              {order.items.map((item) => (
                <div key={item._id} className="flex gap-4 py-4">
                  <div className="relative w-20 h-20 bg-gray-100 rounded">
                    <img
                      src={item.product.images?.[0] || "/placeholder.png"}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
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

            {/* Footer */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <p className="text-sm text-gray-600">
                Delivery Address: {order.address}
              </p>
              <p className="text-lg font-bold">Total: ₹{order.totalAmount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
