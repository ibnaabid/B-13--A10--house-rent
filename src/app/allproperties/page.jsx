import { LocateIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const page = async () => {
  const res = await fetch("http://localhost:5000/allhome", {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Available <span className="text-blue-500">Properties</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Find your perfect home from our listings
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {data?.map((item) => (
          <div
            key={item._id}
            className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden hover:scale-[1.02] transition duration-300 shadow-lg"
          >

            {/* IMAGE */}
            <div className="relative h-48 w-full">
              <Image
                src={item.image || "https://via.placeholder.com/400"}
                alt={item.title}
                fill
                className="object-cover"
              />

              {/* PRICE BADGE */}
              <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-bold">
                ৳ {item.price}
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-4 space-y-2">

              <h2 className="text-lg font-bold line-clamp-1">
                {item.title}
              </h2>

              <p className="text-slate-400 text-sm flex items-center gap-1">
                <LocateIcon/> {item.location}
              </p>

              <p className="text-slate-500 text-xs line-clamp-2">
                {item.description}
              </p>

              {/* FOOTER */}
              <div className="flex justify-between items-center pt-3">

                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    item.status === "Approved"
                      ? "bg-green-500/20 text-green-400"
                      : item.status === "Rejected"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {item.status || "Pending"}
                </span>
<Link href={`/allproperties/${item._id}`}>

                <button className="text-xl  bg-violet-500  hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition">
                  View Details
                </button></Link>

              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default page;