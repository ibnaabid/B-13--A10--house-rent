import { HeartCrack, Trash2 } from "lucide-react";
import DelteFav from "./DelteFav";
// import { authClient } from "@/app/lib/auth-client";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";


const Page = async () => {

  const token = await auth.api.getToken({
    headers: await headers()
  })
  console.log(token.token)


  const res = await fetch("http://localhost:5000/favorites", {
    cache: "no-store",
    headers:{
      authorization : `Bearer ${token.token}`
    }
  });

  const data = await res.json();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="p-6 border-b">
          <h1 className="text-3xl font-bold">Favorite Properties</h1>
          <p className="text-gray-500 mt-1">
            Total Favorites: {data.length}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-6 py-4 text-left">#</th>
                <th className="px-6 py-4 text-left">Title</th>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Property ID</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">{index + 1}</td>

                  <td className="px-6 py-4 font-medium">
                    {item.title}
                  </td>

                  <td className="px-6 py-4">
                    {item.name}
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {item.propertyId}
                  </td>

                  <td className="px-6 py-4 flex justify-center">
                    <DelteFav item={item}></DelteFav>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {data.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No favorite property found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;