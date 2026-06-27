"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Terminal, RefreshCw, ArrowLeft, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CriticalErrorPage() {
  const router = useRouter();

  // Terminal text lines configuration for code vibe
  const terminalLines = [
    { text: "> SYSTEM STATUS: CRITICAL_FAILURE", type: "error" },
    { text: "> TRACE: Auth/Middleware/RoleCheck failed", type: "warning" },
    { text: "> ERROR_CODE: 0xFA74_ACCESS_DENIED", type: "code" },
    { text: "> ACTION: Redirection aborted by RentSphere Guard", type: "success" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 relative overflow-hidden text-white antialiased font-mono">
      
      {/* Danger/Crimson Premium Glow Effects */}
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" 
      />
      <motion.div 
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-amber-600/5 rounded-full blur-[100px] pointer-events-none" 
      />

      <div className="max-w-xl w-full relative z-10">
        
        {/* Main Glassmorphism Code Terminal Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="relative overflow-hidden rounded-3xl border border-rose-500/20 bg-slate-900/40 backdrop-blur-2xl shadow-[0_20px_50px_rgba(244,63,94,0.15)] ring-1 ring-inset ring-white/5"
        >
          {/* Top Danger Line Accent */}
          <div className="h-1 bg-gradient-to-r from-rose-600 via-amber-500 to-rose-600"></div>

          {/* Terminal Header */}
          <div className="px-6 py-4 border-b border-slate-800/80 bg-slate-950/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
              <div className="w-3 h-3 rounded-full bg-slate-700" />
              <div className="w-3 h-3 rounded-full bg-slate-700" />
              <span className="text-xs text-slate-500 font-bold ml-2 tracking-wider">SECURITY_KERNEL.LOG</span>
            </div>
            <Terminal size={14} className="text-rose-500/60" />
          </div>

          <div className="p-6 sm:p-8">
            {/* Warning Icon & Title */}
            <div className="flex flex-col items-center text-center mb-8">
              <motion.div
                animate={{ 
                  y: [0, -6, 0],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 shadow-lg shadow-rose-500/5 mb-4"
              >
                <ShieldAlert size={32} />
              </motion.div>
              
              <h1 className="text-2xl font-black text-rose-400 tracking-tight uppercase">
                Security Breach / Halt
              </h1>
              <p className="text-slate-400 text-xs mt-1 max-w-sm">
                আপনার বর্তমান রোল পারমিশন দিয়ে এই সিকিউরড ডিরেক্টরিতে অ্যাক্সেস করা সম্ভব নয়।
              </p>
            </div>

            {/* Mock Code Log Output */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800/80 font-mono text-xs sm:text-sm space-y-2.5 shadow-inner"
            >
              {terminalLines.map((line, idx) => (
                <motion.div key={idx} variants={lineVariants} className="flex items-start gap-2">
                  <span className={`font-semibold ${
                    line.type === "error" ? "text-rose-500" :
                    line.type === "warning" ? "text-amber-400" :
                    line.type === "success" ? "text-emerald-400" : "text-slate-400"
                  }`}>
                    {line.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Micro-interaction Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mt-8">
              
              {/* Go Back Button */}
              <motion.button
                whileHover={{ y: -2, backgroundColor: "rgba(30, 41, 59, 0.8)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.back()}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 font-bold text-xs uppercase tracking-wider transition-all"
              >
                <ArrowLeft size={14} />
                Abort Session
              </motion.button>

              {/* Force Retry Button */}
              <motion.button
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-rose-600/20"
              >
                <RefreshCw size={14} className="animate-spin-slow" />
                Retry Handshake
              </motion.button>

            </div>

          </div>
        </motion.div>

        {/* Footer Info */}
        <p className="text-center text-[10px] text-slate-700 font-bold uppercase tracking-widest mt-8 select-none">
          Halt Triggered By <span className="text-rose-500/50">RentSphere Firewall v2.4</span>
        </p>

      </div>
    </div>
  );
}