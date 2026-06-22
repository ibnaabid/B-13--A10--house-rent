"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";
import { Home, Eye, EyeOff, ArrowRight, Building2, UserCheck } from "lucide-react";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "tenant",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      if (error) {
        toast.error(error.message || "Signup failed");
        return;
      }

      toast.success("Account created!");
      router.push("/login");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">

      {/* LEFT PANEL */}
      <div className="hidden lg:flex flex-col justify-between w-[42%] bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-900 border-r border-slate-800/60 p-12">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-black text-xl text-white">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-700/30">
            <Home size={17} className="text-white" />
          </div>
          Rent<span className="text-blue-400">Sphere</span>
        </Link>

        {/* Middle content */}
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest">
              Get Started
            </p>
            <h2 className="text-4xl font-black text-white leading-tight">
              Find your<br />
              <span className="text-blue-400">perfect home</span><br />
              today.
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Join thousands of tenants and property owners on RentSphere.
            </p>
          </div>

          {/* Feature pills */}
          <div className="space-y-3">
            {[
              { icon: Building2, text: "Browse 1,000+ verified properties" },
              { icon: UserCheck, text: "Trusted by owners & tenants" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <Icon size={14} className="text-blue-400" />
                </div>
                {text}
              </div>
            ))}
          </div>
        </div>

        <p className="text-slate-600 text-xs">© 2025 RentSphere</p>
      </div>

      {/* RIGHT PANEL — FORM */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm space-y-7">

          {/* Header */}
          <div>
            {/* Mobile logo */}
            <Link href="/" className="lg:hidden flex items-center gap-2 font-black text-lg text-white mb-8">
              <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
                <Home size={15} className="text-white" />
              </div>
              Rent<span className="text-blue-400">Sphere</span>
            </Link>

            <h1 className="text-2xl font-black text-white">Create account</h1>
            <p className="text-slate-400 text-sm mt-1">
              Already have one?{" "}
              <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900 border border-slate-800 rounded-xl">
            {[
              { value: "tenant", label: "Tenant" },
              { value: "owner", label: "Owner" },
            ].map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setFormData({ ...formData, role: value })}
                className={`py-2.5 text-sm font-semibold rounded-lg transition-all ${
                  formData.role === value
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-700/20"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Fields */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-3">
              <input
                name="name"
                placeholder="Full name"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all"
              />

              <input
                name="email"
                type="email"
                placeholder="Email address"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all"
              />

              {/* Password with eye toggle */}
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 pr-11 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all text-sm shadow-lg shadow-blue-700/20 mt-1"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create account
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}