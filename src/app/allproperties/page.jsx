"use client";

import { useEffect, useMemo, useState } from "react";
import { LocateIcon, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "../lib/auth-client";

const AllProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [sort, setSort] = useState("");

useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data: token } = await authClient.token();
        
        // token না থাকলে wait করো
        if (!token?.token) {
          setLoading(false);
          return;
        }

        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/allhome?page=${page}&limit=6`,
          {
            headers: {
              authorization: `Bearer ${token.token}`
            }
          }
        );

        const data = await res.json();
        setProperties(data.data || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.log(err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [page]);
  

  const filteredProperties = useMemo(() => {
    let result = [...properties];

    if (search) {
      result = result.filter((item) =>
        item.location?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (propertyType) {
      result = result.filter(
        (item) => item.propertyType === propertyType
      );
    }

    if (sort === "low") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sort === "high") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return result;
  }, [properties, search, propertyType, sort]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black">
          Available <span className="text-violet-500">Properties</span>
        </h1>
        <p className="text-slate-400 mt-2">
          Find your perfect rental property
        </p>
      </div>

      {/* Filter Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-8">
        <div className="grid md:grid-cols-3 gap-4">

          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-4 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3"
            />
          </div>

          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
          >
            <option value="">All Property Types</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
          >
            <option value="">Sort Properties</option>
            <option value="low">Price Low to High</option>
            <option value="high">Price High to Low</option>
          </select>

        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <p className="text-slate-400 text-sm">Total Properties</p>
          <h2 className="text-3xl font-bold mt-2">
            {filteredProperties.length}
          </h2>
        </div>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((item) => (
          <div
            key={item._id}
            className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-violet-500 transition"
          >
            <div className="relative h-52">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />

              <div className="absolute top-3 right-3 bg-violet-600 px-3 py-1 rounded-full text-sm font-bold">
                ৳ {item.price}
              </div>
            </div>

            <div className="p-5">
              <h2 className="font-bold text-lg mb-2">
                {item.title}
              </h2>

              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <LocateIcon size={16} />
                {item.location}
              </div>

              <p className="text-slate-500 text-sm mt-3 line-clamp-2">
                {item.description}
              </p>

              <div className="mt-5">
                <Link href={`/allproperties/${item._id}`}>
                  <button className="w-full bg-violet-600 hover:bg-violet-700 py-3 rounded-xl font-semibold">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">

        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-slate-800 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-4 py-2 rounded-lg ${
              page === p
                ? "bg-violet-600 text-white"
                : "bg-slate-800 text-slate-300"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-slate-800 rounded-lg disabled:opacity-50"
        >
          Next
        </button>

      </div>
    </div>
  );
};

export default AllProperties;