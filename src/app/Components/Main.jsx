"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Home,
  DollarSign,
  SlidersHorizontal,
} from "lucide-react";

const propertyTypes = [
  "Any Type",
  "Apartment",
  "House",
  "Villa",
  "Studio",
  "Office",
];

const Banner = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    location: "",
    type: "Any Type",
    minPrice: "",
    maxPrice: "",
  });

  // ✅ SAFE SEARCH HANDLER
  const handleSearch = () => {
    setLoading(true);

    const params = new URLSearchParams();

    if (filters.location) params.set("location", filters.location);
    if (filters.type !== "Any Type") params.set("type", filters.type);
    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);

    const query = params.toString();

    router.push(query ? `/allproperties?${query}` : "/allproperties");

    setTimeout(() => setLoading(false), 500);
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050810]">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            "url('/chris-orcutt-DmEX6_oQI-U-unsplash.jpg')",
        }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/60" />

      {/* CONTENT */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center space-y-6"
      >

        {/* BADGE */}
        <motion.div variants={fadeUp}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-full border border-blue-500/30">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            #1 Rental Marketplace
          </span>
        </motion.div>

        {/* TITLE */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-6xl font-black text-white"
        >
          Find Your{" "}
          <span className="text-blue-400">Dream Home</span>
        </motion.h1>

        {/* DESCRIPTION */}
        <motion.p
          variants={fadeUp}
          className="text-slate-400 max-w-2xl mx-auto"
        >
          Browse thousands of verified rental properties in Bangladesh.
        </motion.p>

        {/* SEARCH BOX */}
        <motion.form
          variants={fadeUp}
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="bg-slate-900/70 backdrop-blur-xl border border-slate-700 rounded-2xl p-4 space-y-3"
        >

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">

            {/* LOCATION */}
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-slate-500" size={16} />
              <input
                type="text"
                placeholder="Location"
                value={filters.location}
                onChange={(e) =>
                  setFilters({ ...filters, location: e.target.value })
                }
                className="w-full pl-10 py-3 bg-slate-800 text-white rounded-xl outline-none"
              />
            </div>

            {/* TYPE */}
            <div className="relative">
              <Home className="absolute left-3 top-3 text-slate-500" size={16} />
              <select
                value={filters.type}
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value })
                }
                className="w-full pl-10 py-3 bg-slate-800 text-white rounded-xl outline-none"
              >
                {propertyTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* MIN PRICE */}
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 text-slate-500" size={16} />
              <input
                type="number"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) =>
                  setFilters({ ...filters, minPrice: e.target.value })
                }
                className="w-full pl-10 py-3 bg-slate-800 text-white rounded-xl outline-none"
              />
            </div>

            {/* MAX PRICE */}
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 text-emerald-400" size={16} />
              <input
                type="number"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters({ ...filters, maxPrice: e.target.value })
                }
                className="w-full pl-10 py-3 bg-slate-800 text-white rounded-xl outline-none"
              />
            </div>

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Search size={16} />
            {loading ? "Searching..." : "Search Properties"}
          </button>

        </motion.form>

        {/* QUICK TAGS */}
        <div className="flex flex-wrap justify-center gap-2">
          {["Dhaka", "Chittagong", "Sylhet", "Apartment", "Villa"].map(
            (tag) => (
              <button
                key={tag}
                onClick={() => {
                  const isCity = ["Dhaka", "Chittagong", "Sylhet"].includes(
                    tag
                  );

                  setFilters((prev) => ({
                    ...prev,
                    location: isCity ? tag : prev.location,
                    type: !isCity ? tag : prev.type,
                  }));
                }}
                className="px-3 py-1 text-xs bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700"
              >
                {tag}
              </button>
            )
          )}
        </div>

      </motion.div>
    </section>
  );
};

export default Banner;