"use client";

import { useAdminStore } from "@/store/useAdminStore";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

export default function AdminUsers() {
  const { getAllUsers, allUsers, gettingAllUsers } = useAdminStore();
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold ml-10 mt-1">Users</h1>
      {gettingAllUsers ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader2 className="animate-spin" />
        </div>
      ) : allUsers.length === 0 ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <p className="text-xl font-semibold">No Users found</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 shadow rounded-lg border border-gray-200">
          <table className="min-w-[800px] w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold">
                  Role
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {allUsers.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`badge ${
                        user.isAdmin ? "badge-primary" : "badge-ghost"
                      }`}
                    >
                      {user.isAdmin ? "Admin" : "User"}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button className="btn btn-xs btn-outline">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
