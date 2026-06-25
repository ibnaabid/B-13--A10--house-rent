"use client";

import { useEffect } from "react";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  // সিকিউরিটি এবং রিডাইরেক্ট লজিক ক্লায়েন্ট সাইডে useEffect দিয়ে হ্যান্ডেল করতে হয়
  useEffect(() => {
    if (!isPending) {
      if (!session?.user) {
        router.push("/login");
      } else if (session?.user?.role !== "tenant") {
        router.push("/");
      }
    }
  }, [session, isPending, router]);

  // যখন সেশন লোড হচ্ছে, তখন একটি সুন্দর ব্লার বা লোডিং কঙ্কাল দেখানো উচিত
  if (isPending) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400 text-sm font-medium animate-pulse">
          Loading dashboard...
        </div>
      </div>
    );
  }

  // যদি সেশন না থাকে বা রোল সঠিক না হয়, তবে নিচের JSX রেন্ডার হওয়া সাময়িকভাবে বন্ধ থাকবে
  if (!session?.user || session.user.role !== "tenant") {
    return null;
  }

  return (
    // মোবাইলে সাইড স্পেস p-4 এবং বড় স্ক্রিনে p-8 দিয়ে রেসপনসিভ করা হয়েছে
    <div className="min-h-screen w-full bg-slate-950 p-4 sm:p-6 lg:p-8 text-white antialiased">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Welcome Header */}
        <div className="mb-6 sm:mb-8 text-left">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, {session.user.name || "Tenant"}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Here is an overview of your rental activities.
          </p>
        </div>

        {/* Stats Grid - মোবাইলে ১ কলাম, ট্যাবলেটে ২ কলাম এবং বড় স্ক্রিনে ৩ কলাম দেখাবে */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Total Bookings */}
          <div className="bg-slate-900 border border-slate-800/80 rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-xl hover:border-slate-700/50 transition-colors duration-200">
            <h3 className="text-slate-400 text-xs sm:text-sm font-medium">Total Bookings</h3>
            <h1 className="text-3xl sm:text-4xl font-black text-white mt-2 tracking-tight">12</h1>
          </div>

          {/* Favorites */}
          <div className="bg-slate-900 border border-slate-800/80 rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-xl hover:border-slate-700/50 transition-colors duration-200">
            <h3 className="text-slate-400 text-xs sm:text-sm font-medium">Favorites</h3>
            <h1 className="text-3xl sm:text-4xl font-black text-pink-500 mt-2 tracking-tight">8</h1>
          </div>

          {/* Paid Amount */}
          {/* sm:max-lg ব্রেকপয়েন্টে এই কার্ডটি ফুল চওড়া হয়ে ব্যালেন্স বজায় রাখবে */}
          <div className="bg-slate-900 border border-slate-800/80 rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-xl hover:border-slate-700/50 transition-colors duration-200 sm:col-span-2 lg:col-span-1">
            <h3 className="text-slate-400 text-xs sm:text-sm font-medium">Paid Amount</h3>
            <h1 className="text-3xl sm:text-4xl font-black text-emerald-400 mt-2 tracking-tight">
              ৳25,000
            </h1>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Page;