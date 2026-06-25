"use client";

import { useEffect, useState } from "react";
import PaginationCustomIcons from "@/app/pagination/page";
import { authClient } from "@/app/lib/auth-client";

const LIMIT = 10;

export default function Page() {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBookings = async () => {
      try {

        const {data:token} = await authClient.token()


        const res = await fetch(
          `http://localhost:5000/Bookings?page=${page}&limit=${LIMIT}`,{
            headers:
            {
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
    <div className="min-h-screen bg-slate-950 p-4 sm:p-6 lg:p-8 text-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Transactions
          </h1>
          <p className="text-slate-400 mt-2">
            Manage all payment records and bookings
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-slate-400 text-sm">Total Transactions</p>
            <h2 className="text-3xl font-bold mt-2">
              {bookings.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-slate-400 text-sm">Revenue</p>
            <h2 className="text-3xl font-bold text-green-400 mt-2">
              ৳
              {bookings
                .reduce(
                  (total, item) =>
                    total + Number(item.bookingAmount || 0),
                  0
                )
                .toLocaleString()}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-slate-400 text-sm">Completed</p>
            <h2 className="text-3xl font-bold text-blue-400 mt-2">
              {
                bookings.filter(
                  (item) => item.status === "Approved"
                ).length
              }
            </h2>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
          <table className="min-w-[900px] w-full">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/50">
                <th className="px-6 py-4 text-left">
                  Transaction ID
                </th>

                <th className="px-6 py-4 text-left">
                  Property Name
                </th>

                <th className="px-6 py-4 text-left">
                  Tenant Email
                </th>

                <th className="px-6 py-4 text-left">
                  Payment ID
                </th>

                <th className="px-6 py-4 text-left">
                  Amount
                </th>

                <th className="px-6 py-4 text-left">
                  Status
                </th>

                <th className="px-6 py-4 text-left">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {bookings.length > 0 ? (
                bookings.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-slate-800 hover:bg-slate-800/40 transition"
                  >
                    <td className="px-6 py-4 font-mono text-cyan-400">
                      TXN-{item._id?.slice(-8)}
                    </td>

                    <td className="px-6 py-4">
                      {item.propertyTitle || "N/A"}
                    </td>

                    <td className="px-6 py-4">
                      {item.tenantEmail || "N/A"}
                    </td>

                    <td className="px-6 py-4">
                      {item.transactionId || "N/A"}
                    </td>

                    <td className="px-6 py-4 text-green-400 font-semibold">
                      ৳ {item.bookingAmount || 0}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status === "Approved"
                            ? "bg-green-500/20 text-green-400"
                            : item.status === "Rejected"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {item.status || "Pending"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-400">
                      {item.createdAt
                        ? new Date(
                            item.createdAt
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-10 text-slate-400"
                  >
                    No Transactions Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="p-5 border-t border-slate-800 flex justify-center">
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
}