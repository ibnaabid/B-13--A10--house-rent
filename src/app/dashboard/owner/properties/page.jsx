import { auth } from "@/app/lib/auth";
import { LocateIcon } from "lucide-react";
import { headers } from "next/headers";
import Deletebtn from "./Deletebtn";
import EditBtn from "./EditBtn";

const Property = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const ownerEmail = session?.user?.email;


  if (!ownerEmail) {
    return (
      <div className="p-6 text-white bg-slate-950 min-h-screen">
        <h1 className="text-xl">Please login first</h1>
      </div>
    );
  }

  const res = await fetch("http://localhost:5000/allhome", {
    cache: "no-store",
  });

  const data = await res.json();
  console.log(data,"Properties_data")

  const myProperties = data
  

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          My <span className="text-blue-500">Properties</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Manage your listings, update status and control everything
        </p>
       <h2 className="text-xl font-bold mt-3 px-2 text-sky-300"> Observe your Properties : {data.length}</h2>
      </div>

      {/* TABLE WRAPPER */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">

        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            {/* HEAD */}
            <thead className="bg-slate-900 text-slate-300 uppercase text-xs tracking-wider">
              <tr>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Location</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {myProperties.length > 0 ? (
                myProperties.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t border-slate-800 hover:bg-slate-800/40 transition"
                  >
                    {/* TITLE */}
                    <td className="p-4 font-medium text-white">
                      {item.title}
                    </td>

                    {/* LOCATION */}
                    <td className="p-4 flex px-2 font-bold text-red-300">
                    <LocateIcon/> {item.location}
                    </td>

                    {/* PRICE */}
                    <td className="p-4 text-green-400 font-semibold">
                      ${item.price}
                    </td>

                    {/* STATUS */}
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.status === "Approved"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : item.status === "Rejected"
                            ? "bg-red-500/20 text-red-400 border border-red-500/30"
                            : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                        }`}
                      >
                        {item.status || "Pending"}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="p-4 flex gap-2">

                        <EditBtn item={item}></EditBtn>

                     <Deletebtn item={item}></Deletebtn>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="p-10 text-center text-slate-400"
                  >
                    No properties found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>

  );
};

export default Property;