"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";

const Page = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  // ─── 🔐 অ্যাডমিন প্রোটেকশন ও রিডাইরেকশন লজিক ───
  useEffect(() => {
    if (isPending) return;

    // ১. লগইন করা না থাকলে লগইন পেজে পাঠাবে
    if (!session?.user) {
      router.push("/login");
      return;
    }

    // ২. লগইন করা ইমেইল যদি আপনার অ্যাডমিন ইমেইল না হয়, তবে মেইন পেজে তাড়িয়ে দেবে
    if (session?.user?.email !== "mdibnaabid123@gmail.com") {
      router.push("/");
    }
  }, [session, isPending, router]);

  // ─── ⏳ সেশন লোড হওয়ার সময়ের স্টেট ───
  if (isPending) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-medium">
        Loading...
      </div>
    );
  }

  // যদি সেশন না থাকে বা অ্যাডমিন না হয়, তাহলে নিচের কন্টেন্ট দেখাবে না (সিকিউরিটি)
  if (!session?.user || session?.user?.email !== "mdibnaabid123@gmail.com") {
    return null;
  }

  // সেশন থেকে ডাটাগুলো ভেরিয়েবলে নেওয়া হলো (যাতে নিচে এরর না আসে)
  const userName = session?.user?.name || "Admin Provider";
  const userRole = session?.user?.role || "Administrator";
  const userImageUrl = session?.user?.image;
  const avatarFallback = userName.charAt(0).toUpperCase();

  return (
    <div className="p-8 bg-slate-950 min-h-screen text-slate-100 flex flex-col justify-center max-w-4xl mx-auto space-y-6">
      
      {/* ─── প্রিমিয়াম ওয়েলকাম কার্ড ─── */}
      <div className="bg-slate-900 border border-slate-850 rounded-3xl p-8 shadow-2xl relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/20">
        
        {/* ব্যাকগ্রাউন্ডের মডার্ন গ্লো ইফেক্ট */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
          
          {/* প্রোফাইল ইমেজ / অ্যাভাটার */}
          {userImageUrl ? (
            <div className="w-20 h-20 rounded-2xl border-2 border-blue-500/30 overflow-hidden shadow-xl relative shrink-0">
              <Image
                fill
                src={userImageUrl}
                alt="Admin Profile"
                className="object-cover"
                sizes="80px"
                priority
              />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-2xl border-2 border-blue-500/30 bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black text-2xl shadow-xl shrink-0">
              {avatarFallback}
            </div>
          )}

          {/* টেক্সট মেসেজ */}
          <div className="text-center sm:text-left flex-1 space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Welcome Back, {userName} 👋
              </h1>
              <span className="w-fit mx-auto sm:mx-0 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider">
                {userRole}
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-xl">
              You are securely logged into the **RentSphere** administrative workspace. Use the sidebar to moderate users, properties, and track system analytics.
            </p>
          </div>
        </div>

        {/* নিচের ছোট সিকিউরিটি ব্যাজ */}
        <div className="mt-6 pt-5 border-t border-slate-800/60 flex items-center justify-center sm:justify-start gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Admin session authenticated and encrypted.</span>
        </div>
      </div>

    </div>
  );
};

export default Page;