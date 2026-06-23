// dashboard/layout.js

import TenantSideBar from "@/app/tenantsidebar/page";

export default function DashboardLayout({ children }) {
  return (
    // md:flex-row এর মাধ্যমে বড় স্ক্রিনে পাশাপাশি এবং মোবাইলে উপর-নিচ (flex-col) করা হয়েছে
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-100">
      
      {/* সাইডবার: মোবাইলে পুরো চওড়া (w-full), বড় স্ক্রিনে স্ট্যান্ডার্ড চওড়া (md:w-64) */}
      <aside className="w-full md:w-64 bg-slate-900 text-white shrink-0 border-b md:border-b-0 md:border-r border-slate-800">
        <TenantSideBar />
      </aside>

      {/* মেইন কনটেন্ট এরিয়া */}
      {/* overflow-x-hidden দেওয়া হয়েছে যাতে ভেতরের কোনো টেবিল স্ক্রিনকে ডানদিকে টেনে ভেঙে না ফেলে */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
        <div className="max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>

    </div>
  );
}