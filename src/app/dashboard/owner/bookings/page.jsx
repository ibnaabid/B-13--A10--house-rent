"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PaginationCustomIcons from "@/app/pagination/page";
import { authClient } from "@/app/lib/auth-client";

const LIMIT = 3;

const Page = () => {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // FETCH BOOKINGS
  const fetchBookings = async (currentPage = 1) => {
    try {
      const {data:token} = await authClient.token()
     


      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/Bookings?page=${currentPage}&limit=${LIMIT}`,
          {headers:
               {
            authorization : `Bearer ${token.token}`
          }}
      );

      const data = await res.json();
      console.log(process.env.NEXT_PUBLIC_BASE_URL,"NEXT_PUBLIC_BASE_URL")

      setBookings(data.data || []);
      setTotalPages(data.totalPages || 1);
      setPage(data.page || 1);
    } catch (error) {
      toast.error("Failed to load bookings");
    }
  };

  useEffect(() => {
    fetchBookings(page);
  }, [page]);

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {

      const {data:token}= await authClient.token();
      console.log(token)


      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/Bookings/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization : `Bearer ${token.token}`
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        toast.success(`Booking ${status}`);
        fetchBookings(page);
      } else {
        toast.error("Something went wrong");
      }
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 p-4 sm:p-8">
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
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          {/* TABLE HEADER */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4">
            <h2 className="text-white text-lg font-semibold">
              Booking Requests
            </h2>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-slate-100 text-slate-600 text-sm uppercase">
                <tr>
                  <th className="p-4 text-left">Tenant</th>
                  <th className="p-4 text-left">Property</th>
                  <th className="p-4 text-left">Amount</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((b) => (
                    <tr
                      key={b._id}
                      className="border-b border-slate-100 hover:bg-violet-50 transition"
                    >
                      {/* TENANT */}
                      <td className="p-4">
                        <p className="font-medium text-slate-700">
                          {b.tenantEmail}
                        </p>
                      </td>

                      {/* PROPERTY */}
                      <td className="p-4">
                        <p className="font-medium text-slate-700">
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
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            b.status === "Approved"
                              ? "bg-green-100 text-green-700"
                              : b.status === "Rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {b.status || "Pending"}
                        </span>
                      </td>

                      {/* ACTION */}
                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() =>
                              updateStatus(b._id, "Approved")
                            }
                            className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              updateStatus(b._id, "Rejected")
                            }
                            className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-10 text-slate-500"
                    >
                      No Bookings Found
                    </td>
                  </tr>
                )}
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