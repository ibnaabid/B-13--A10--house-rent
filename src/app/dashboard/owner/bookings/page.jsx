"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await fetch("http://localhost:5000/Bookings");
      const data = await res.json();
      setBookings(data);
    } catch {
      toast.error("Failed to load bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

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
      fetchBookings();
    } else {
      toast.error("Something went wrong");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700 border-green-300";
      case "Rejected":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-amber-100 text-amber-700 border-amber-300";
    }
  };

  return (
    // মোবাইলে p-4 এবং বড় স্ক্রিনে p-8 দিয়ে সাইড স্পেস ঠিক করা হয়েছে
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 p-4 sm:p-8 antialiased">
      
      <div className="max-w-7xl mx-auto w-full">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">
            Booking Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage tenant requests with premium control panel
          </p>
        </div>

        {/* Table Card */}
        {/* bg-taupe-700 পরিবর্তন করে স্ট্যান্ডার্ড bg-white দেওয়া হয়েছে */}
        <div className="bg-white shadow-xl rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200/80">

          <div className="p-4 sm:p-5 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
            <h2 className="text-base sm:text-lg font-semibold tracking-wide">
              Booking Requests
            </h2>
          </div>

          {/* Responsive Scroll Wrapper */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left whitespace-nowrap min-w-[750px]">

              <thead className="bg-gray-50 text-gray-600 text-xs sm:text-sm uppercase tracking-wider border-b border-gray-200">
                <tr>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 font-semibold">Tenant</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 font-semibold">Property</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 font-semibold">Amount</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 font-semibold">Status</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-center font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className="text-xs sm:text-sm divide-y divide-gray-100 bg-white">
                {bookings.map((b) => (
                  <tr
                    key={b._id}
                    className="hover:bg-gray-50/80 transition-colors duration-150"
                  >

                    {/* Tenant */}
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <div className="max-w-[160px] sm:max-w-xs">
                        <p className="font-semibold text-blue-900 font-bold truncate">
                          {b.tenantName}
                        </p>
                        <p className="text-[11px] sm:text-xs text-gray-400 font-medium truncate">
                          {b.tenantEmail}
                        </p>
                      </div>
                    </td>

                    {/* Property */}
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <div className="max-w-[180px] sm:max-w-xs">
                        <p className="font-medium text-gray-800 truncate">
                          {b.propertyTitle}
                        </p>
                        <p className="text-[11px] sm:text-xs text-gray-400 truncate">
                          {b.propertyLocation}
                        </p>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="px-4 sm:px-6 py-3 sm:py-4 font-bold text-slate-900">
                      ৳ {b.bookingAmount?.toLocaleString()}
                    </td>

                    {/* Status */}
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <span
                        className={`inline-block px-2.5 py-1 text-[11px] font-bold rounded-full border tracking-wide uppercase ${getStatusStyle(
                          b.status
                        )}`}
                      >
                        {b.status || "Pending"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => updateStatus(b._id, "Approved")}
                          className="px-3 sm:px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs sm:text-sm font-medium hover:bg-emerald-700 active:scale-95 transition-all shadow-sm"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => updateStatus(b._id, "Rejected")}
                          className="px-3 sm:px-4 py-1.5 rounded-lg bg-rose-600 text-white text-xs sm:text-sm font-medium hover:bg-rose-700 active:scale-95 transition-all shadow-sm"
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
      </div>
    </div>
  );
};

export default Page;