"use client";

import { motion } from "framer-motion";
import { Home, ArrowLeft, Ghost } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 relative overflow-hidden text-white">
      
      {/* Background Premium Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="text-center max-w-md w-full relative z-10">
        
        {/* Animated Ghost / 404 Icon */}
        <motion.div
          animate={{ 
            y: [0, -15, 0],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="w-24 h-24 mx-auto bg-slate-900/60 border border-slate-800 rounded-3xl flex items-center justify-center shadow-2xl mb-6 text-blue-500 shadow-blue-500/5"
        >
          <Ghost size={48} className="animate-pulse" />
        </motion.div>

        {/* 404 Error Code */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-8xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500 tracking-tighter"
        >
          404
        </motion.h1>

        {/* Heading & Subtitle */}
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl font-bold mt-4 tracking-tight"
        >
          Page Lost in Space
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-slate-400 text-sm mt-2 font-medium px-4"
        >
          আমরা যে পেজটি খুঁজছি সেটি হয়তো ডিলিট হয়ে গেছে অথবা ভুল লিঙ্কে চলে এসেছে। চিন্তার কিছু নেই, চলুন আপনাকে সঠিক রাস্তায় ফিরিয়ে নিয়ে যাই!
        </motion.p>

        {/* ACTION BUTTONS */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 items-center justify-center mt-8 px-6"
        >
          {/* Go Back Button */}
          <button
            onClick={() => router.back()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-medium text-sm transition-all active:scale-[0.98]"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>

          {/* Go Home Button */}
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/10 active:scale-[0.98]"
          >
            <Home size={16} />
            Back to Home
          </Link>
        </motion.div>

        {/* BRAND FOOTER */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-[11px] text-slate-600 font-semibold uppercase tracking-widest mt-12"
        >
          Rent<span className="text-blue-500/60">Sphere</span> Security Guard
        </motion.p>

      </div>
    </div>
  );
}