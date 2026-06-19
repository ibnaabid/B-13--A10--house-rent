// dashboard/layout.js

import TenantSideBar from "@/app/tenantsidebar/page";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-slate-900 text-white">
        <TenantSideBar></TenantSideBar>
      </aside>

      <main className="flex-1 p-6 bg-slate-100">
        {children}
      </main>
    </div>
  );
}