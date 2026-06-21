const page = async () => {
  const res = await fetch("http://localhost:5000/Bookings", {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-white">
          Booking Management
        </h1>
        <p className="text-slate-400 mt-2">
          Monitor and manage all booking activities.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <h3 className="text-slate-400 text-sm">Total Bookings</h3>
          <p className="text-4xl font-black text-white mt-2">
            {data.length}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <h3 className="text-slate-400 text-sm">Confirmed</h3>
          <p className="text-4xl font-black text-emerald-400 mt-2">
            {
              data.filter(
                (item) =>
                  item.bookingStatus?.toLowerCase() === "confirmed"
              ).length
            }
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <h3 className="text-slate-400 text-sm">Revenue</h3>
          <p className="text-4xl font-black text-amber-400 mt-2">
            $
            {data.reduce(
              (total, item) =>
                total + Number(item.bookingAmount || 0),
              0
            )}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="px-6 py-5 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white">
            All Bookings
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-800/50">
                <th className="text-left px-6 py-4 text-slate-300 font-semibold">
                  Property
                </th>

                <th className="text-left px-6 py-4 text-slate-300 font-semibold">
                  Tenant
                </th>

                <th className="text-left px-6 py-4 text-slate-300 font-semibold">
                  Move In
                </th>

                <th className="text-left px-6 py-4 text-slate-300 font-semibold">
                  Amount
                </th>

                <th className="text-left px-6 py-4 text-slate-300 font-semibold">
                  Payment
                </th>

                <th className="text-left px-6 py-4 text-slate-300 font-semibold">
                  Status
                </th>

                <th className="text-left px-6 py-4 text-slate-300 font-semibold">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-t border-slate-800 hover:bg-slate-800/40 transition"
                >
                  <td className="px-6 py-5">
                    <div>
                      <p className="font-semibold text-white">
                        {booking.propertyTitle}
                      </p>
                      <p className="text-xs text-slate-500">
                        {booking.propertyId}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-slate-300">
                    {booking.tenantEmail}
                  </td>

                  <td className="px-6 py-5 text-slate-300">
                    {booking.moveInDate || "N/A"}
                  </td>

                  <td className="px-6 py-5">
                    <span className="font-bold text-amber-400">
                      ${booking.bookingAmount}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        booking.paymentStatus === "Paid"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {booking.paymentStatus}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        booking.bookingStatus === "Confirmed"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {booking.bookingStatus}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-slate-400">
                    {booking.createdAt
                      ? new Date(
                          booking.createdAt
                        ).toLocaleDateString()
                      : "N/A"}
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

export default page;