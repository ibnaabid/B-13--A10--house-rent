"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import StatusUpdate from "./statusUpdate";
import EditHome from "./EditBtnModal";
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
    // মোবাইলে সাইড প্যাডিং p-4 এবং বড় স্ক্রিনে p-8 দেওয়া হয়েছে
    <div className="min-h-screen w-full bg-[#090d16] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/20 via-[#090d16] to-[#090d16] p-4 sm:p-8 antialiased">
      
      {/* এখানে ml-12 সরিয়ে পুরোপুরি রিমুভ করে mx-auto রাখা হয়েছে */}
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 sm:mb-10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Property Management
            </h1>
            <p className="text-slate-400 mt-1 sm:mt-2 text-xs sm:text-sm">
              Review, approve, and manage system wide property listings.
            </p>
          </div>
          
          <div className="self-start md:self-auto bg-slate-900/80 ring-1 ring-white/10 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl flex items-center gap-3 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-slate-300">
              {homes.length} Total Properties
            </span>
          </div>
        </div>

        {/* Premium Table Container */}
        <div className="relative rounded-xl sm:rounded-2xl ring-1 ring-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl overflow-hidden">
          
          {/* Table Header Section */}
          <div className="p-4 sm:p-6 border-b border-slate-800/60 bg-slate-900/20 flex justify-between items-center">
            <h2 className="text-base sm:text-lg font-semibold text-slate-200 tracking-wide">
              All Properties
            </h2>
          </div>

          {/* Table Element - Responsive Scroll Wrapper */}
          <div className="overflow-x-auto JSON-scrollbar w-full">
            <table className="w-full text-left border-collapse min-w-[800px] whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-400 bg-slate-900/60">
                  <th className="py-3 sm:py-4 px-4 sm:px-6 w-16 text-center">#</th>
                  <th className="py-3 sm:py-4 px-4 sm:px-6">Property Details</th>
                  <th className="py-3 sm:py-4 px-4 sm:px-6">Location</th>
                  <th className="py-3 sm:py-4 px-4 sm:px-6">Price</th>
                  <th className="py-3 sm:py-4 px-4 sm:px-6">Status</th>
                  <th className="py-3 sm:py-4 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800/50 text-xs sm:text-sm">
                {homes?.map((home, index) => (
                  <tr
                    key={home._id}
                    className="group hover:bg-slate-800/30 transition-colors duration-200"
                  >
                    {/* Index */}
                    <td className="py-3 sm:py-4 px-4 sm:px-6 text-center font-mono text-[11px] text-slate-500">
                      {(index + 1).toString().padStart(2, "0")}
                    </td>

                    {/* Property Thumbnail & Title */}
                    <td className="py-3 sm:py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 ring-1 ring-white/10 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-200">
                          <Home size={16} className="text-blue-400 sm:w-[18px] sm:h-[18px]" />
                        </div>

                        <div className="space-y-0.5 max-w-[180px] sm:max-w-xs">
                          <h3 className="font-medium text-slate-200 text-xs sm:text-sm group-hover:text-white transition-colors truncate">
                            {home.title || "Untitled Property"}
                          </h3>
                          <p className="font-mono text-[9px] sm:text-[10px] tracking-wider text-slate-500 uppercase">
                            ID: {home._id?.slice(0, 8) || "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-3 sm:py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-2 text-slate-300">
                        <MapPin size={14} className="text-slate-500 shrink-0" />
                        <span className="truncate max-w-[150px] sm:max-w-[200px]">{home.location}</span>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-3 sm:py-4 px-4 sm:px-6">
                      <div className="flex items-center font-semibold text-emerald-400">
                        <DollarSign size={14} className="opacity-80" />
                        <span>{home.price?.toLocaleString()}</span>
                      </div>
                    </td>

                    {/* Status Pill */}
                    <td className="py-3 sm:py-4 px-4 sm:px-6">
                      <span
                        className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[11px] font-medium border tracking-wide shadow-sm
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

                    {/* Actions */}
                    <td className="py-3 sm:py-4 px-4 sm:px-6 text-right">
                      <div className="flex items-center justify-end gap-2 sm:gap-4">
                        <StatusUpdate home={home} />
                        <div className="flex items-center">
                          <EditHome home={home} />
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