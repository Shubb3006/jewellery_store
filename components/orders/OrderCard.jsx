"use client";

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

export default function OrderCard({ order, isAdmin = false, onStatusChange }) {
  return (
    <div className="border rounded-lg p-5 shadow-sm bg-base-100">
      {/* HEADER */}
      <div className="flex flex-wrap justify-between gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-medium">{order._id}</p>
          {isAdmin && (
            <p className="text-sm text-gray-500 mt-1">
              User: <span className="font-medium">{order.user?.name}</span>
            </p>
          )}
        </div>

        <div>
          <p className="text-sm text-gray-500">Order Date</p>
          <p className="font-medium">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* ORDER STATUS */}
        <div>
          <p className="text-sm text-gray-500">Order Status</p>

          {isAdmin ? (
            <select
              value={order.orderStatus}
              onChange={(e) => onStatusChange(order._id, e.target.value)}
              className="select select-sm"
            >
              {Object.keys(orderStatusStyles).map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          ) : (
            <span
              className={`inline-block px-3 py-1 text-sm rounded-full font-medium ${
                orderStatusStyles[order.orderStatus]
              }`}
            >
              {order.orderStatus}
            </span>
          )}
        </div>

        {/* PAYMENT STATUS */}
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

      {/* ITEMS */}
      <div className="divide-y">
        {order.items.map((item) => (
          <div key={item._id} className="flex gap-4 py-4">
            <img
              src={item.product.images?.[0] || "/placeholder.png"}
              className="w-20 h-20 rounded object-cover"
            />

            <div className="flex-1">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">
                Qty: {item.quantity} × ₹{item.priceAtOrder}
              </p>
            </div>

            <p className="font-semibold">
              ₹{item.quantity * item.priceAtOrder}
            </p>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t">
        <p className="text-sm text-gray-600">Address: {order.address}</p>
        <p className="text-lg font-bold">₹{order.totalAmount}</p>
      </div>
    </div>
  );
}
