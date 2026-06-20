"use client";

import { authClient } from "@/app/lib/auth-client";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
const Page = () => {
  const router = useRouter()
 
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user?.role;

  


  if (isPending) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return (
  

      <div className="p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Total Bookings */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-slate-400 text-sm font-medium">Total Bookings</h3>
            <h1 className="text-4xl font-bold text-white mt-2">12</h1>
          </div>

          {/* Favorites */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-slate-400 text-sm font-medium">Favorites</h3>
            <h1 className="text-4xl font-bold text-pink-500 mt-2">8</h1>
          </div>

          {/* Paid Amount */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-slate-400 text-sm font-medium">Paid Amount</h3>
            <h1 className="text-4xl font-bold text-green-500 mt-2">
              ৳25,000
            </h1>
          </div>

        </div>
      </div>
  
  );
};

export default Page;