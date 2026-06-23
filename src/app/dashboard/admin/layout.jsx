import AdminSidebar from "@/app/adminSidebar/page";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-950">
      
      <aside className="w-full md:w-64 bg-slate-900 text-white shrink-0">
        <AdminSidebar />
      </aside>

      {/* মেইন কনটেন্ট এরিয়া */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
        {children}
      </main>

    </div>
  );
}