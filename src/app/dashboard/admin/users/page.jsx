"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  // fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/user");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // role update
  const updateRole = async (id, role) => {
    try {
      setUpdatingId(id);

      const res = await fetch(`http://localhost:5000/user/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      });

      if (!res.ok) throw new Error();

      toast.success("Role updated successfully");
      fetchUsers();
    } catch (err) {
      toast.error("Failed to update role");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">
        
        {/* Header */}
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          👥 All Users
        </h1>

        {/* Loading */}
        {loading ? (
          <p className="text-gray-500">Loading users...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              
              {/* Head */}
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Role</th>
                  <th className="p-3 text-left">Change Role</th>
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>

                    {/* current role */}
                    <td className="p-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                        {user.role || "user"}
                      </span>
                    </td>

                    {/* change role */}
                    <td className="p-3 flex gap-2 items-center">
                      <select
                        className="border p-2 rounded"
                        defaultValue={user.role || "user"}
                        onChange={(e) =>
                          updateRole(user._id, e.target.value)
                        }
                        disabled={updatingId === user._id}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="moderator">Moderator</option>
                      </select>

                      {updatingId === user._id && (
                        <span className="text-sm text-gray-500">
                          updating...
                        </span>
                      )}
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