"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Home } from "lucide-react";

const Hero = () => {
  // টেক্সট এবং বাটনের জন্য স্মুথ অ্যানিমেশন ভ্যারিয়েন্ট
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // একটির পর আরেকটি এলিমেন্ট অ্যানিমেট হবে
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section 
      className="relative min-h-[90vh] flex items-center justify-center bg-cover bg-center bg-no-repeat text-white"
      style={{
        backgroundImage: "url('/chris-orcutt-DmEX6_oQI-U-unsplash.jpg')",
      }}
    >
      {/* Premium Dark Overlay (DaisyUI-এর মতো কিন্তু আরও রিচ লুকের জন্য Slate-900 মিক্সড) */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/70 to-slate-950/90 backdrop-blur-[2px]"></div>

      {/* Hero Content Area */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* স্মল গ্লোয়িং ব্যাজ */}
          <motion.div variants={itemVariants} className="inline-block">
            <span className="px-4 py-1.5 bg-blue-500/10 text-blue-400 text-xs font-bold tracking-wider uppercase rounded-full border border-blue-500/30 backdrop-blur-md">
              ✨ Welcome to HouseRent Marketplace 
            </span>
          </motion.div>

          {/* মেইন প্রিমিয়াম ক্যাচি হেডলাইন */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-6xl font-black tracking-tight leading-tight"
          >
            Find Your Perfect <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Rental Home</span> Easily
          </motion.h1>

          {/* ডেসক্রিপশন সাবটেক্সট */}
          <motion.p 
            variants={itemVariants}
            className="max-w-2xl mx-auto text-base sm:text-xl text-slate-300 font-light leading-relaxed"
          >
            Discover premium apartments, houses, and villas for rent in your dream locations. 
            Fast booking, verified owners, and secure payment systems.
          </motion.p>

          {/* ইন্টারঅ্যাক্টিভ কল-টু-অ্যাকশন বাটন গ্রুপ */}
          <motion.div 
            variants={itemVariants}
            className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/allproperties"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 group text-sm sm:text-base"
              >
                <Home size={18} /> Browse Homes 
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                className="px-8 py-4 bg-slate-900/60 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold rounded-2xl transition-all backdrop-blur-md flex items-center gap-2 text-sm sm:text-base"
              >
                <Phone size={18} className="text-blue-400" /> Contact Us
              </Link>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>

      {/* নিচের দিকে স্ক্রোল করার গাইড ইফেক্ট */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-500 animate-bounce hidden sm:block">
        <div className="w-6 h-10 border-2 border-slate-700 rounded-full flex justify-center p-1">
          <div className="w-1.5 h-2 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;