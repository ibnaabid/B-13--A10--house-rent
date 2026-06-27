"use client";

import { motion } from "framer-motion";
import { Terminal, FileX, ArrowLeft, Home, SearchCode } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NotFoundCodingDanger() {
  const router = useRouter();

  // Console mock output for 404 not found log
  const logLines = [
    { text: ">> INITIATING GLOBAL ROUTE SCAN...", type: "info" },
    { text: ">> REQUESTED_URL: Object not referenced in directory", type: "warning" },
    { text: ">> STATUS: 404_TARGET_NOT_FOUND", type: "error" },
    { text: ">> [FATAL] রিকোয়েস্ট করা পেজ বা ফাইলটি ডাটাবেজে এক্সিস্ট করে না।", type: "bangla" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 120 } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 relative overflow-hidden text-white antialiased font-mono">
      
      {/* Background Animated Neon Danger Glows */}
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[160px] pointer-events-none" 
      />
      <motion.div 
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" 
      />

      <div className="max-w-xl w-full relative z-10">
        
        {/* Glassmorphic Cyber Terminal Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 90, damping: 22 }}
          className="relative overflow-hidden rounded-3xl border border-red-500/20 bg-slate-900/30 backdrop-blur-3xl shadow-[0_25px_60px_rgba(239,68,68,0.12)] ring-1 ring-white/5"
        >
          {/* Top Warning Progress Bar Line */}
          <div className="h-[2px] bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 animate-pulse"></div>

          {/* Terminal Top Window Bar */}
          <div className="px-5 py-3.5 border-b border-slate-800/80 bg-slate-950/60 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
              <span className="text-[11px] text-slate-500 font-bold ml-2 tracking-widest">HTTP_ERROR_404.SYS</span>
            </div>
            <Terminal size={14} className="text-red-500/40" />
          </div>

          <div className="p-6 sm:p-8">
            
            {/* Main Danger 404 Visual Header */}
            <div className="flex flex-col items-center text-center mb-8">
              <motion.div
                animate={{ 
                  y: [0, -8, 0],
                  filter: ["drop-shadow(0 0 0px rgba(239,68,68,0))", "drop-shadow(0 0 12px rgba(239,68,68,0.3))", "drop-shadow(0 0 0px rgba(239,68,68,0))"]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 rounded-2xl bg-red-950/50 border border-red-500/30 flex items-center justify-center text-red-400 mb-4 shadow-inner"
              >
                <FileX size={30} className="animate-pulse" />
              </motion.div>
              
              <h1 className="text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-100 to-red-500/50">
                404_ERR
              </h1>
              <h2 className="text-sm font-bold text-red-400 uppercase tracking-widest mt-2">
                [ Destination Destroyed or Null ]
              </h2>
            </div>

            {/* Terminal Code Log Area */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-slate-950/90 rounded-2xl p-4 sm:p-5 border border-slate-800/60 font-mono text-xs sm:text-[13px] space-y-3 shadow-2xl relative"
            >
              <div className="absolute top-2 right-3 text-[9px] text-slate-600 select-none font-sans font-bold">LIVE_FEED</div>
              {logLines.map((line, idx) => (
                <motion.div key={idx} variants={lineVariants} className="flex items-start gap-1">
                  <span className={`leading-relaxed ${
                    line.type === "error" ? "text-red-500 font-bold animate-pulse" :
                    line.type === "warning" ? "text-amber-400" :
                    line.type === "bangla" ? "text-slate-300 font-sans text-xs" : "text-blue-400"
                  }`}>
                    {line.text}
                  </span>
                </motion.div>
              ))}
              {/* Blinking Terminal Cursor */}
              <div className="flex items-center gap-1 text-slate-500">
                <span>&gt; console.halt()_</span>
                <span className="w-1.5 h-3.5 bg-red-500 animate-ping inline-block" />
              </div>
            </motion.div>

            {/* Interactive Cyber Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mt-8">
              
              {/* Back Button */}
              <motion.button
                whileHover={{ y: -2, backgroundColor: "rgba(244, 63, 94, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.back()}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/80 border border-red-500/20 text-red-400 font-bold text-xs uppercase tracking-wider transition-all"
              >
                <ArrowLeft size={14} />
                Safe Abort
              </motion.button>

              {/* Home Link Container */}
              <motion.div className="w-full sm:w-auto" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-red-600/20"
                >
                  <Home size={14} />
                  Return to Core
                </Link>
              </motion.div>

            </div>

          </div>
        </motion.div>

        {/* Footer Brand Tag */}
        <div className="flex items-center justify-center gap-2 mt-8 text-slate-700 select-none">
          <SearchCode size={12} className="text-slate-800" />
          <p className="text-[10px] font-bold uppercase tracking-widest">
            Rent<span className="text-red-500/30">Sphere</span> DeepScan Engine
          </p>
        </div>

      </div>
    </div>
  );
}