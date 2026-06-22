"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await fetch("http://localhost:5000/Bookings");
    const data = await res.json();
    setBookings(data);
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
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 p-8">
      
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-800">
            Booking Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Manage tenant requests with premium control panel
          </p>
        </div>

        {/* Table Card */}
        <div className="bg-taupe-700 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden border border-gray-200">

          <div className="p-4 bg-gradient-to-r from-black to-gray-800 text-white">
            <h2 className="text-lg font-semibold">
              Booking Requests
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">

              <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                <tr>
                  <th className="px-6 py-4 text-left">Tenant</th>
                  <th className="px-6 py-4 text-left">Property</th>
                  <th className="px-6 py-4 text-left">Amount</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((b) => (
                  <tr
                    key={b._id}
                    className="border-b hover:bg-gray-100 transition"
                  >

                    {/* Tenant */}
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-800">
                        {b.tenantName}
                      </p>
                      <p className="text-xs font-bold text-gray-500">
                        {b.tenantEmail}
                      </p>
                    </td>

                    {/* Property */}
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-800">
                        {b.propertyTitle}
                      </p>
                      <p className="text-xs text-gray-500">
                        {b.propertyLocation}
                      </p>
                    </td>

                    {/* Amount */}
                    <td className="px-6 py-4 font-bold text-indigo-900 ">
                      ৳ {b.bookingAmount}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusStyle(
                          b.status
                        )}`}
                      >
                        {b.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">

                        <button
                          onClick={() => updateStatus(b._id, "Approved")}
                          className="px-4 py-1.5 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-green-600 active:scale-95 transition"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => updateStatus(b._id, "Rejected")}
                          className="px-4 py-1.5 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 active:scale-95 transition"
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