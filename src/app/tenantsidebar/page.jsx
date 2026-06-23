// src/app/dashboard/layout.js
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Heart,
  User,
  LogOut,
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const menuItems = [
    { label: "Dashboard", href: "/dashboard/tenant", icon: LayoutDashboard },
    { label: "My Bookings", href: "/dashboard/tenant/booking", icon: BookOpen },
    { label: "Favorites", href: "/dashboard/tenant/favorites", icon: Heart },
    { label: "Profile", href: "/dashboard/tenant/profile", icon: User },
  ];

  return (
    // md:flex-row এর মাধ্যমে বড় স্ক্রিনে পাশাপাশি লেআউট হবে
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row text-white antialiased">
      
      {/* ========================================================= */}
      {/* ১. DESKTOP SIDEBAR (শুধুমাত্র মাঝারি ও বড় স্ক্রিনে দেখাবে) */}
      {/* ========================================================= */}
      <aside className="w-64 xl:w-72 bg-slate-900 border-r border-slate-800/60 hidden md:flex flex-col shrink-0">
        
        {/* ব্র্যান্ড লোগো */}
        <div className="p-6 border-b border-slate-800/60">
          <h1 className="text-xl xl:text-2xl font-black tracking-tight text-white">
            Rent<span className="text-blue-500">Sphere</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">Tenant Dashboard</p>
        </div>

        {/* নেভিগেশন লিংকস */}
        <nav className="flex-1 p-4 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/10"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* লগআউট বাটন */}
        <div className="p-4 border-t border-slate-800/60">
          <button className="w-full flex items-center justify-center gap-2 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/20 py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-95">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* ২. MOBILE BOTTOM NAVIGATION (শুধুমাত্র মোবাইলে স্ক্রিনের নিচে ফিক্সড থাকবে) */}
      {/* ========================================================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 z-50 flex items-center justify-around px-2 shadow-2xl">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 rounded-xl transition-all ${
                isActive 
                  ? "text-blue-500 font-bold scale-105" 
                  : "text-slate-400 font-medium"
              }`}
            >
              <Icon size={20} className={isActive ? "stroke-[2.5]" : "stroke-[1.8]"} />
              <span className="text-[10px] tracking-tight truncate max-w-[64px]">
                {item.label.split(" ").pop()} {/* 'My Bookings' কে শুধু 'Bookings' দেখাবে যাতে জায়গা বাঁচে */}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* ========================================================= */}
      {/* ৩. MAIN CONTENT AREA (মূল কন্টেন্ট এরিয়া) */}
      {/* ========================================================= */}
      {/* pb-20 দেওয়া হয়েছে যাতে মোবাইলে বটম বারের নিচে মেইন কন্টেন্ট ঢাকা না পড়ে */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-0">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-slate-950 overflow-x-hidden overflow-y-auto">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>

    </div>
  );
}