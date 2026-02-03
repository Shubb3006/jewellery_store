    "use client";

    import { useAdminStore } from "@/store/useAdminStore";
    import { useEffect } from "react";

    export default function AdminUsers() {
    const { getAllUsers, allUsers } = useAdminStore();
    useEffect(() => {
        getAllUsers();
    }, []);
    console.log(allUsers);
    return (
        <div className="space-y-6">
        <h1 className="text-2xl font-bold">Users</h1>

        <div className="overflow-x-auto bg-base-100 shadow rounded">
            <table className="table">
            <thead>
                <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th></th>
                </tr>
            </thead>

            <tbody>
                {allUsers.map((user) => (
                <tr key={user._id}>
                    <td className="font-medium">{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                    <span
                        className={`badge ${
                        user.isAdmin ? "badge-primary" : "badge-ghost"
                        }`}
                    >
                        {user.isAdmin ? "Admin" : "User"}
                    </span>
                    </td>
                    <td>
                    <button className="btn btn-xs btn-outline">Manage</button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
    }
