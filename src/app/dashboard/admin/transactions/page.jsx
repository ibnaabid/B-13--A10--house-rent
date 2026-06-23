const Page = async () => {
  const res = await fetch("http://localhost:5000/Bookings", {
    cache: "no-store",
  });

  const bookings = await res.json();

  return (
    <div className="min-h-screen bg-slate-950 p-4 sm:p-6 lg:p-8 text-white">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Transactions
          </h1>
          <p className="text-slate-400 mt-2">
            Manage all payment records and bookings
          </p>
        </div>

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
              $
              {bookings
                .reduce(
                  (total, item) =>
                    total + Number(item.price || item.amount || 0),
                  0
                )
                .toLocaleString()}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-slate-400 text-sm">Completed</p>
            <h2 className="text-3xl font-bold text-blue-400 mt-2">
              {bookings.length}
            </h2>
          </div>
        </div>

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
                 Transciotions Id
                </th>
                <th className="px-6 py-4 text-left">
                  Amount
                </th>
                <th className="px-6 py-4 text-left">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {bookings?.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-slate-800 hover:bg-slate-800/40 transition"
                >
                  <td className="px-6 py-4 font-mono text-cyan-400">
                    TXN-{item._id?.slice(-8)}
                  </td>

                  <td className="px-6 py-4">
                    {item.propertyTitle || item.propertyName}
                  </td>

                  <td className="px-6 py-4">
                    {item.tenantEmail || item.tenantName || "N/A"}
                  </td>

                  <td className="px-6 py-4">
                    {item.transactionId || item.transactionId || "N/A"}
                  </td>

                  <td className="px-6 py-4 text-green-400 font-semibold">
                    ${item.bookingAmount || item.amount || 0}
                  </td>

                  <td className="px-6 py-4 text-slate-400">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
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

export default Page;