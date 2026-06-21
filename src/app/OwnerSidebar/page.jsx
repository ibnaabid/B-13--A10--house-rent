"use client";

import Link from "next/link";
import { Home, Building2, DollarSign, Calendar, PlusCircle, User } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 p-5">

      <h1 className="text-2xl font-bold mb-8">
        Owner <span className="text-blue-500">Panel</span>
      </h1>

      <nav className="space-y-4">

        <Link href="/dashboard/owner" className="flex items-center gap-2 hover:text-blue-400">
          <Home size={18} /> Dashboard
        </Link>

        <Link href="/dashboard/owner/properties" className="flex items-center gap-2 hover:text-blue-400">
          <Building2 size={18} /> My Properties
        </Link>

        <Link href="/dashboard/owner/bookings" className="flex items-center gap-2 hover:text-blue-400">
          <Calendar size={18} /> Bookings
        </Link>

        <Link href="/dashboard/owner/add-property" className="flex items-center gap-2 hover:text-blue-400">
          <PlusCircle size={18} /> Add Property
        </Link>

        <Link href="/dashboard/owner/profile" className="flex items-center gap-2 hover:text-blue-400">
          <User size={18} /> Profile
        </Link>

      </nav>

    </div>
  );
}