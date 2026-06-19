// src/app/dashboard/layout.js

import Link from "next/link";
import {
  LayoutDashboard,
  BookOpen,
  Heart,
  User,
  LogOut,
} from "lucide-react";
import Image from "next/image";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 flex">
      
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col">
        
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold text-white">
            Rent<span className="text-blue-500">Sphere</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Tenant Dashboard
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-2">

          <Link
            href="/dashboard/tenant"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            href="/dashboard/tenant/booking"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition"
          >
            <BookOpen size={18} />
            My Bookings
          </Link>

          <Link
            href="/dashboard/tenant/favorites"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition"
          >
            <Heart size={18} />
            Favorites
          </Link>

          <Link
            href="/dashboard/tenant/profile"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition"
          >
            <User size={18} />
            Profile
          </Link>

        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-3 rounded-xl text-white font-semibold transition">
            <LogOut size={18} />
            Logout
          </button>
        </div>

      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        
        {/* Page Content */}
        <main className="flex-1 p-8 bg-slate-950">
          {children}
        </main>

      </div>
    </div>
  );
}