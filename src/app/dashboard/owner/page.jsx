"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";

import {
  DollarSign,
  Building2,
  Calendar,
  TrendingUp,
  User,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function OwnerDashboard() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [analytics, setAnalytics] = useState(null);

 
  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.push("/login");
      return;
    }

    if (session.user.role !== "owner") {
      router.push("/");
      return;
    }
  }, [session, isPending, router]);

  // 🔥 LOAD DASHBOARD DATA
  useEffect(() => {
    const load = async () => {
      if (!session?.user) return;

      // demo data (later API connect korba)
      const data = {
        totalEarnings: 12450,
        totalProperties: 8,
        totalBookings: 34,
        monthlyEarnings: [
          { month: "Jan", earnings: 1200 },
          { month: "Feb", earnings: 1800 },
          { month: "Mar", earnings: 900 },
          { month: "Apr", earnings: 2200 },
          { month: "May", earnings: 1700 },
          { month: "Jun", earnings: 2500 },
        ],
      };

      setAnalytics(data);
    };

    load();
  }, [session]);

  // 🔥 LOADING STATE
  if (isPending || !session?.user) {
    return (
      <div className="text-white p-6">
        Loading dashboard...
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-white p-6">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 space-y-8">

      {/* ===================== */}
      {/* HEADER */}
      {/* ===================== */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Owner <span className="text-blue-500">Dashboard</span>
          </h1>
          <p className="text-slate-400 text-sm">
            Manage your properties & earnings
          </p>
        </div>

        {/* USER */}
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">

          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
            <User size={18} />
          </div>

          <div>
            <p className="text-sm font-bold">
              {session.user.name}
            </p>
            <p className="text-xs text-slate-400">
              {session.user.email}
            </p>
          </div>

        </div>
      </div>

      {/* ===================== */}
      {/* CARDS */}
      {/* ===================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <DollarSign className="text-green-400" />
          <h3 className="text-slate-400 mt-2">Total Earnings</h3>
          <p className="text-3xl font-bold">
            ${analytics.totalEarnings}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <Building2 className="text-blue-400" />
          <h3 className="text-slate-400 mt-2">Total Properties</h3>
          <p className="text-3xl font-bold">
            {analytics.totalProperties}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <Calendar className="text-orange-400" />
          <h3 className="text-slate-400 mt-2">Total Bookings</h3>
          <p className="text-3xl font-bold">
            {analytics.totalBookings}
          </p>
        </div>

      </div>

      {/* ===================== */}
      {/* CHART */}
      {/* ===================== */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">

          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <TrendingUp className="text-purple-400" />
              Monthly Earnings
            </h2>
            <p className="text-sm text-slate-400">
              Last 6 months performance
            </p>
          </div>

          {/* USER BADGE */}
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl">

            <User size={16} className="text-blue-400" />

            <div className="text-right">
              <p className="text-sm font-semibold">
                {session.user.name}
              </p>
              <p className="text-[10px] text-slate-400">
                {session.user.role}
              </p>
            </div>

          </div>

        </div>

        {/* CHART */}
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={analytics.monthlyEarnings}>

            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="earnings"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 4 }}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}