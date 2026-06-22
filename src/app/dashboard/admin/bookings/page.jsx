"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await fetch("http://localhost:5000/Bookings");
      const data = await res.json();
      setBookings(data);
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen ml-20 bg-[#0f172a] p-8">

      {/* Top Stats */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-6 rounded-3xl shadow-2xl text-white">
          <h2 className="text-sm opacity-80">Total Bookings</h2>
          <h1 className="text-4xl font-bold mt-2">
            {bookings.length}
          </h1>
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-6 rounded-3xl shadow-2xl text-white">
          <h2 className="text-sm opacity-80">Approved</h2>
          <h1 className="text-4xl font-bold mt-2">
            {bookings.filter((b) => b.status === "Approved").length}
          </h1>
        </div>

        <div className="bg-gradient-to-r from-rose-500 to-red-600 p-6 rounded-3xl shadow-2xl text-white">
          <h2 className="text-sm opacity-80">Rejected</h2>
          <h1 className="text-4xl font-bold mt-2">
            {bookings.filter((b) => b.status === "Rejected").length}
          </h1>
        </div>
      </div>

      {/* Main Table */}
      <div className="max-w-7xl mx-auto bg-white/10 backdrop-blur-xl border border-white/10 rounded-[30px] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.4)]">

        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-white/10">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Booking Requests
            </h1>
            <p className="text-slate-400 mt-1">
              Manage all tenant bookings
            </p>
          </div>

         
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">

            <thead>
              <tr className="bg-white/5 text-slate-300">
                <th className="px-8 py-5 text-left">Tenant</th>
                <th className="px-8 py-5 text-left">Property</th>
                <th className="px-8 py-5 text-left">Amount</th>
                <th className="px-8 py-5 text-left">Status</th>
                <th className="px-8 py-5 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-t border-white/5 hover:bg-white/5 transition duration-300"
                >
                  <td className="px-8 py-5">
                    <div>
                      <h3 className="font-semibold text-white">
                        {booking.tenantName}
                      </h3>
                      <p className="text-sm text-slate-400">
                        {booking.tenantEmail}
                      </p>
                    </div>
                  </td>

                  <td className="px-8 py-5">
                    <h3 className="font-medium text-white">
                      {booking.propertyTitle}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {booking.propertyLocation}
                    </p>
                  </td>

                  <td className="px-8 py-5">
                    <span className="font-bold text-emerald-400 text-lg">
                      ৳ {booking.bookingAmount}
                    </span>
                  </td>

                  <td className="px-8 py-5">
                    <span
                      className={`px-4 py-2 rounded-full text-xs font-bold ${
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

                  <td className="px-8 py-5 text-center">
                   <Link href={"/dashboard/owner/bookings"}>
                    <button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:scale-105 transition px-5 py-2 rounded-xl text-white font-medium">
                      View
                    </button></Link>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}