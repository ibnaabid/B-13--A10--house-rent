"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

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

  const updateRole = async (id, role) => {
    try {
      setUpdatingId(id);

      const res = await fetch(`http://localhost:5000/user/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      if (!res.ok) throw new Error();

      toast.success("Role updated");
      fetchUsers();
    } catch {
      toast.error("Failed to update role");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="min-h-screen ml-20 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      
      <div className="w-full max-w-6xl">
        
        {/* Glass Card */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-6">
          
          {/* Header */}
          <h1 className="text-2xl font-bold text-white mb-6">
            👥 Users Dashboard
          </h1>

          {loading ? (
            <p className="text-gray-300">Loading users...</p>
          ) : (
            <div className="overflow-x-auto">
              
              <table className="w-full text-white">
                
                {/* Head */}
                <thead>
                  <tr className="border-b border-white/20 text-left">
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>

                {/* Body */}
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b border-white/10 hover:bg-white/10 transition"
                    >
                      <td className="p-3 font-medium">{user.name}</td>
                      <td className="p-3 text-blue-200">{user.email}</td>

                      {/* Role badge */}
                      <td className="p-3">
                        <span className="px-3 py-1 rounded-full text-xs bg-blue-500/10 border text-green-500 font-bold border-blue-400/30">
                          {user.role || "user"}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="p-3 flex items-center gap-3">
                        <select
                          className="bg-white/10 border border-white/20 text-white p-2 rounded-lg backdrop-blur-md focus:outline-none"
                          defaultValue={user.role || "user"}
                          onChange={(e) =>
                            updateRole(user._id, e.target.value)
                          }
                          disabled={updatingId === user._id}
                        >
                          <option className="text-black" value="user">Tenant</option>
                          <option className="text-black" value="admin">Admin</option>
                          <option className="text-black" value="Owner">Owner</option>
                        </select>

                        {updatingId === user._id && (
                          <span className="text-xs text-gray-300 animate-pulse">
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
    </div>
  );
}