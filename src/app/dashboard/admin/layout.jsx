import AdminSidebar from "@/app/adminSidebar/page";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-950">
      
      <aside className="w-full md:w-64 md:min-h-screen bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 shrink-0">
        <AdminSidebar />
      </aside>

      <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-x-hidden">
        {children}
      </main>

    </div>
  );
}