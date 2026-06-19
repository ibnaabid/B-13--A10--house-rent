"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Users, Zap, Wallet, ArrowUpRight } from "lucide-react";

const WhyChooseUs = () => {
  // কার্ডগুলোর এন্ট্র্যান্স অ্যানিমেশন
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const features = [
    {
      icon: ShieldCheck,
      title: "Verified Properties Only",
      description: "Every apartment, house, and villa goes through a rigorous background authentication check before listing.",
      color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      hoverBg: "group-hover:bg-blue-600"
    },
    {
      icon: Users,
      title: "Direct Landlord Connect",
      description: "No hidden middlemen. Talk directly to the verified hosts, negotiate structures, and lock terms smoothly.",
      color: "bg-amber-500/10 text-amber-600 border-amber-500/20",
      hoverBg: "group-hover:bg-amber-600"
    },
    {
      icon: Zap,
      title: "One-Click Fast Booking",
      description: "Instantly sign digital leases and request booking confirmations with our optimized secure network pipeline.",
      color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      hoverBg: "group-hover:bg-emerald-600"
    },
    {
      icon: Wallet,
      title: "Transparent Pricing",
      description: "What you see is what you pay. Zero hidden operational fees, ensuring ultimate corporate compliance.",
      color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
      hoverBg: "group-hover:bg-purple-600"
    }
  ];

  return (
    <section className="bg-slate-50 py-24 border-y border-slate-200/60 relative overflow-hidden text-slate-900">
      {/* লাইট গ্লো ইফেক্ট */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* সেকশন হেডার */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="px-4 py-1.5 bg-blue-600/5 text-blue-600 text-xs font-bold tracking-wider uppercase rounded-full border border-blue-600/10">
            🛡️ Core Infrastructure Value
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-none text-slate-900">
            Why Choose Rent<span className="text-blue-600">Sphere</span>?
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-light">
            We bridge the gap between premium tenants and luxury space owners with full transparency.
          </p>
        </div>

        {/* ফিচার কার্ড গ্রিড (Bento Grid Inspiration) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all relative group flex flex-col justify-between overflow-hidden"
            >
              {/* উপরের কর্নার গ্লো ইফেক্ট (হোভার করলে জ্বলবে) */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-slate-100 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-4 relative z-10">
                {/* আইকন বক্স */}
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all ${item.color} group-hover:text-white ${item.hoverBg} group-hover:scale-110 shadow-sm`}>
                  <item.icon size={22} className="transition-transform" />
                </div>

                {/* টেক্সট কন্টেন্ট */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-1 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* অ্যাকশন বাটন বা সূক্ষ্ম তীর চিহ্ন */}
              <div className="pt-6 flex justify-end text-slate-300 group-hover:text-blue-600 transition-colors relative z-10">
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default WhyChooseUs;