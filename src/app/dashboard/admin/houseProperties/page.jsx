"use client";

import { useEffect, useState } from "react";
import Editwork from "./Editwork";
import Deletework from "./Deletework";
import RejectModal from "./RejectModal";

export default function Page() {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/allhome?page=${page}&limit=3`
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

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `http://localhost:5000/allhome/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (res.ok) {
        setBookings((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, status } : item
          )
        
        );
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Property Management
          </h1>
          <p className="text-slate-400 mt-2">
            Show all properties in table format
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          <div className="bg-blue-600 p-6 rounded-2xl">
            <h3>Total Properties</h3>
            <p className="text-3xl font-bold">
              {bookings.length}
            </p>
          </div>

          <div className="bg-green-600 p-6 rounded-2xl">
            <h3>Approved</h3>
            <p className="text-3xl font-bold">
              {
                bookings.filter(
                  (b) => b.status === "Approved"
                ).length
              }
            </p>
          </div>

          <div className="bg-red-600 p-6 rounded-2xl">
            <h3>Rejected</h3>
            <p className="text-3xl font-bold">
              {
                bookings.filter(
                  (b) => b.status === "Rejected"
                ).length
              }
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="bg-slate-800 text-slate-200">
                <th className="px-6 py-4 text-left">
                  Property
                </th>
                <th className="px-6 py-4 text-left">
                  Location
                </th>
                <th className="px-6 py-4 text-left">
                  Amount
                </th>
                <th className="px-6 py-4 text-left">
                  Tenant
                </th>
                <th className="px-6 py-4 text-left">
                  Status
                </th>
                <th className="px-6 py-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((home) => (
                <tr
                  key={home._id}
                  className="border-b border-slate-800 hover:bg-slate-800/50 transition"
                >
                  <td className="px-6 py-4">
                    {home.title}
                  </td>

                  <td className="px-6 py-4">
                    {home.location || "N/A"}
                  </td>

                  <td className="px-6 py-4 text-green-400 font-bold">
                    ৳ {home.price}
                  </td>

                  <td className="px-6 py-4">
                    {home.bedrooms}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        home.status === "Approved"
                          ? "bg-green-500 text-white"
                          : home.status === "Rejected"
                          ? "bg-red-500 text-white"
                          : "bg-yellow-500 text-black"
                      }`}
                    >
                      {home.status || "Pending"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() =>
                          updateStatus(
                            home._id,
                            "Approved"
                          )
                        }
                        className="px-3 py-2 bg-green-600 rounded-lg text-white hover:bg-green-700"
                      >
                        Approve
                      </button>

                      <RejectModal home={home}/>

                    <Editwork home={home}/>

                     <Deletework home={home}/>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center gap-3 p-5">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 bg-slate-700 rounded disabled:opacity-50"
            >
              Previous
            </button>

            <span className="px-4 py-2">
              {page} / {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 bg-slate-700 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}