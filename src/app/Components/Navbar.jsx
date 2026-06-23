"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Building2,
  MapPin,
  Phone,
  User,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  LogIn,
  UserPlus,
  Star
} from "lucide-react";
import { authClient } from "../lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const router = useRouter()

  const { data: session, isPending } = authClient.useSession();
  console.log(session,"useSession")
  const role = session?.user?.role;
  console.log("role",role)

  const navLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "Properties", href: "/allproperties", icon: Building2 },
    { label: "Locations", href: "/locations", icon: MapPin },
    { label: "Contact", href: "/contact", icon: Phone },
        { label: "Reviews", href: "/Reviews", icon: Star },
  ];

 // ─── ১. অ্যাডমিনসহ সব রোল চেক করার জন্য আপডেট ───
  const getDashboardLink = () => {
    if (!session?.user) return null;
    
    // মেইন অ্যাডমিন ইমেইল চেক
    if (session.user.email === "mdabout2@gmail.com") {
      return "/dashboard/admin";
    }

    const userRole = role?.toLowerCase();
    if (userRole === "owner") return "/dashboard/owner";
    if (userRole === "tenant") return "/dashboard/tenant";
    if(userRole === "admin") return "/dashboard/admin"
    return null;
  };

  const dashboardLink = getDashboardLink();

  const logout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            setUserOpen(false);
            setMenuOpen(false);
            // সরাসরি হোমপেজে পুশ করে রিফ্রেশ দিন যাতে ওল্ড সেশন ক্যাশ ক্লিন হয়ে যায়
            router.push("/login");
            router.refresh();
          },
        },
      });
    } catch (error) {
      console.error("Sign out failed:", error);
     
      setUserOpen(false);
      setMenuOpen(false);
      router.push("/login");
      router.refresh();
    }
  };

  if (isPending) {
    return <div className="h-20 bg-slate-950 border-b border-slate-800/80 animate-pulse" />;
  }

  return (
    <>
      <nav className="sticky top-0 z-50 bg-slate-950 border-b border-slate-800/80 text-white backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 font-black text-xl tracking-tight">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Home className="w-5 h-5 text-white" />
            </div>
            Rent<span className="text-blue-500">Sphere</span>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden lg:flex items-center gap-6 text-slate-300 font-medium text-sm">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 hover:text-white transition-colors py-2 ${
                  pathname === item.href ? "text-blue-400 font-semibold" : ""
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            ))}
            {session && dashboardLink && (
              <Link
                href={dashboardLink}
                className={`flex items-center gap-1.5 font-bold transition-colors py-2 ${
                  pathname.startsWith("/dashboard") ? "text-blue-400" : "text-amber-400 hover:text-amber-300"
                }`}
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
            )}
          </div>

          {/* USER SECTIONS */}
          <div className="relative flex items-center gap-3">
            <button
              onClick={() => setUserOpen(!userOpen)}
              className="flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-all text-slate-200 rounded-xl"
            >
              <User size={16} className="text-blue-500" />
              <span className="text-xs sm:text-sm font-medium">
                {session?.user?.name || "Guest User"}
              </span>
            </button>

            {/* USER DROPDOWN */}
            {userOpen && (
              <div className="absolute right-0 top-14 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50">
                {!session ? (
                  <div className="p-1.5 space-y-1">
                    <Link 
                      href="/login" 
                      onClick={() => setUserOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 rounded-xl transition-colors"
                    >
                      <LogIn size={14} className="text-slate-400" /> Login
                    </Link>
                    <Link 
                      href="/register" 
                      onClick={() => setUserOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 rounded-xl transition-colors"
                    >
                      <UserPlus size={14} className="text-slate-400" /> Register
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="px-4 py-3.5 bg-slate-950/40 border-b border-slate-800/60">
                      <p className="text-sm font-bold text-white truncate">{session.user.name}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5 font-semibold">
                        Role: <span className="text-blue-400">USER:{role}</span>
                      </p>
                    </div>

                    <div className="p-1.5 space-y-1">
                      {dashboardLink && (
                        <Link
                          href={dashboardLink}
                          onClick={() => setUserOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 rounded-xl transition-colors"
                        >
                          <LayoutDashboard size={14} className="text-slate-400" /> Dashboard
                        </Link>
                      )}

                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-400 hover:bg-red-600 rounded-xl transition-all text-left font-medium"
                      >
                        <LogOut size={14} /> Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* MOBILE MENU TOGGLE */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-300"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      {menuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 p-5 space-y-4">
          <div className="flex flex-col gap-3.5">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-2.5 text-sm font-medium transition-colors ${
                  pathname === item.href ? "text-blue-400" : "text-slate-400"
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            ))}

            {/* 🔥 মোবাইল ড্রয়ারের নিচে আলাদা হাইলাইটেড ড্যাশবোর্ড লিঙ্ক */}
            {session && dashboardLink && (
              <Link
                href={dashboardLink}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 text-sm font-bold text-amber-400 pt-2 border-t border-slate-900"
              >
                <LayoutDashboard size={16} />
                Dashboard ({role})
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}