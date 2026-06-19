"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";
import { User2 } from "lucide-react";

export default function RegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "tenant",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 REGISTER FIXED (IMPORTANT PART)
  const handleSubmit = async (e) => {
    e.preventDefault();

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
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-slate-900 p-6 rounded-2xl space-y-4">

        <div className="text-center text-white">
          <User2 className="mx-auto mb-2" />
          <h1>Create Account</h1>
        </div>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-950 text-white"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-950 text-white"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-950 text-white"
          required
        />

        <select
          name="role"
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-950 text-white"
        >
          <option value="tenant">Tenant</option>
          <option value="owner">Owner</option>
        </select>

        <button className="w-full bg-orange-500 py-3 rounded font-bold">
          Create Account
        </button>
      </form>
    </div>
  );
}