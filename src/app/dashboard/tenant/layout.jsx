

import TenantSideBar from "@/app/tenantsidebar/page";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-100">
      
      <aside className="w-full md:w-64 bg-slate-900 text-white shrink-0 border-b md:border-b-0 md:border-r border-slate-800">
        <TenantSideBar />
      </aside>

      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
        <div className="max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>

    </div>
  );
}