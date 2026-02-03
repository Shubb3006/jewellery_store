"use client";

import { useAdminStore } from "@/store/useAdminStore";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const orderStatusStyles = {
  PLACED: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  SHIPPED: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function AdminDashboard() {
  const {
    getAllUsers,
    allUsers,
    getAllOrders,
    allOrders,
    gettingAllOrders,
    gettingAllUsers,
  } = useAdminStore();

  useEffect(() => {
    getAllUsers();
    getAllOrders();
  }, []);
  console.log(allOrders);

  if (gettingAllOrders || gettingAllUsers) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  // TOTAL REVENUE
  const revenue = allOrders.reduce(
    (total, order) => total + (order.totalAmount || 0),
    0
  );

  // TODAY'S REVENUE
  const todayRevenue = allOrders
    .filter(
      (order) =>
        new Date(order.createdAt).toDateString() === new Date().toDateString()
    )
    .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

  // ORDER STATS
  const deliveredOrders = allOrders.filter(
    (order) => order.orderStatus === "DELIVERED"
  ).length;

  const pendingOrders = allOrders.length - deliveredOrders;

  return (
    <div className="space-y-6">
      {/* PAGE TITLE */}
      <h1 className="text-2xl font-bold ml-10 mt-1">Admin Dashboard</h1>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-base-100 shadow p-5 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 text-center">Total Orders</p>
            <h2 className="text-3xl font-bold text-center">
              {allOrders.length}
            </h2>
          </div>
        </div>

        <div className="card bg-base-100 shadow p-5 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Total Users</p>
            <h2 className="text-3xl font-bold text-center">
              {allUsers.length}
            </h2>
          </div>
        </div>

        <div className="card bg-base-100 shadow p-5 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 text-center">Total Revenue</p>
            <h2 className="text-3xl font-bold text-center">
              ₹{revenue.toLocaleString("en-IN")}
            </h2>
          </div>
        </div>

        <div className="card bg-base-100 shadow p-5 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 text-center">Today’s Revenue</p>
            <h2 className="text-3xl font-bold text-center">
              ₹{todayRevenue.toLocaleString("en-IN")}
            </h2>
          </div>
        </div>
      </div>

      {/* QUICK INSIGHTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card bg-base-100 shadow p-5">
          <p className="text-sm text-gray-500">Pending Orders</p>
          <h2 className="text-2xl font-bold">{pendingOrders}</h2>
        </div>

        <div className="card bg-base-100 shadow p-5">
          <p className="text-sm text-gray-500">Delivered Orders</p>
          <h2 className="text-2xl font-bold">{deliveredOrders}</h2>
        </div>
      </div>

      {/* RECENT ORDERS */}
      <div className="card bg-base-100 shadow p-5">
        <h2 className="font-semibold mb-4">Recent Orders</h2>

        {allOrders.length === 0 ? (
          <p className="text-gray-500 text-sm">No orders yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>User</th>
                  <th>Status</th>
                  <th className="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {allOrders.slice(0, 5).map((order) => (
                  <tr key={order._id}>
                    <td>{order._id.slice(-6)}</td>
                    <td>{order.userId?.name || "User"}</td>
                    <td>
                      <span
                        className={`inline-block rounded-full px-3 py-1 ${
                          orderStatusStyles[order.orderStatus]
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="text-right">
                      ₹{order.totalAmount.toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
