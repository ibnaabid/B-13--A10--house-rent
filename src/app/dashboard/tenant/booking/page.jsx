"use client";

import { useEffect, useState } from "react";
import PaginationCustomIcons from "@/app/pagination/page";
import { authClient } from "@/app/lib/auth-client";

const Page = () => {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 5;
  

  useEffect(() => {
    const fetchBookings = async () => {
      const {data:token} = await authClient.token();
      
     
      try {
        const res = await fetch(
          `http://localhost:5000/Bookings?page=${page}&limit=${limit}`,
          
         {headers: {
            authorization : `Bearer ${token.token}`
          }

            
          }



        );

        const data = await res.json();

        setBookings(data.data || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookings();
  }, [page]);

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-8 flex flex-col lg:flex-row justify-between gap-4">

          <div>
            <h1 className="text-4xl font-black">
              My <span className="text-violet-500">Bookings</span>
            </h1>

            <p className="text-slate-400 mt-2">
              Track all your property bookings and payment history
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl px-6 py-4 min-w-[220px]">
            <p className="text-slate-400 text-sm">
              Total Bookings
            </p>

            <h2 className="text-4xl font-bold text-violet-400 mt-2">
              {bookings.length}
            </h2>
          </div>

        </div>

        {/* TABLE CARD */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.4)]">

          {/* TOP BAR */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
            <div>
              <h2 className="text-xl font-bold">
                Booking History
              </h2>

              <p className="text-slate-400 text-sm mt-1">
                View all booked properties
              </p>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px]">

              <thead>
                <tr className="bg-slate-800/80 text-slate-300 uppercase text-xs tracking-wider">
                  <th className="px-6 py-5 text-left">
                    Property
                  </th>

                  <th className="px-6 py-5 text-left">
                    Booking Date
                  </th>

                  <th className="px-6 py-5 text-left">
                    Amount Paid
                  </th>

                  <th className="px-6 py-5 text-left">
                    Booking Status
                  </th>

                  <th className="px-6 py-5 text-left">
                    Payment Status
                  </th>
                </tr>
              </thead>

              <tbody>

                {bookings.length > 0 ? (
                  bookings.map((b) => (
                    <tr
                      key={b._id}
                      className="border-t border-slate-800 hover:bg-slate-800/40 transition-all duration-300"
                    >
                      {/* PROPERTY */}
                      <td className="px-6 py-5">
                        <div>
                          <h3 className="font-semibold text-white">
                            {b.propertyTitle}
                          </h3>

                          <p className="text-xs text-slate-500 mt-1">
                            Booking ID: {b._id?.slice(-6)}
                          </p>
                        </div>
                      </td>

                      {/* DATE */}
                      <td className="px-6 py-5 text-slate-300">
                        {new Date(
                          b.createdAt
                        ).toLocaleDateString()}
                      </td>

                      {/* AMOUNT */}
                      <td className="px-6 py-5">
                        <span className="text-emerald-400 font-bold text-lg">
                          ৳{" "}
                          {b.bookingAmount?.toLocaleString()}
                        </span>
                      </td>

                      {/* BOOKING STATUS */}
                      <td className="px-6 py-5">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold
                          ${
                            b.bookingStatus === "Confirmed"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {b.bookingStatus || "Pending"}
                        </span>
                      </td>

                      {/* PAYMENT STATUS */}
                      <td className="px-6 py-5">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold
                          ${
                            b.paymentStatus === "paid"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {b.paymentStatus || "Unpaid"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-20 text-center"
                    >
                      <div>
                        <h3 className="text-2xl font-bold text-slate-300">
                          No Bookings Found
                        </h3>

                        <p className="text-slate-500 mt-2">
                          You have not booked any property yet.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="border-t border-slate-800 p-5">
            <PaginationCustomIcons
              page={page}
              setPage={setPage}
              totalPages={totalPages}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Page;