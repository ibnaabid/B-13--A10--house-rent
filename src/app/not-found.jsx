"use client";

import { motion } from "framer-motion";
import { Home, ArrowLeft, Ghost } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 relative overflow-hidden text-white antialiased">
      
      {/* Background Animated Premium Glows */}
      <motion.div 
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" 
      />
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" 
      />

      <div className="text-center max-w-md w-full relative z-10">
        
        {/* Animated Ghost / 404 Icon */}
        <motion.div
          animate={{ 
            y: [0, -18, 0],
            rotate: [0, 3, -3, 0]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="w-24 h-24 mx-auto bg-slate-900/60 border border-slate-800/80 rounded-3xl flex items-center justify-center shadow-2xl mb-8 text-blue-500 shadow-blue-500/10 backdrop-blur-sm"
        >
          <Ghost size={46} className="animate-pulse" />
        </motion.div>

        {/* 404 Error Code */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
          className="text-9xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-200 to-slate-600 tracking-tighter select-none"
        >
          404
        </motion.h1>

        {/* Heading & Subtitle */}
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-2xl font-bold mt-4 tracking-tight text-slate-100"
        >
          Page Lost in Space
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-slate-400 text-sm mt-3 font-medium px-4 leading-relaxed"
        >
          আমরা যে পেজটি খুঁজছেন সেটি হয়তো ডিলিট হয়ে গেছে অথবা ভুল লিঙ্কে চলে এসেছে। চিন্তার কিছু নেই, চলুন আপনাকে সঠিক রাস্তায় ফিরিয়ে নিয়ে যাই!
        </motion.p>

        {/* ACTION BUTTONS */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 items-center justify-center mt-10 px-4"
        >
          {/* Go Back Button */}
          <motion.button
            whileHover={{ y: -3, backgroundColor: "rgb(30, 41, 59)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.back()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-800/80 text-slate-300 font-semibold text-sm transition-all shadow-md"
          >
            <ArrowLeft size={16} />
            Go Back
          </motion.button>

          {/* Go Home Button */}
          <motion.div className="w-full sm:w-auto" whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/20"
            >
              <Home size={16} />
              Back to Home
            </Link>
          </motion.div>
        </motion.div>

        {/* BRAND FOOTER */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-[11px] text-slate-700 font-bold uppercase tracking-widest mt-14 select-none"
        >
          Rent<span className="text-blue-500/40">Sphere</span> Security Guard
        </motion.p>

      </div>
    </div>
  );
}