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
    const res = await fetch(
      `http://localhost:5000/Bookings/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    if (res.ok) {
      toast.success(`Booking ${status}`);
      fetchBookings(); // refresh
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">

        {/* Header */}
        <div className="p-6 border-b">
          <h1 className="text-3xl font-bold">
            Booking Requests
          </h1>
          <p className="text-gray-500">
            Manage all tenant booking requests
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">

            <thead className="bg-black text-white">
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
                <tr key={b._id} className="border-b">

                  {/* Tenant */}
                  <td className="px-6 py-4">
                    <p className="font-medium">
                      {b.tenantName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {b.tenantEmail}
                    </p>
                  </td>

                  {/* Property */}
                  <td className="px-6 py-4">
                    <p className="font-medium">
                      {b.propertyTitle}
                    </p>
                    <p className="text-sm text-gray-500">
                      {b.propertyLocation}
                    </p>
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4">
                    ৳ {b.amount}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
                      {b.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 flex gap-2 justify-center">

                    <button
                      onClick={() =>
                        updateStatus(b._id, "Approved")
                      }
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(b._id, "Rejected")
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
};

export default Page;