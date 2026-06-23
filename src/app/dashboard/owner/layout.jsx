"use client";

import Sidebar from "@/app/OwnerSidebar/page";

export default function OwnerLayout({ children }) {
  return (
    // md:flex-row এর মাধ্যমে মোবাইলে উপর-নিচ (col) এবং বড় স্ক্রিনে পাশাপাশি (row) করা হয়েছে
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-950 text-white antialiased">

      {/* Sidebar Container */}
      {/* মোবাইলে পুরো চওড়া (w-full) থাকবে, ডেক্সটপে ফিক্সড চওড়া (md:w-64) হয়ে বামে থাকবে */}
      <aside className="w-full md:w-64 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 shrink-0">
        <Sidebar />
      </aside>

      {/* Main Content */}
      {/* overflow-x-hidden দেওয়া হয়েছে যাতে ভেতরের কোনো বড় টেবিল পুরো স্ক্রিনকে ডানদিকে টেনে ভেঙে না ফেলে */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden overflow-y-auto">
        <div className="max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>

    </div>
  );
}