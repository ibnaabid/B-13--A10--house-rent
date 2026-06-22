"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
// import status from "./status";
import StatusAdmin from "./status";
import {
  Pencil,
  Trash2,
  CheckCircle,
  XCircle,
  Home,
  MapPin,
  DollarSign,
  User,
} from "lucide-react";
// import EditDeleteBtn from "./Edit";
import DeleteModal from "./Del";
import EditModal from "./Edit";


export default function AllHomesTable() {
  const [homes, setHomes] = useState([]);

  const fetchHomes = async () => {
    try {
      const res = await fetch("http://localhost:5000/allhome");
      const data = await res.json();
      setHomes(data);
    } catch (error) {
      toast.error("Failed to fetch properties");
    }
  };

  useEffect(() => {
    fetchHomes();
  }, []);

  return (
    <div className="min-h-screen mx-auto bg-[#090d16] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/20 via-[#090d16] to-[#090d16] p-8 antialiased">
      <div className="max-w-7xl ml-12 mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Property Management
            </h1>
            <p className="text-slate-400 mt-2 text-sm sm:text-base">
              Review, approve, and manage system wide property listings.
            </p>
          </div>
          
          <div className="self-start md:self-auto bg-slate-900/80 ring-1 ring-white/10 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-3 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm font-medium text-slate-300">
              {homes.length} Total Properties
            </span>
          </div>
        </div>

        {/* Premium Table Container */}
        <div className="relative rounded-2xl ring-1 ring-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl overflow-hidden">
          
          {/* Table Header Section */}
          <div className="p-6 border-b border-slate-800/60 bg-slate-900/20 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-slate-200 tracking-wide">
              All Properties
            </h2>
          </div>

          {/* Table Element */}
          <div className="overflow-x-auto JSON-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-semibold uppercase tracking-wider text-slate-400 bg-slate-900/60">
                  <th className="py-4 px-6 w-16 text-center">#</th>
                  <th className="py-4 px-6">Property Details</th>
                  <th className="py-4 px-6">Location</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6">Status</th>
                  
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800/50">
                {homes?.map((home, index) => (
                  <tr
                    key={home._id}
                    className="group hover:bg-slate-800/30 transition-colors duration-200"
                  >
                    {/* Index */}
                    <td className="py-4 px-6 text-center font-mono text-xs text-slate-500">
                      {(index + 1).toString().padStart(2, "0")}
                    </td>

                    {/* Property Thumbnail & Title */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 ring-1 ring-white/10 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-200">
                          <Home size={18} className="text-blue-400" />
                        </div>

                        <div className="space-y-0.5">
                          <h3 className="font-medium text-slate-200 text-sm group-hover:text-white transition-colors">
                            {home.title || "Untitled Property"}
                          </h3>
                          <p className="font-mono text-[10px] tracking-wider text-slate-500 uppercase">
                            ID: {home._id?.slice(0, 8) || "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <MapPin size={14} className="text-slate-500 shrink-0" />
                        <span className="truncate max-w-[180px]">{home.location}</span>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-6">
                      <div className="flex items-center font-semibold text-emerald-400 text-sm">
                        <DollarSign size={14} className="opacity-80" />
                        <span>{home.price?.toLocaleString()}</span>
                      </div>
                    </td>

                    {/* Status Pill */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border tracking-wide shadow-sm
                        ${
                          home.status === "accepted"
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                            : home.status === "rejected"
                            ? "bg-rose-500/10 border-rose-500/20 text-rose-400"
                            : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full mr-1.5 shrink-0
                          ${
                            home.status === "accepted"
                              ? "bg-emerald-400"
                              : home.status === "rejected"
                              ? "bg-rose-400"
                              : "bg-amber-400"
                          }`}
                        />
                        <span className="capitalize">{home.status || "Pending"}</span>
                      </span>
                    </td>

                   

                    {/* Interactive Action Blocks */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-4">
                        
                        {/* Control Set 1: Moderation */}
                        <StatusAdmin home={home}></StatusAdmin>

                        {/* Control Set 2: Crud Operations */}
                        <div className="flex items-center gap-1.5">
                        <EditModal home={home}></EditModal>
                        <DeleteModal home ={home}></DeleteModal>
                        </div>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        </div>
      </div>
    </div>
  );
}