"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";
import { HiArrowCircleUp } from "react-icons/hi";

const Page = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-medium px-4">
        Loading...
      </div>
    );
  }

  const userName = session?.user?.name || "Admin Provider";
  const userRole = session?.user?.role || "Administrator";
  const userImageUrl = session?.user?.image;
  const avatarFallback = userName.charAt(0).toUpperCase();

  return (
    <div className="p-4 sm:p-8 bg-slate-950 min-h-screen text-slate-100 flex flex-col justify-center max-w-4xl mx-auto space-y-6 w-full">
      
      <div className="bg-slate-900 border border-slate-850 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/20">
        
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 relative z-10">
          
          {/* Profile Image / Avatar */}
          {userImageUrl ? (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl border-2 border-blue-500/30 overflow-hidden shadow-xl relative shrink-0">
              <Image
                fill
                src={userImageUrl}
                alt="Admin Profile"
                className="object-cover"
                sizes="(max-width: 640px) 64px, 80px"
                priority
              />
            </div>
          ) : (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl border-2 border-blue-500/30 bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black text-xl sm:text-2xl shadow-xl shrink-0">
              {avatarFallback}
            </div>
          )}

          {/* Text Content */}
          <div className="text-center sm:text-left flex-1 space-y-2 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-2 justify-center sm:justify-start">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                Welcome Back, {userName}
                <HiArrowCircleUp className="inline-block text-blue-500 shrink-0" />
              </h1>
              <span className="w-fit mx-auto sm:mx-0 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider">
                {userRole}
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto sm:mx-0 balance">
              You are securely logged into the <strong className="text-slate-200">RentSphere</strong> administrative workspace. Use the sidebar to moderate users, properties, and track system analytics.
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-6 pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 text-[11px] sm:text-xs text-slate-500 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Admin session authenticated and encrypted.</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Page;