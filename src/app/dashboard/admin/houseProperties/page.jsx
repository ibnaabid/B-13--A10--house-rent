"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MapPin, DollarSign, Building2 } from "lucide-react";

// import EditHome from "./EditBtnModal";
import StatusUpdate from "./statusUpdate";
// import DeleteModal from "./Delete";
// import RejectModal from "./RejectModal";
import EditModal from "./EditBtnModal";
import Delete from "./Delete";
import RejectModal from "./RejectModal";

export default function AllHomesTable() {
  const [homes, setHomes] = useState([]);

  const [rejectTarget, setRejectTarget] = useState(null);
  const [isRejectOpen, setIsRejectOpen] = useState(false);

  const fetchHomes = async () => {
    try {
      const res = await fetch("http://localhost:5000/allhome");
      const data = await res.json();
      setHomes(data);
    } catch {
      toast.error("Failed to fetch properties");
    }
  };

  useEffect(() => {
    fetchHomes();
  }, []);

  // open reject modal
  const openRejectModal = (home) => {
    setRejectTarget(home);
    setIsRejectOpen(true);
  };

  const closeRejectModal = () => {
    setRejectTarget(null);
    setIsRejectOpen(false);
  };

  const statusPill = (status) => {
    const map = {
      accepted: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
      rejected: "bg-rose-500/10 border-rose-500/30 text-rose-400",
    };

    const dot = {
      accepted: "bg-emerald-400",
      rejected: "bg-rose-400",
    };

    const cls =
      map[status] ||
      "bg-amber-500/10 border-amber-500/30 text-amber-400";

    const dotCls = dot[status] || "bg-amber-400";

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${cls}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${dotCls}`} />
        <span className="capitalize">{status || "pending"}</span>
      </span>
    );
  };

  return (
    <div className="min-h-screen w-full bg-[#090d16] p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Property Management
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Review, approve, and manage property listings.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/80 ring-1 ring-white/10 px-4 py-2 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm text-slate-300">
              {homes.length} Total Properties
            </span>
          </div>
        </div>

        {/* TABLE */}
        <div className="rounded-2xl ring-1 ring-white/5 bg-slate-900/40 backdrop-blur-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-800/60">
            <h2 className="text-base font-semibold text-slate-200">
              All Properties
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px]">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] uppercase text-slate-400">
                  <th className="py-3 px-5 text-center">#</th>
                  <th className="py-3 px-5">Property</th>
                  <th className="py-3 px-5">Location</th>
                  <th className="py-3 px-5">Price</th>
                  <th className="py-3 px-5">Status</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800/50">
                {homes.map((home, index) => (
                  <tr key={home._id} className="hover:bg-slate-800/30">

                    <td className="py-3 px-5 text-center text-slate-500">
                      {String(index + 1).padStart(2, "0")}
                    </td>

                    <td className="py-3 px-5 text-slate-200">
                      {home.title}
                    </td>

                    <td className="py-3 px-5 text-slate-300 flex items-center gap-1">
                      <MapPin size={12} />
                      {home.location}
                    </td>

                    <td className="py-3 px-5 text-emerald-400 flex items-center gap-1">
                      <DollarSign size={12} />
                      {home.price}
                    </td>

                    <td className="py-3 px-5">
                      {statusPill(home.status)}
                    </td>

                    {/* ACTIONS */}
                    <td className="py-3 px-5">
                      <div className="flex justify-end gap-2">

                        <EditModal home={home} onSuccess={fetchHomes} />

                        <StatusUpdate home={home} />


                        <Delete
                          home={home}
                          onSuccess={fetchHomes}
                        />

                        {/* 👇 Reject button (ONLY pending) */}
                        {(!home.status || home.status === "pending") && (
                          <button
                            onClick={() => openRejectModal(home)}
                            className="px-3 py-1 text-xs rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                          >
                            Reject
                          </button>
                        )}

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* REJECT MODAL */}
        {isRejectOpen && (
          <RejectModal
            home={rejectTarget}
            isOpen={isRejectOpen}
            onClose={closeRejectModal}
            onSuccess={fetchHomes}
          />
        )}

      </div>
    </div>
  );
}