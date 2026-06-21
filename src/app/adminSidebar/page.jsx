"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building2,
  BookOpen,
  CreditCard,
  LogOut,
} from "lucide-react";
import { authClient } from "@/app/lib/auth-client"; // আপনার Better Auth ক্লায়েন্ট পাথ

export default function AdminSidebar() {
  const pathname = usePathname();

  const menus = [
    {
      name: "Dashboard",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      name: "All Users",
      href: "/dashboard/admin/users",
      icon: Users,
    },
    {
      name: "All Properties",
      href: "/dashboard/admin/properties",
      icon: Building2,
    },
    {
      name: "All Bookings",
      href: "/dashboard/admin/bookings",
      icon: BookOpen,
    },
    {
      name: "Transactions",
      href: "/dashboard/admin/transactions",
      icon: CreditCard,
    },
  ];

  return (
    <aside className="w-72 h-screen sticky top-0 bg-slate-950 border-r border-slate-900 flex flex-col justify-between z-40 selection:bg-blue-500/30">
      
      {/* ─── টপ সেকশন (লোগো ও মেনু) ─── */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Brand Logo */}
        <div className="p-6 border-b border-slate-900/60 flex flex-col gap-0.5">
          <h1 className="text-xl font-black text-white tracking-tight flex items-center gap-1.5">
            Rent<span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">Sphere</span>
          </h1>
          <span className="w-fit bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md mt-1">
            Admin Workspace
          </span>
        </div>

        {/* Navigation Menus */}
        <nav className="p-4 mt-4 space-y-1.5 flex-1">
          {menus.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/5 font-semibold"
                    : "text-slate-400 border border-transparent hover:bg-slate-900/60 hover:text-slate-200"
                }`}
              >
                {/* অ্যাক্টিভ আইটেমের বাম পাশের ইন্ডিকেটর লাইন */}
                {isActive && (
                  <span className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-blue-500 rounded-r-full" />
                )}

                <Icon 
                  size={18} 
                  className={`transition-transform duration-200 group-hover:scale-105 ${
                    isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"
                  }`} 
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ─── বটম সেকশন (লগআউট বাটন) ─── */}
      <div className="p-4 border-t border-slate-900 bg-slate-950">
        <button 
          onClick={async () => await authClient.signOut()}
          className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-red-950/30 text-slate-400 hover:text-red-400 py-3 rounded-xl border border-slate-800/60 hover:border-red-900/40 text-sm font-semibold transition-all duration-200 active:scale-[0.98]"
        >
          <LogOut size={16} className="rotate-180" />
          <span>Logout Session</span>
        </button>
      </div>

    </aside>
  );
}