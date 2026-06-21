"use client";

import Image from "next/image";
import { 
  Home, 
  DollarSign, 
  CalendarCheck, 
  PlusCircle, 
  Users, 
  TrendingUp,
  User,
  Mail,
  Heart,
  Clock,
  ShieldAlert
} from "lucide-react"; 
import { authClient } from "@/app/lib/auth-client";

const Page = () => {
  const { data: session, isPending } = authClient.useSession();
  
  // সেশন থেকে রোল, নাম ও ইমেইল রিড করা হচ্ছে
  const userRole = session?.user?.role?.toLowerCase() || "tenant"; // ডিফল্ট 'tenant' রাখলাম
  const userName = session?.user?.name || "Guest User";
  const userEmail = session?.user?.email || "";
  const userImageUrl = session?.user?.image;

  const avatarFallback = userName.charAt(0).toUpperCase();

  // লোডিং স্টেট
  if (isPending) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-blue-400 font-medium tracking-wide text-sm">Loading Dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100">
      
      {/* ─── গ্লোবাল হেডার (সবার জন্য এক কিন্তু বাটন আলাদা) ─── */}
      <header className="h-24 bg-slate-900/50 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between px-8 sticky top-0 z-50">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-white text-2xl font-black tracking-tight">
              Welcome Back, {userName} 👋
            </h2>
            <span className={`text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-sm ${
              userRole === "owner" ? "bg-gradient-to-r from-amber-500 to-orange-500" : "bg-gradient-to-r from-cyan-500 to-blue-500"
            }`}>
              {userRole}
            </span>
          </div>
          <p className="text-slate-400 text-xs mt-0.5">
            {userRole === "owner" 
              ? "Monitor your properties, earnings, and real-time tenant bookings." 
              : "Manage your rented spaces, explore new properties, and view favorites."}
          </p>
        </div>

        <div className="flex items-center gap-6">
          {/* 🔘 রোল অনুযায়ী হেডার বাটন পরিবর্তন */}
          {userRole === "owner" ? (
            <button className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg shadow-blue-600/10 active:scale-95">
              <PlusCircle className="w-4 h-4" />
              Add New Property
            </button>
          ) : (
            <button className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg active:scale-95">
              <Home className="w-4 h-4" />
              Explore Properties
            </button>
          )}

          {/* 👤 প্রোফাইল অ্যাভাটার ও ড্রপডাউন */}
          <div className="relative group cursor-pointer py-2">
            {userImageUrl ? (
              <div className="w-12 h-12 rounded-2xl border-2 border-blue-500/30 overflow-hidden group-hover:border-blue-500 transition duration-300 relative">
                <Image fill src={userImageUrl} alt="profile" className="object-cover" sizes="48px" priority />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-2xl border-2 border-blue-500/30 bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black text-lg group-hover:border-blue-500 transition duration-300">
                {avatarFallback}
              </div>
            )}
            <div className="absolute bottom-1 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-slate-900 rounded-full z-10"></div>

            {/* হোভার কার্ড মেনু */}
            <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 origin-top-right z-50">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-3 mb-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-blue-400" /> {userName}
                  </p>
                  <p className="text-xs text-slate-400 truncate flex items-center gap-1.5 mt-0.5">
                    <Mail className="w-3.5 h-3.5 text-slate-500" /> {userEmail}
                  </p>
                </div>
              </div>
              <button 
                onClick={async () => await authClient.signOut()}
                className="w-full bg-slate-800 hover:bg-red-950/40 hover:text-red-400 text-slate-300 text-xs font-semibold py-2 rounded-xl transition border border-transparent hover:border-red-900/50"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─── মেইন কন্টেন্ট এরিয়া ─── */}
      <main className="p-8 max-w-7xl mx-auto space-y-8">
        
        {/* 🌟 কন্ডিশনাল গ্রিড রেন্ডারিং */}
        {userRole === "owner" ? (
          
          // =================== 🏠 OWNER DESIGN ===================
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Revenue */}
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

            {/* Active Bookings */}
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

            {/* Listed Properties */}
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

            {/* Total Tenants */}
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

        ) : (
          
          // =================== 🔑 TENANT / USER DESIGN ===================
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* My Rented Home */}
            <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-6 shadow-xl relative group hover:border-slate-700 transition duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Current Rented Home</p>
                  <h1 className="text-xl font-bold text-white mt-2 tracking-tight">Green Valley Apt. B4</h1>
                  <p className="text-slate-500 text-xs mt-1">Owner: Rahman Mansur</p>
                </div>
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Home className="w-5 h-5" />
                </div>
              </div>
              <p className="mt-4 text-xs text-cyan-400 font-medium flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Next Rent Due: July 05, 2026
              </p>
            </div>

            {/* Monthly Rent Paid */}
            <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-6 shadow-xl relative group hover:border-slate-700 transition duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Monthly Rent</p>
                  <h1 className="text-3xl font-black text-white mt-2 tracking-tight">৳১৮,৫০০</h1>
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
              <span className="mt-4 inline-flex items-center text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                Paid (June)
              </span>
            </div>

            {/* Favorites Count */}
            <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-6 shadow-xl relative group hover:border-slate-700 transition duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Saved Favorites</p>
                  <h1 className="text-3xl font-black text-red-400 mt-2 tracking-tight">12 Properties</h1>
                </div>
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                  <Heart className="w-5 h-5 fill-red-400/20" />
                </div>
              </div>
              <p className="mt-4 text-xs text-slate-500">Click to view your wishlist table</p>
            </div>
          </div>
        )}

        {/* ─── কুইক অ্যাকশন এরিয়া (রোল অনুযায়ী টেক্সট চেঞ্জ) ─── */}
        <div className="bg-gradient-to-r from-blue-900/20 to-slate-900 border border-blue-500/10 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h4 className="text-white font-bold text-base">
              {userRole === "owner" ? "Need helper services or property maintenance?" : "Facing any issues in your rented property?"}
            </h4>
            <p className="text-slate-400 text-sm mt-0.5">
              {userRole === "owner" 
                ? "Quickly assign managers or view request logs sent by tenants." 
                : "Submit a direct maintenance request or report a problem to the owner."}
            </p>
          </div>
          <button className="bg-white text-slate-950 font-bold text-xs px-5 py-3 rounded-xl hover:bg-slate-200 transition shrink-0">
            {userRole === "owner" ? "View Tenant Requests" : "Create Complain / Ticket"}
          </button>
        </div>

      </main>
    </div>
  );
};

export default Page;