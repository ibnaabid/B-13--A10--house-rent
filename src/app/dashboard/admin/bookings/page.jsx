"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PaginationCustomIcons from "@/app/pagination/page";
import { authClient } from "@/app/lib/auth-client";

export default function Page() {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
useEffect(() => {
  const fetchBookings = async () => {
    try {

      const {data:token} = await authClient.token();
      


      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/Bookings?page=${page}&limit=3`,
        
        {
          headers: {
            authorization : `Bearer ${token.token}`
          }
        }
      );

      const data = await res.json();

      console.log("API DATA:", data);

      setBookings(data.data || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.log(error);
      setBookings([]);
    }
  };

  fetchBookings();
}, [page]);

  const safeBookings = Array.isArray(bookings) ? bookings : [];

  return (
    <div className="min-h-screen w-full bg-[#0f172a] p-4 sm:p-8 antialiased">

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">

        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl text-white">
          <h2 className="text-xs sm:text-sm opacity-80">Total Bookings</h2>
          <h1 className="text-3xl sm:text-4xl font-bold mt-1 sm:mt-2">
            {safeBookings.length}
          </h1>
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl text-white">
          <h2 className="text-xs sm:text-sm opacity-80">Approved</h2>
          <h1 className="text-3xl sm:text-4xl font-bold mt-1 sm:mt-2">
            {safeBookings.filter((b) => b.status === "Approved").length}
          </h1>
        </div>

      </div>

      {/* Main Table Container */}
      <div className="max-w-7xl mx-auto bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-[30px] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.4)]">

        {/* Header */}
        <div className="flex justify-between items-center px-4 sm:px-8 py-5 sm:py-6 border-b border-white/10">
          <div>
            <h1 className="text-xl sm:text-3xl font-bold text-white">
              Booking Requests
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Manage all tenant bookings
            </p>
          </div>
        </div>

        {/* Table responsive wrapper */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap min-w-[700px]">
            <thead>
              <tr className="bg-white/5 text-slate-300 text-xs sm:text-sm uppercase tracking-wider">
                <th className="px-4 sm:px-8 py-4 sm:py-5">Tenant</th>
                <th className="px-4 sm:px-8 py-4 sm:py-5">Property</th>
                <th className="px-4 sm:px-8 py-4 sm:py-5">Amount</th>
                <th className="px-4 sm:px-8 py-4 sm:py-5">Status</th>
                <th className="px-4 sm:px-8 py-4 sm:py-5 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="text-sm sm:text-base">
              {safeBookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-slate-400">
                    No bookings available.
                  </td>
                </tr>
              ) : (
                safeBookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="border-t border-white/5 hover:bg-white/5 transition duration-300"
                  >
                    {/* Tenant */}
                    <td className="px-4 sm:px-8 py-4 sm:py-5">
                      <div className="max-w-[160px] sm:max-w-xs">
                        <h3 className="font-semibold text-white text-xs sm:text-sm truncate">
                          {booking.tenantName}
                        </h3>
                        <p className="text-xs text-slate-400 truncate">
                          {booking.tenantEmail}
                        </p>
                      </div>
                    </td>

                    {/* Property */}
                    <td className="px-4 sm:px-8 py-4 sm:py-5">
                      <div className="max-w-[180px] sm:max-w-xs">
                        <h3 className="font-medium text-white text-xs sm:text-sm truncate">
                          {booking.propertyTitle}
                        </h3>
                        <p className="text-xs text-slate-400 truncate">
                          {booking.propertyLocation}
                        </p>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="px-4 sm:px-8 py-4 sm:py-5">
                      <span className="font-bold text-emerald-400 text-sm sm:text-lg">
                        ৳ {booking.bookingAmount?.toLocaleString()}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 sm:px-8 py-4 sm:py-5">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-wide
                        ${
                          booking.status === "Approved"
                            ? "bg-green-500/20 text-green-400"
                            : booking.status === "Rejected"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {booking.status || "Pending"}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-4 sm:px-8 py-4 sm:py-5 text-center">
                      <Link href={"/dashboard/owner/bookings"}>
                        <button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:scale-105 active:scale-95 transition-all px-4 sm:px-5 py-1.5 sm:py-2 rounded-xl text-white text-xs sm:text-sm font-medium shadow-md">
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 sm:p-6 border-t border-white/10 flex justify-center bg-white/5">
          <PaginationCustomIcons
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        </div>

      </div>
    </div>
  );
}