"use client";

import { motion } from "framer-motion";
import { MapPin, Building2 } from "lucide-react";

export default function LocationsPage() {
  const locations = [
    { city: "Dhaka", areas: ["Gulshan", "Banani", "Dhanmondi", "Uttara"] },
    { city: "Chattogram", areas: ["Panchlaish", "GEC", "Agrabad"] },
    { city: "Sylhet", areas: ["Zindabazar", "Amberkhana", "Subidbazar"] },
  ];

  // Framer Motion Variants for Staggered Animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-16 relative overflow-hidden">
      {/* Background Subtle Glows */}
      <div className="absolute top-[-10%] left-[20%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[20%] w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-16 relative z-10"
      >
        <h1 className="text-4xl sm:text-5xl font-black mb-3 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
          Explore Locations
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto">
          Find rental properties in your favorite city with ultimate comfort.
        </p>
      </motion.div>

      {/* Grid Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10"
      >
        {locations.map((loc, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ 
              y: -8, 
              borderColor: "rgba(59, 130, 246, 0.6)",
              boxShadow: "0 20px 40px -15px rgba(59, 130, 246, 0.15)"
            }}
            className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-7 transition-colors duration-300 group"
          >
            {/* City Title */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <Building2 size={20} />
              </div>
              <h2 className="text-2xl font-bold tracking-tight group-hover:text-blue-400 transition-colors duration-300">
                {loc.city}
              </h2>
            </div>

            {/* Areas List */}
            <div className="space-y-3">
              {loc.areas.map((area, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex items-center gap-2.5 text-slate-400 hover:text-blue-400 cursor-pointer text-sm font-medium transition-colors"
                >
                  <MapPin size={15} className="text-slate-600 group-hover:text-blue-400/50" />
                  {area}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}