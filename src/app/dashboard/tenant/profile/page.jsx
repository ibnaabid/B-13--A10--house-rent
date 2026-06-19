"use client";

import Image from "next/image";
import { 
  Home, 
  DollarSign, 
  CalendarCheck, 
  PlusCircle, 
  Users, 
  TrendingUp 
} from "lucide-react"; // আইকনগুলোর জন্য (ইন্সটল করা না থাকলে npm i lucide-react করে নিও)
import { authClient } from "@/app/lib/auth-client";

const Page = () => {
  // ক্লায়েন্ট সাইড সেশন হুক
  const { data: session, isPending } = authClient.useSession();
  const userRole = session?.user?.role || "owner"; // ব্যাকআপ হিসেবে 'owner' ধরে রাখলাম
  const userName = session?.user?.name || "Premium Owner";

  if (isPending) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-pulse text-blue-400 font-medium">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100">
      
      {/* ─── হেডার সেকশন ─── */}
      <header className="h-24 bg-slate-900/50 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between px-8 sticky top-0 z-50">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-white text-2xl font-black tracking-tight">
              Welcome Back, {userName} 👋
            </h2>
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-sm">
              {userRole}
            </span>
          </div>
          <p className="text-slate-400 text-xs mt-0.5">
            Monitor your properties, earnings, and real-time tenant bookings.
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* প্রপার্টি অ্যাড করার জন্য ওনার স্পেশাল বাটন */}
          <button className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg shadow-blue-600/10 active:scale-95">
            <PlusCircle className="w-4 h-4" />
            See Book Property
          </button>

          <div className="relative group">
            <Image
              height={150}
              width={150}
              src={session?.user?.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150"} // ওনারের জন্য একটা প্রিমিয়াম ডামি পোর্ট্রেট
              alt="owner profile"
              className="w-12 h-12 rounded-2xl border-2 border-blue-500/30 object-cover group-hover:border-blue-500 transition duration-300 shadow-md"
            />
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-slate-900 rounded-full"></div>
          </div>
        </div>
      </header>

      {/* ─── মেইন কন্টেন্ট ─── */}
      <main className="p-8 max-w-7xl mx-auto space-y-8">
        
        {/* ওনার অ্যানালিটিক্স গ্রিড (ওনারদের জন্য স্পেশাল কার্ডসমূহ) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* মোট আয় (Total Earnings) */}
          <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-slate-700 transition duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Revenue</p>
                <h1 className="text-3xl font-black text-white mt-2 tracking-tight">৳১,৮৫,০০০</h1>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+12.5% from last month</span>
            </div>
          </div>

          {/* একটিভ বুকিং (Active Bookings) */}
          <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-slate-700 transition duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Active Bookings</p>
                <h1 className="text-3xl font-black text-white mt-2 tracking-tight">08</h1>
              </div>
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <CalendarCheck className="w-5 h-5" />
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-500">2 bookings ending this week</p>
          </div>

          {/* মোট বাড়ি/প্রপার্টি (Total Properties) */}
          <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-slate-700 transition duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Listed Properties</p>
                <h1 className="text-3xl font-black text-white mt-2 tracking-tight">14</h1>
              </div>
              <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
                <Home className="w-5 h-5" />
              </div>
            </div>
            <p className="mt-4 text-xs text-violet-400 font-medium">12 Occupied • 2 Available</p>
          </div>

          {/* মোট ভাড়াটিয়া (Total Tenants) */}
          <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-slate-700 transition duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Tenants</p>
                <h1 className="text-3xl font-black text-pink-500 mt-2 tracking-tight">24</h1>
              </div>
              <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-500">All identity verifications cleared</p>
          </div>

        </div>

        {/* ─── ওনার নোটিফিকেশন / কুইক অ্যাকশন এরিয়া ─── */}
        <div className="bg-gradient-to-r from-blue-900/20 to-slate-900 border border-blue-500/10 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h4 className="text-white font-bold text-base">Need helper services or property maintenance?</h4>
            <p className="text-slate-400 text-sm mt-0.5">Quickly assign managers or view request logs sent by tenants.</p>
          </div>
          <button className="bg-white text-slate-950 font-bold text-xs px-5 py-3 rounded-xl hover:bg-slate-200 transition shrink-0">
            View Tenant Requests
          </button>
        </div>

      </main>
    </div>
  );
};

export default Page;