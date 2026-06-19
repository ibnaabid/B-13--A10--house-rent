"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/app/lib/auth-client"; 
import { Mail, Lock, Loader2, LogIn, Home } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  console.log(session)

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // অটো রিডাইরেকশন ট্র্যাকিং (পেজ লোডে অলরেডি লগইন থাকলে)
  useEffect(() => {
    if (isPending) return;
    if (!session?.user) return;

    const role = session?.user?.role;
    if (role === "owner") {
      router.push("/dashboard/owner");
    } else if (role === "tenant") {
      router.push("/dashboard/tenant");
    } else {
      router.push("/");
    }
  }, [session, isPending, router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const handleLogin = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const { error } = await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      toast.error(error.message || "Login Failed");
      setIsSubmitting(false);
      return;
    }

    toast.success("Login successful!");

    setIsSubmitting(false);

  } catch (err) {
    toast.error("Something went wrong");
    setIsSubmitting(false);
  }
};
  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  if (isPending) {
    return (
      <div className="h-[70vh] flex items-center justify-center bg-slate-950">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100-5rem)] flex items-center justify-center bg-slate-950 px-4 py-12 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/30">
            <Home className="text-white w-6 h-6" />
          </div>
          <h1 className="text-3xl font-black mt-4 tracking-tight text-white">
            Rent<span className="text-blue-500">Sphere</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1.5 font-medium">Welcome back! Please enter your details.</p>
        </div>

        {/* GOOGLE BUTTON */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full bg-white hover:bg-slate-100 text-slate-900 py-3 rounded-xl font-bold mb-6 flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z" />
            <path fill="#FBBC05" d="M1.24 6.65A11.935 11.935 0 0 0 0 12c0 1.92.445 3.73 1.24 5.35l4.026-3.115A7.054 7.054 0 0 1 4.91 12c0-1.54.49-2.96 1.33-4.135L1.24 6.65Z" />
            <path fill="#4285F4" d="M12 24c3.247 0 5.973-1.077 7.964-2.923l-3.846-2.986c-1.082.723-2.477 1.173-4.118 1.173-3.173 0-5.864-2.145-6.827-5.036L1.145 17.35C3.102 21.302 7.173 24 12 24Z" />
            <path fill="#34A853" d="M23.773 12.273c0-.818-.073-1.609-.205-2.373H12v4.5h6.6c-.286 1.505-1.132 2.777-2.405 3.627l3.845 2.986c2.25-2.073 3.733-5.123 3.733-8.74Z" />
          </svg>
          <span className="text-sm font-bold">Continue with Google</span>
        </button>

        <div className="flex items-center my-5 text-slate-600">
          <div className="flex-1 h-[1px] bg-slate-800"></div>
          <span className="px-3 text-xs uppercase tracking-widest font-semibold text-slate-500">or</span>
          <div className="flex-1 h-[1px] bg-slate-800"></div>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 font-medium mb-1 block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 text-slate-500" size={18} />
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 focus:border-blue-500 outline-none rounded-xl text-sm transition-all text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium mb-1 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 text-slate-500" size={18} />
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 focus:border-blue-500 outline-none rounded-xl text-sm transition-all text-white"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/10 mt-6 flex items-center justify-center gap-2 text-sm"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn size={16} />}
            {isSubmitting ? "Validating..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6 text-sm">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-400 hover:underline font-medium">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}