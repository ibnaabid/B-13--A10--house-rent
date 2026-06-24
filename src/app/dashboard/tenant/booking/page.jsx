"use client";

import { useEffect, useState } from "react";
import PaginationCustomIcons from "@/app/pagination/page";

const Page = () => {
  const [bookings, setBookings] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 5;

  // replace this with your real logged-in user email (from session/auth)
  const userEmail = "user@example.com";

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/bookings?email=${userEmail}&page=${page}&limit=${limit}`
        );

        const data = await res.json();

        setBookings(data.data || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBookings();
  }, [page]);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          My <span className="text-violet-500">Bookings</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          All your booking history in one place
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden">

        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            {/* HEAD */}
            <thead className="bg-slate-900 text-slate-300 uppercase text-xs">
              <tr>
                <th className="p-4 text-left">Property Name</th>
                <th className="p-4 text-left">Booking Date</th>
                <th className="p-4 text-left">Amount Paid</th>
                <th className="p-4 text-left">Booking Location</th>
                <th className="p-4 text-left">Payment Status</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((b) => (
                  <tr
                    key={b._id}
                    className="border-t border-slate-800 hover:bg-slate-800/40 transition"
                  >
                    <td className="p-4 font-medium">
                      {b.title}
                    </td>

                    <td className="p-4 text-slate-300">
                      {b.location}
                    </td>

                    <td className="p-4 text-green-400 font-semibold">
                      ৳ {b.price}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold
                          ${
                            b.status === "Approved"
                              ? "bg-green-500/20 text-green-400"
                              : b.status === "Rejected"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                      >
                        {b.status || "Pending"}
                      </span>
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold
                          ${
                            b.paymentStatus === "Paid"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                      >
                        {b.status || "paid"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="p-10 text-center text-slate-400"
                  >
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        {/* PAGINATION */}
        <div className="p-4 border-t border-slate-800">
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