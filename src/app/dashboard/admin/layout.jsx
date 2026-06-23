import AdminSidebar from "@/app/adminSidebar/page";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-slate-950 overflow-hidden">
      
      {/* সাইডবার এরিয়া */}
      <aside className="w-full md:w-64 bg-slate-900 text-white shrink-0 md:h-full border-b md:border-b-0 md:border-r border-slate-800">
        <AdminSidebar />
      </aside>

      {/* মেইন কনটেন্ট এরিয়া */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto overflow-x-hidden text-slate-100">
          {children}
        </main>
      </div>

    </div>
  );
}