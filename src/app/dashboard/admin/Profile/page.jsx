import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import Image from "next/image";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  return (
    <div className="min-h-screen w-full bg-slate-950 p-4 sm:p-6 lg:p-8 text-white antialiased">
      <div className="max-w-5xl mx-auto w-full">
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
          
          {/* Top Banner */}
          <div className="h-28 sm:h-40 lg:h-48 bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500" />

          {/* Profile Section Content */}
          <div className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
            <div className="-mt-12 sm:-mt-16 flex flex-col items-center md:flex-row md:items-end gap-4 md:gap-6">
              
              {/* Profile Avatar */}
              <div className="relative mb-6 shrink-0">
                <Image
                  src={
                    user?.image ||
                    "https://ui-avatars.com/api/?name=Admin"
                  }
                  alt="Profile"
                  width={120}
                  height={120}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-slate-900 object-cover shadow-xl"
                  priority
                />
              </div>

              {/* Identity Info */}
              <div className="flex-1 text-center md:text-left w-full space-y-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight break-words">
                  {user?.name || "Admin"}
                </h1>

                <p className="text-slate-400 break-all text-xs sm:text-sm md:text-base font-medium">
                  {user?.email}
                </p>

                <div className="pt-1">
                  <span className="inline-block rounded-full bg-blue-500/10 px-3.5 py-0.5 text-xs sm:text-sm font-semibold text-blue-400 border border-blue-500/20 tracking-wide uppercase">
                    {user?.role || "Administrator"}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              <div className="rounded-xl sm:rounded-2xl border border-slate-800 bg-slate-800/40 p-4 sm:p-5">
                <h3 className="text-slate-400 text-xs sm:text-sm font-medium">Role</h3>
                <p className="mt-1 sm:mt-2 text-lg sm:text-xl font-bold text-slate-200">
                  {user?.role || "Admin"}
                </p>
              </div>

              <div className="rounded-xl sm:rounded-2xl border border-slate-800 bg-slate-800/40 p-4 sm:p-5">
                <h3 className="text-slate-400 text-xs sm:text-sm font-medium">User ID</h3>
                <p className="mt-1 sm:mt-2 text-xs font-mono text-slate-300 break-all bg-slate-950/40 px-2 py-1 rounded border border-slate-800/50">
                  {user?.id || "N/A"}
                </p>
              </div>

              <div className="rounded-xl sm:rounded-2xl border border-slate-800 bg-slate-800/40 p-4 sm:p-5 sm:col-span-2 lg:col-span-1">
                <h3 className="text-slate-400 text-xs sm:text-sm font-medium">Status</h3>
                <div className="mt-1 sm:mt-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-emerald-400 text-sm sm:text-base font-bold">
                    Active
                  </p>
                </div>
              </div>
            </div>

            {/* Detailed Information Section */}
            <div className="mt-6 sm:mt-8 rounded-xl sm:rounded-2xl border border-slate-800 bg-slate-800/20 p-5 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-slate-200 mb-4 sm:mb-6 border-b border-slate-800 pb-3">
                Profile Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-0.5">
                  <p className="text-slate-400 text-xs sm:text-sm">Full Name</p>
                  <p className="text-slate-200 text-sm sm:text-base font-medium break-words">{user?.name || "N/A"}</p>
                </div>

                <div className="space-y-0.5">
                  <p className="text-slate-400 text-xs sm:text-sm">Email Address</p>
                  <p className="text-slate-200 text-sm sm:text-base font-medium break-all">{user?.email || "N/A"}</p>
                </div>

                <div className="space-y-0.5">
                  <p className="text-slate-400 text-xs sm:text-sm">Assigned Role</p>
                  <p className="text-slate-200 text-sm sm:text-base font-medium capitalize">{user?.role || "Admin"}</p>
                </div>

                <div className="space-y-0.5">
                  <p className="text-slate-400 text-xs sm:text-sm">Account Status</p>
                  <p className="text-emerald-400 text-sm sm:text-base font-semibold">Active</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;