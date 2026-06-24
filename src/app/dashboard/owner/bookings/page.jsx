"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PaginationCustomIcons from "@/app/pagination/page";

const LIMIT = 3;

const Page = () => {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // FETCH
  const fetchBookings = async (currentPage = 1) => {
    try {
      const res = await fetch(
        `http://localhost:5000/Bookings?page=${currentPage}&limit=${LIMIT}`
      );

      const data = await res.json();

      setBookings(data.data || []);
      setTotalPages(data.totalPages || 1);
      setPage(data.page || 1);
    } catch {
      toast.error("Failed to load bookings");
    }
  };

  useEffect(() => {
    fetchBookings(page);
  }, [page]);

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    const res = await fetch(`http://localhost:5000/Bookings/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      toast.success(`Booking ${status}`);

      // 🔥 refresh same page
      fetchBookings(page);
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
   <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 via-white to-slate-200 p-4 sm:p-8">

  <div className="max-w-7xl mx-auto">

    {/* HEADER */}
    <div className="mb-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800">
        Booking <span className="text-violet-600">Dashboard</span>
      </h1>
      <p className="text-slate-500 mt-1">
        Manage all tenant bookings in one place
      </p>
    </div>

    {/* TABLE CARD */}
    <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl overflow-hidden">

      {/* TABLE HEADER */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4">
        <h2 className="text-white font-semibold text-lg">
          Booking Requests
        </h2>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">

        <table className="w-full min-w-[700px]">

          <thead className="bg-slate-100 text-slate-600 text-sm uppercase tracking-wide">
            <tr>
              <th className="p-4 text-left">Tenant</th>
              <th className="p-4 text-left">Property</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Status</th>
           
            </tr>
          </thead>

          <tbody>

            {bookings.map((b, i) => (
              <tr
                key={b._id}
                className="border-b border-slate-100 hover:bg-violet-50 transition"
              >

              
               

                {/* PROPERTY */}
                <td className="p-4">
                  <p className="font-medium text-slate-700">
                    {b.tenantEmail}
                  </p>
                  <p className="text-xs text-slate-400">
                    {b.propertyTitle}
                  </p>
                </td>

                {/* AMOUNT */}
                <td className="p-4 font-bold text-slate-800">
                  ৳ {b.bookingAmount}
                </td>

                {/* STATUS */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        b.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : b.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }
                    `}
                  >
                    {b.bookingStatus || "Pending"}
                  </span>
                </td>

                {/* ACTION */}
                <td className="p-4">
                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() => updateStatus(b._id, "Approved")}
                      className="px-3 py-1.5 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 active:scale-95 transition"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => updateStatus(b._id, "Rejected")}
                      className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 active:scale-95 transition"
                    >
                      Reject
                    </button>

                  </div>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </div>

    {/* PAGINATION */}
    <div className="mt-6">
      <PaginationCustomIcons
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </div>

  </div>
</div>
  );
};

export default Page;