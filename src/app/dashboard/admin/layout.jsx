import AdminSidebar from "@/app/adminSidebar/page";


export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-49 bg-slate-900 text-white">
        <AdminSidebar></AdminSidebar>
      </aside>

      <main className="flex-1 p-6 bg-slate-100">
        {children}
      </main>
    </div>
  );
}