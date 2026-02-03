export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-base-100 shadow p-5">
          <p className="text-sm text-gray-500">Total Orders</p>
          <h2 className="text-3xl font-bold">128</h2>
        </div>

        <div className="card bg-base-100 shadow p-5">
          <p className="text-sm text-gray-500">Total Users</p>
          <h2 className="text-3xl font-bold">56</h2>
        </div>

        <div className="card bg-base-100 shadow p-5">
          <p className="text-sm text-gray-500">Revenue</p>
          <h2 className="text-3xl font-bold">₹1,24,500</h2>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="card bg-base-100 shadow p-5">
        <h2 className="font-semibold mb-3">Recent Activity</h2>
        <ul className="text-sm space-y-2">
          <li>🛒 New order placed</li>
          <li>👤 New user registered</li>
          <li>✅ Order #123 delivered</li>
        </ul>
      </div>
    </div>
  );
}
