"use client";

import { authClient } from "@/app/lib/auth-client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchUsers = async () => {
    try {

      const{data:token}= await authClient.token();
      console.log(token)

      setLoading(true);
      const res = await fetch("http://localhost:5000/user",{
        headers:{
          authorization : `Bearer ${token.token}`
        }
      });
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

      const {data :token} = await authClient.token()




      setUpdatingId(id);

      const res = await fetch(`http://localhost:5000/user/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json",
          authorization : `Bearer ${token.token}`
         }
        
        
        
        ,
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
    // ml-20 সরিয়ে w-full এবং ডাইনামিক প্যাডিং দেওয়া হয়েছে
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-3 sm:p-6">
      
      <div className="w-full max-w-6xl mx-auto">
        
        {/* Glass Card */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-xl sm:rounded-2xl p-4 sm:p-6">
          
          {/* Header */}
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
            <span>👥</span> Users Dashboard
          </h1>

          {loading ? (
            <p className="text-gray-300 text-sm sm:text-base animate-pulse">Loading users...</p>
          ) : (
            // টেবিল স্ক্রিনের বাইরে যেন না যায় তাই নিখুঁত স্ক্রল কন্টেইনার
            <div className="overflow-x-auto w-full max-w-full rounded-xl border border-white/5 custom-scrollbar">
              
              <table className="w-full text-white text-left whitespace-nowrap min-w-[600px]">
                
                {/* Head */}
                <thead>
                  <tr className="border-b border-white/20 text-xs sm:text-sm uppercase tracking-wider bg-white/5">
                    <th className="p-3 sm:p-4 font-semibold">Name</th>
                    <th className="p-3 sm:p-4 font-semibold">Email</th>
                    <th className="p-3 sm:p-4 font-semibold">Role</th>
                    <th className="p-3 sm:p-4 font-semibold">Action</th>
                  </tr>
                </thead>

                {/* Body */}
                <tbody className="text-sm sm:text-base">
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b border-white/10 hover:bg-white/5 transition"
                    >
                      <td className="p-3 sm:p-4 font-medium max-w-[150px] truncate">
                        {user.name}
                      </td>
                      <td className="p-3 sm:p-4 text-blue-200/90 max-w-[200px] truncate">
                        {user.email}
                      </td>

                      {/* Role badge */}
                      <td className="p-3 sm:p-4">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs bg-blue-500/10 border text-emerald-400 font-bold border-blue-400/20">
                          {user.role || "user"}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="p-3 sm:p-4">
                        <div className="flex items-center gap-2">
                          <select
                            className="bg-slate-800/80 border border-white/20 text-white text-xs sm:text-sm p-1.5 sm:p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer"
                            defaultValue={user.role || "user"}
                            onChange={(e) =>
                              updateRole(user._id, e.target.value)
                            }
                            disabled={updatingId === user._id}
                          >
                            <option className="bg-slate-900 text-white" value="user">Tenant</option>
                            <option className="bg-slate-900 text-white" value="admin">Admin</option>
                            <option className="bg-slate-900 text-white" value="Owner">Owner</option>
                          </select>

                          {updatingId === user._id && (
                            <span className="text-[10px] sm:text-xs text-gray-400 animate-pulse shrink-0">
                              updating...
                            </span>
                          )}
                        </div>
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